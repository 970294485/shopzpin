import type { APIRoute } from "astro";
import { isAdminRequest } from "@/lib/admin-auth";
import { createVideo, readVideos } from "@/lib/videos-store";

export const prerender = false;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async () => {
  try {
    const videos = await readVideos();
    return json({ videos });
  } catch (e) {
    console.error(e);
    return json({ error: "讀取影片列表失敗" }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!isAdminRequest(request)) {
    return json({ error: "未授權，請先登入後台" }, 401);
  }
  try {
    const body = await request.json();
    const title = typeof body.title === "string" ? body.title : "";
    const url = typeof body.url === "string" ? body.url : "";
    const category =
      typeof body.category === "string" ? body.category : "未分類";
    const coverUrl =
      typeof body.coverUrl === "string" ? body.coverUrl : "";
    if (!title.trim() || !url.trim()) {
      return json({ error: "標題與連結為必填" }, 400);
    }
    const video = await createVideo({ title, url, category, coverUrl });
    return json({ video }, 201);
  } catch (e) {
    console.error(e);
    return json({ error: "新增影片失敗" }, 500);
  }
};
