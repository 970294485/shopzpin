import { defineMiddleware } from "astro:middleware";
import { isAdminCookie } from "@/lib/admin-auth";

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const path = normalizePath(context.url.pathname);

  if (!path.startsWith("/admin")) {
    return next();
  }

  if (path === "/admin") {
    return context.redirect("/admin/videos/");
  }

  if (path === "/admin/login") {
    if (isAdminCookie(context.cookies)) {
      const nextRaw = context.url.searchParams.get("next") || "/admin/videos/";
      const dest =
        nextRaw.startsWith("/") && !nextRaw.startsWith("//")
          ? nextRaw
          : "/admin/videos/";
      return context.redirect(dest);
    }
    return next();
  }

  if (isAdminCookie(context.cookies)) {
    return next();
  }

  const nextUrl = context.url.pathname + context.url.search;
  const q = new URLSearchParams({ next: nextUrl || "/admin/videos/" });
  return context.redirect(`/admin/login/?${q.toString()}`);
});
