import type { APIRoute } from "astro";

/** 瀏覽器預設請求 /favicon.ico；轉到實際圖示避免 404。 */
export const prerender = true;

export const GET: APIRoute = ({ request }) => {
  const u = new URL("/favicon.svg", request.url);
  return Response.redirect(u.toString(), 302);
};
