import type { APIRoute } from "astro";
import {
  clearSessionCookieHeader,
  createSessionToken,
  credentialsMatch,
  missingAdminEnvInProduction,
  sessionCookieHeader,
} from "@/lib/admin-auth";

export const prerender = false;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const username =
      typeof body.username === "string" ? body.username.trim() : "";
    const password =
      typeof body.password === "string" ? body.password.trim() : "";

    if (!username || !password) {
      return json({ error: "請輸入帳號與密碼" }, 400);
    }

    const envMissing = missingAdminEnvInProduction();
    if (envMissing.length > 0) {
      console.error("[api/admin/login] missing env:", envMissing.join(", "));
      return json(
        {
          error: `伺服器未設定後台環境變數：${envMissing.join("、")}。請至 Vercel 專案 → Settings → Environment Variables 新增（Production 勾選）後 Redeploy。`,
        },
        503
      );
    }

    if (!credentialsMatch(username, password)) {
      const res = json({ error: "帳號或密碼錯誤" }, 401);
      res.headers.set("Set-Cookie", clearSessionCookieHeader(request));
      return res;
    }

    const token = createSessionToken();
    const res = json({ ok: true });
    res.headers.set("Set-Cookie", sessionCookieHeader(token, request));
    return res;
  } catch (e) {
    console.error(e);
    return json({ error: "登入失敗" }, 500);
  }
};
