import type { APIRoute } from "astro";
import { clearSessionCookieHeader } from "@/lib/admin-auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/admin/login/",
      "Set-Cookie": clearSessionCookieHeader(request),
    },
  });
};
