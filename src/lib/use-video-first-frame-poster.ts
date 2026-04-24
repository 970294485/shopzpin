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
 *
 * iOS Safari 常見限制：未掛進 DOM 的 video 可能不解碼、seek 後不觸發 seeked；
 * 此處將隱藏 video 暫時 append 到 body，並以 timeout / timeupdate 作為 seeked 後備。
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
    let seekFallbackId: ReturnType<typeof setTimeout> | undefined;

    const video = document.createElement("video");
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.preload = "auto";
    video.setAttribute(
      "style",
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none;visibility:hidden"
    );

    const dispose = () => {
      if (disposed) return;
      disposed = true;
      if (seekFallbackId !== undefined) window.clearTimeout(seekFallbackId);
      video.pause();
      video.removeAttribute("src");
      video.load();
      video.remove();
    };

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const finish = (url: string | null) => {
      if (cancelled || finished) return;
      finished = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (seekFallbackId !== undefined) window.clearTimeout(seekFallbackId);
      setDataUrl(url);
      dispose();
    };

    const tryCapture = () => {
      if (cancelled) return;
      const shot = capturePosterFromVideo(video);
      if (shot) finish(shot);
    };

    const onSeeked = () => {
      if (cancelled || finished) return;
      if (seekFallbackId !== undefined) {
        window.clearTimeout(seekFallbackId);
        seekFallbackId = undefined;
      }
      video.removeEventListener("timeupdate", onTimeUpdate);
      tryCapture();
      if (!finished) finish(null);
    };

    const onTimeUpdate = () => {
      if (cancelled || finished) return;
      tryCapture();
    };

    const beginSeek = () => {
      if (cancelled || finished) return;

      const d = video.duration;
      const t =
        Number.isFinite(d) && d > 0.08
          ? Math.min(0.08, Math.max(0.001, d * 0.01))
          : 0;

      if (t <= 0) {
        requestAnimationFrame(() => {
          if (!cancelled) {
            tryCapture();
            if (!finished) finish(null);
          }
        });
        return;
      }

      video.addEventListener("seeked", onSeeked, { once: true });
      video.addEventListener("timeupdate", onTimeUpdate);

      try {
        video.currentTime = t;
        seekFallbackId = window.setTimeout(() => {
          if (cancelled || finished) return;
          video.removeEventListener("timeupdate", onTimeUpdate);
          tryCapture();
          if (!finished) finish(null);
        }, 700);
      } catch {
        video.removeEventListener("seeked", onSeeked);
        video.removeEventListener("timeupdate", onTimeUpdate);
        tryCapture();
        if (!finished) finish(null);
      }
    };

    let seekStarted = false;
    const onMaybeReady = () => {
      if (cancelled || finished || seekStarted) return;
      if (!video.videoWidth) return;
      seekStarted = true;
      beginSeek();
    };

    const onError = () => {
      finish(null);
    };

    video.addEventListener("loadedmetadata", onMaybeReady);
    video.addEventListener("loadeddata", onMaybeReady);
    video.addEventListener("error", onError, { once: true });

    document.body.appendChild(video);
    video.src = src;

    timeoutId = window.setTimeout(() => {
      finish(null);
    }, 15000);

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      if (seekFallbackId !== undefined) window.clearTimeout(seekFallbackId);
      video.removeEventListener("loadedmetadata", onMaybeReady);
      video.removeEventListener("loadeddata", onMaybeReady);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("error", onError);
      dispose();
    };
  }, [videoSrc, active]);

  return dataUrl;
}
