import type { APIRoute } from "astro";
import {
  clearSessionCookieHeader,
  createSessionToken,
  credentialsMatch,
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
      typeof body.password === "string" ? body.password : "";

    if (!username || !password) {
      return json({ error: "請輸入帳號與密碼" }, 400);
    }

    if (!credentialsMatch(username, password)) {
      const res = json({ error: "帳號或密碼錯誤" }, 401);
      res.headers.set("Set-Cookie", clearSessionCookieHeader());
      return res;
    }

    const token = createSessionToken();
    const res = json({ ok: true });
    res.headers.set("Set-Cookie", sessionCookieHeader(token));
    return res;
  } catch (e) {
    console.error(e);
    return json({ error: "登入失敗" }, 500);
  }
};
