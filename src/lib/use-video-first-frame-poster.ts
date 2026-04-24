import { useEffect, useState } from "react";

const MAX_EDGE = 640;

function capturePosterFromVideo(video: HTMLVideoElement): string | null {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return null;
  let cw = vw;
  let ch = vh;
  if (vw > MAX_EDGE) {
    cw = MAX_EDGE;
    ch = Math.round((vh * MAX_EDGE) / vw);
  }
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  try {
    ctx.drawImage(video, 0, 0, cw, ch);
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return null;
  }
}

/**
 * 為非 YouTube、且未設定 coverUrl 的影片產生 JPEG data URL 封面（擷取約首幀）。
 * 僅在 active 為 true 且 videoSrc 非空時載入影片並 seek 後截圖。
 */
export function useVideoFirstFramePoster(
  videoSrc: string | null | undefined,
  active: boolean
): string | null {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!active || !videoSrc?.trim()) {
      setDataUrl(null);
      return;
    }

    const src = videoSrc.trim();
    let cancelled = false;
    let disposed = false;
    let finished = false;

    const video = document.createElement("video");
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.preload = "auto";

    const dispose = () => {
      if (disposed) return;
      disposed = true;
      video.pause();
      video.removeAttribute("src");
      video.load();
    };

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finish = (url: string | null) => {
      if (cancelled || finished) return;
      finished = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      setDataUrl(url);
      dispose();
    };

    const onSeeked = () => {
      if (cancelled) return;
      finish(capturePosterFromVideo(video));
    };

    const onLoadedData = () => {
      if (cancelled) return;
      const d = video.duration;
      const t =
        Number.isFinite(d) && d > 0.08
          ? Math.min(0.08, Math.max(0.001, d * 0.01))
          : 0;
      if (t <= 0) {
        requestAnimationFrame(() => {
          if (!cancelled) finish(capturePosterFromVideo(video));
        });
        return;
      }
      try {
        video.currentTime = t;
      } catch {
        finish(capturePosterFromVideo(video));
      }
    };

    const onError = () => {
      finish(null);
    };

    video.addEventListener("loadeddata", onLoadedData, { once: true });
    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("error", onError, { once: true });
    video.src = src;

    timeoutId = window.setTimeout(() => {
      finish(null);
    }, 15000);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("error", onError);
      dispose();
    };
  }, [videoSrc, active]);

  return dataUrl;
}
