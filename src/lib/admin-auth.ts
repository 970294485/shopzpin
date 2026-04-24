import { createHmac, timingSafeEqual } from "node:crypto";

type CookieStore = {
  get: (name: string) => { value?: string } | undefined;
};

export const ADMIN_SESSION_COOKIE = "shopzpin_admin_session";

/**
 * Vercel / Node 在執行期把變數放在 process.env；import.meta.env 會在 astro build
 * 時被 Vite 靜態替換，若建置當下沒有該值，上線後會永遠對不到 Vercel 後台設定的密碼。
 */
function envAdmin(key: "ADMIN_SESSION_SECRET" | "ADMIN_USERNAME" | "ADMIN_PASSWORD"): string {
  const fromProcess =
    typeof process !== "undefined" ? process.env[key] : undefined;
  const fromMeta = import.meta.env[key];
  const raw =
    (typeof fromProcess === "string" && fromProcess.length > 0
      ? fromProcess
      : undefined) ??
    (typeof fromMeta === "string" && fromMeta.length > 0 ? fromMeta : undefined) ??
    "";
  return String(raw).trim();
}

/**
 * 正式環境若未在 Vercel 設定後台變數，`credentialsMatch` 內部會拋錯並被當成「帳密錯誤」回 401。
 * 用此函式先檢查，讓 API 回 503 與明確訊息。
 */
export function missingAdminEnvInProduction(): string[] {
  if (!import.meta.env.PROD) return [];
  const missing: string[] = [];
  if (!envAdmin("ADMIN_USERNAME")) missing.push("ADMIN_USERNAME");
  if (!envAdmin("ADMIN_PASSWORD")) missing.push("ADMIN_PASSWORD");
  if (envAdmin("ADMIN_SESSION_SECRET").length < 16) {
    missing.push("ADMIN_SESSION_SECRET（至少 16 字元）");
  }
  return missing;
}

function getSessionSecret(): string {
  const s = envAdmin("ADMIN_SESSION_SECRET");
  if (s.length >= 16) return s;
  if (import.meta.env.PROD) {
    throw new Error("ADMIN_SESSION_SECRET is required in production (min 16 chars)");
  }
  return "dev-admin-session-secret-min-16";
}

export function getExpectedUsername(): string {
  const u = envAdmin("ADMIN_USERNAME");
  if (u) return u;
  if (import.meta.env.PROD) {
    throw new Error("ADMIN_USERNAME is required in production");
  }
  return "admin";
}

export function getExpectedPassword(): string {
  const p = envAdmin("ADMIN_PASSWORD");
  if (p.length > 0) return p;
  if (import.meta.env.PROD) {
    throw new Error("ADMIN_PASSWORD is required in production");
  }
  return "admin";
}

function hmac(data: string): Buffer {
  return createHmac("sha256", getSessionSecret()).update(data).digest();
}

/** Constant-time style compare of credentials (HMAC over values). */
export function credentialsMatch(username: string, password: string): boolean {
  try {
    const u = getExpectedUsername();
    const p = getExpectedPassword();
    const a = hmac(`${username}\n${password}`);
    const b = hmac(`${u}\n${p}`);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

const MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days

export function createSessionToken(): string {
  const exp = Date.now() + MAX_AGE_SEC * 1000;
  const payload = JSON.stringify({ v: 1, exp });
  const data = Buffer.from(payload, "utf8").toString("base64url");
  const sig = createHmac("sha256", getSessionSecret())
    .update(data)
    .digest("base64url");
  return `${data}.${sig}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== "string") return false;
  try {
    const i = token.lastIndexOf(".");
    if (i <= 0) return false;
    const data = token.slice(0, i);
    const sig = token.slice(i + 1);
    const expected = createHmac("sha256", getSessionSecret())
      .update(data)
      .digest("base64url");
    const sigBuf = Buffer.from(sig, "utf8");
    const expBuf = Buffer.from(expected, "utf8");
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
    const json = JSON.parse(
      Buffer.from(data, "base64url").toString("utf8")
    ) as { v?: number; exp?: number };
    if (json.v !== 1 || typeof json.exp !== "number") return false;
    return json.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdminCookie(cookies: CookieStore): boolean {
  const raw = cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(raw);
}

export function isAdminRequest(request: Request): boolean {
  const header = request.headers.get("cookie") ?? "";
  const match = header.match(
    new RegExp(
      `(?:^|;\\s*)${ADMIN_SESSION_COOKIE}=([^;]+)`
    )
  );
  const raw = match?.[1] ? decodeURIComponent(match[1]) : undefined;
  return verifySessionToken(raw);
}

/**
 * 使用者實際是否經 HTTPS 造訪（含反向代理：信任 X-Forwarded-Proto / Forwarded）。
 * 僅在 true 時為 session cookie 加上 Secure，避免 HTTPS 頁面因缺少 Secure 而拒絕寫入 cookie。
 */
function isClientHttps(request: Request): boolean {
  const xfp = request.headers.get("x-forwarded-proto");
  if (xfp) {
    const first = xfp.split(",")[0]?.trim().toLowerCase();
    if (first === "https") return true;
    if (first === "http") return false;
  }

  const forwarded = request.headers.get("forwarded");
  if (forwarded) {
    for (const segment of forwarded.split(",")) {
      for (const pair of segment.trim().split(";")) {
        const eq = pair.indexOf("=");
        if (eq <= 0) continue;
        const key = pair.slice(0, eq).trim().toLowerCase();
        if (key !== "proto") continue;
        let val = pair.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        const p = val.toLowerCase();
        if (p === "https") return true;
        if (p === "http") return false;
      }
    }
  }

  return new URL(request.url).protocol === "https:";
}

function appendSecureIfHttps(parts: string[], request: Request): void {
  if (isClientHttps(request)) {
    parts.push("Secure");
  }
}

export function sessionCookieHeader(token: string, request: Request): string {
  const parts = [
    `${ADMIN_SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${MAX_AGE_SEC}`,
    "HttpOnly",
    "SameSite=Lax",
  ];
  appendSecureIfHttps(parts, request);
  return parts.join("; ");
}

export function clearSessionCookieHeader(request: Request): string {
  const parts = [
    `${ADMIN_SESSION_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "SameSite=Lax",
  ];
  appendSecureIfHttps(parts, request);
  return parts.join("; ");
}
