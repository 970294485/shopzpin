import React, { useEffect, useMemo, useState } from "react";
import { Play, Video } from "lucide-react";
import type { VideoRecord } from "@/lib/video-types";
import { getEmbedUrl, getVideoPosterSrc, isYouTube } from "@/lib/video-embed";

function groupVideosByCategory(
  videos: VideoRecord[]
): { category: string; items: VideoRecord[] }[] {
  const map = new Map<string, VideoRecord[]>();
  for (const v of videos) {
    const cat = (v.category || "未分類").trim() || "未分類";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(v);
  }
  const keys = [...map.keys()].sort((a, b) => {
    if (a === "未分類") return 1;
    if (b === "未分類") return -1;
    return a.localeCompare(b, "zh-Hant");
  });
  return keys.map((category) => ({
    category,
    items: map.get(category)!,
  }));
}

function VideoTile({ video }: { video: VideoRecord }) {
  const [playing, setPlaying] = useState(false);
  const poster = getVideoPosterSrc(video);
  const yt = isYouTube(video.url);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-video w-full bg-slate-100">
        {!playing ? (
          <>
            {poster ? (
              <img
                src={poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
                <Play className="ml-1 h-14 w-14 text-slate-400" />
              </div>
            )}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-slate-900/20 transition hover:bg-slate-900/30"
              aria-label={`播放：${video.title}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/55 shadow-lg backdrop-blur-sm">
                <Play className="ml-1 h-8 w-8 text-white" fill="currentColor" />
              </span>
            </button>
          </>
        ) : yt ? (
          <iframe
            src={getEmbedUrl(video.url)}
            title={video.title}
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <video
            src={video.url}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            您的瀏覽器不支援影片播放。
          </video>
        )}
      </div>
      <div className="p-5">
        <p className="mb-2 inline-block rounded-full bg-[#ffcb05]/15 px-2.5 py-0.5 text-xs font-semibold text-slate-800">
          {video.category || "未分類"}
        </p>
        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
          {video.title}
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          {new Date(video.date)
            .toLocaleDateString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
            .replace(/\//g, "/")}{" "}
          發布
        </p>
        {playing && (
          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="mt-3 text-sm font-medium text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
          >
            收起播放器
          </button>
        )}
      </div>
    </div>
  );
}

export function VideoPage() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const grouped = useMemo(() => groupVideosByCategory(videos), [videos]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/videos/");
        if (!res.ok) throw new Error("bad status");
        const data = (await res.json()) as { videos?: VideoRecord[] };
        if (!cancelled) setVideos(data.videos ?? []);
      } catch {
        if (!cancelled) {
          setError("無法載入影片，請稍後再試。");
          setVideos([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 pb-10 pt-24 sm:pb-12">
      <div className="mx-auto max-w-7xl min-w-0 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900">
              <Video className="h-8 w-8 text-[#ffcb05]" />
              影片教學
            </h1>
            <p className="mt-2 text-slate-600">
              依分類瀏覽教學與宣傳影片；點封面即可播放
            </p>
          </div>
          <a
            href="/admin/login/?next=%2Fadmin%2Fvideos%2F"
            className="inline-flex min-h-11 items-center text-sm font-medium text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline md:min-h-0"
          >
            管理員登入後台
          </a>
        </div>

        {error && (
          <div
            className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center text-slate-500 shadow-sm">
            載入中…
          </div>
        ) : videos.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50">
              <Play className="ml-1 h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">目前尚無影片</h3>
            <p className="mb-6 mt-2 text-slate-500">
              管理員可至後台新增影片後，將顯示於此頁面。
            </p>
            <a
              href="/admin/login/?next=%2Fadmin%2Fvideos%2F"
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 font-medium text-white transition-colors hover:bg-slate-800"
            >
              管理員登入後台
            </a>
          </div>
        ) : (
          <div className="space-y-14">
            {grouped.map(({ category, items }) => (
              <section key={category}>
                <h2 className="mb-6 border-b border-slate-200 pb-2 text-xl font-bold text-slate-800">
                  {category}
                  <span className="ml-2 text-sm font-normal text-slate-500">
                    （{items.length} 支）
                  </span>
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((video) => (
                    <VideoTile key={video.id} video={video} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
