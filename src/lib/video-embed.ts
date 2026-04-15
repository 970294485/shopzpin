import type { VideoRecord } from "./video-types";

export function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      const id = u.pathname.replace(/^\//, "").split("/")[0]?.split("?")[0];
      return id || null;
    }
    if (!host.includes("youtube.com")) return null;
    if (u.pathname.startsWith("/watch")) {
      return u.searchParams.get("v");
    }
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/")[2]?.split("?")[0] || null;
    }
    if (u.pathname.startsWith("/embed/")) {
      return u.pathname.split("/")[2]?.split("?")[0] || null;
    }
  } catch {
    return null;
  }
  return null;
}

export function getEmbedUrl(url: string): string {
  if (!url) return "";
  const videoId = getYouTubeVideoId(url);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
}

export function isYouTube(url: string): boolean {
  return getYouTubeVideoId(url) !== null;
}

export function getYouTubeThumbnailUrl(
  videoId: string,
  quality: "hq" | "max" = "hq"
): string {
  return quality === "max"
    ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** 前台封面：自訂 coverUrl 優先，否則 YouTube 官方縮圖 */
export function getVideoPosterSrc(
  video: Pick<VideoRecord, "coverUrl" | "url">
): string | null {
  const custom = video.coverUrl?.trim();
  if (custom) return custom;
  const id = getYouTubeVideoId(video.url);
  if (id) return getYouTubeThumbnailUrl(id);
  return null;
}
