import { createHmac, timingSafeEqual } from "node:crypto";

type CookieStore = {
  get: (name: string) => { value?: string } | undefined;
};

export const ADMIN_SESSION_COOKIE = "shopzpin_admin_session";

function getSessionSecret(): string {
  const s = import.meta.env.ADMIN_SESSION_SECRET;
  if (s && String(s).length >= 16) return String(s);
  if (import.meta.env.PROD) {
    throw new Error("ADMIN_SESSION_SECRET is required in production (min 16 chars)");
  }
  return "dev-admin-session-secret-min-16";
}

export function getExpectedUsername(): string {
  const u = import.meta.env.ADMIN_USERNAME;
  if (u && String(u).trim()) return String(u).trim();
  if (import.meta.env.PROD) {
    throw new Error("ADMIN_USERNAME is required in production");
  }
  return "admin";
}

export function getExpectedPassword(): string {
  const p = import.meta.env.ADMIN_PASSWORD;
  if (p && String(p).length > 0) return String(p);
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

/** 僅在 HTTPS 時加 Secure，避免生產環境以 HTTP 提供時瀏覽器拒絕寫入 Cookie 而無法登入。 */
function appendSecureIfHttps(parts: string[], request: Request): void {
  if (new URL(request.url).protocol === "https:") {
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
