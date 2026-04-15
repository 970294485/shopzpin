import type { APIRoute } from "astro";
import { isAdminRequest } from "@/lib/admin-auth";
import { deleteVideo, getVideoById, updateVideo } from "@/lib/videos-store";

export const prerender = false;

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) return json({ error: "缺少 id" }, 400);
  try {
    const video = await getVideoById(id);
    if (!video) return json({ error: "找不到該影片" }, 404);
    return json({ video });
  } catch (e) {
    console.error(e);
    return json({ error: "讀取影片失敗" }, 500);
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  if (!isAdminRequest(request)) {
    return json({ error: "未授權，請先登入後台" }, 401);
  }
  const id = params.id;
  if (!id) return json({ error: "缺少 id" }, 400);
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
    const video = await updateVideo(id, {
      title,
      url,
      category,
      coverUrl,
    });
    if (!video) return json({ error: "找不到該影片" }, 404);
    return json({ video });
  } catch (e) {
    console.error(e);
    return json({ error: "更新影片失敗" }, 500);
  }
};

export const DELETE: APIRoute = async ({ params, request }) => {
  if (!isAdminRequest(request)) {
    return json({ error: "未授權，請先登入後台" }, 401);
  }
  const id = params.id;
  if (!id) return json({ error: "缺少 id" }, 400);
  try {
    const ok = await deleteVideo(id);
    if (!ok) return json({ error: "找不到該影片" }, 404);
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ error: "刪除影片失敗" }, 500);
  }
};
