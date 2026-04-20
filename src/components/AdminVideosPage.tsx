import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, ImageIcon, Pencil, Plus, Tag, Trash2, Video, X } from "lucide-react";
import type { VideoRecord } from "@/lib/video-types";
import { getEmbedUrl, getVideoPosterSrc, isYouTube } from "@/lib/video-embed";

const fetchOpts: RequestInit = { credentials: "include" };

const PRESET_CATEGORIES = [
  "產品介紹",
  "操作教學",
  "行銷應用",
  "整合串接",
  "其他",
];

function loginUrl(): string {
  const next = `${window.location.pathname}${window.location.search}`;
  return `/admin/login/?next=${encodeURIComponent(next || "/admin/videos/")}`;
}

async function fetchVideos(): Promise<VideoRecord[]> {
  const res = await fetch("/api/videos", fetchOpts);
  if (res.status === 401) {
    window.location.href = loginUrl();
    throw new Error("unauthorized");
  }
  if (!res.ok) throw new Error("載入失敗");
  const data = (await res.json()) as { videos: VideoRecord[] };
  return data.videos ?? [];
}

export function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [category, setCategory] = useState("操作教學");
  const [coverUrl, setCoverUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editCoverUrl, setEditCoverUrl] = useState("");

  const categoryList = useMemo(() => {
    const fromData = [...new Set(videos.map((v) => v.category).filter(Boolean))];
    return [...new Set([...PRESET_CATEGORIES, ...fromData])];
  }, [videos]);

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      setVideos(await fetchVideos());
    } catch (e) {
      if ((e as Error).message === "unauthorized") return;
      setError("無法載入影片列表，請確認伺服器已啟動且 API 可用。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/videos", {
        ...fetchOpts,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          url: url.trim(),
          category: category.trim() || "未分類",
          coverUrl: coverUrl.trim(),
        }),
      });
      if (res.status === 401) {
        window.location.href = loginUrl();
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError((data.error as string) || "新增失敗");
        return;
      }
      setTitle("");
      setUrl("");
      setCategory("操作教學");
      setCoverUrl("");
      await load();
    } catch {
      setError("新增時發生錯誤");
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (v: VideoRecord) => {
    setEditId(v.id);
    setEditTitle(v.title);
    setEditUrl(v.url);
    setEditCategory(v.category || "未分類");
    setEditCoverUrl(v.coverUrl || "");
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId || !editTitle.trim() || !editUrl.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/videos/${encodeURIComponent(editId)}`, {
        ...fetchOpts,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle.trim(),
          url: editUrl.trim(),
          category: editCategory.trim() || "未分類",
          coverUrl: editCoverUrl.trim(),
        }),
      });
      if (res.status === 401) {
        window.location.href = loginUrl();
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError((data.error as string) || "更新失敗");
        return;
      }
      setEditId(null);
      await load();
    } catch {
      setError("更新時發生錯誤");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("確定要刪除此影片？此動作無法復原。")) return;
    setError(null);
    try {
      const res = await fetch(`/api/videos/${encodeURIComponent(id)}`, {
        ...fetchOpts,
        method: "DELETE",
      });
      if (res.status === 401) {
        window.location.href = loginUrl();
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError((data.error as string) || "刪除失敗");
        return;
      }
      await load();
    } catch {
      setError("刪除時發生錯誤");
    }
  };

  const categoryField = (idPrefix: "new" | "edit") => (
    <div>
      <label
        htmlFor={`admin-${idPrefix}-category`}
        className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-300"
      >
        <Tag className="h-4 w-4 text-slate-500" />
        分類
      </label>
      <input
        id={`admin-${idPrefix}-category`}
        type="text"
        list="admin-category-suggestions"
        value={idPrefix === "new" ? category : editCategory}
        onChange={(e) =>
          idPrefix === "new"
            ? setCategory(e.target.value)
            : setEditCategory(e.target.value)
        }
        placeholder="例如：操作教學"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none ring-[#ffcb05]/25 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
      />
      <p className="mt-1 text-xs text-slate-500">
        可選擇建議值或自訂；空白將儲存為「未分類」
      </p>
    </div>
  );

  const coverField = (idPrefix: "new" | "edit") => (
    <div>
      <label
        htmlFor={`admin-${idPrefix}-cover`}
        className="mb-1 flex items-center gap-2 text-sm font-medium text-slate-300"
      >
        <ImageIcon className="h-4 w-4 text-slate-500" />
        前台封面圖網址（選填）
      </label>
      <input
        id={`admin-${idPrefix}-cover`}
        type="url"
        value={idPrefix === "new" ? coverUrl : editCoverUrl}
        onChange={(e) =>
          idPrefix === "new"
            ? setCoverUrl(e.target.value)
            : setEditCoverUrl(e.target.value)
        }
        placeholder="https://example.com/poster.jpg"
        className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none ring-[#ffcb05]/25 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
      />
      <p className="mt-1 text-xs text-slate-500">
        YouTube 影片若留空，前台會使用官方縮圖作為封面
      </p>
    </div>
  );

  return (
    <div className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
              <Video className="h-8 w-8 text-[#ffcb05]" />
              影片管理
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              設定分類與封面圖；前台「影片教學」依分類顯示，點封面播放
            </p>
          </div>
          <a
            href="/videos/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#ffcb05] hover:underline"
          >
            預覽前台影片頁
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {error && (
          <div
            className="mb-6 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-200"
            role="alert"
          >
            {error}
          </div>
        )}

        <datalist id="admin-category-suggestions">
          {categoryList.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>

        <section className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-4 shadow-sm md:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Plus className="h-5 w-5 text-[#ffcb05]" />
            新增影片
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label
                htmlFor="admin-new-title"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                影片標題 <span className="text-red-400">*</span>
              </label>
              <input
                id="admin-new-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="請輸入影片標題"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none ring-[#ffcb05]/25 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
              />
            </div>
            {categoryField("new")}
            <div>
              <label
                htmlFor="admin-new-url"
                className="mb-1 block text-sm font-medium text-slate-300"
              >
                影片連結（YouTube 或 MP4 網址）{" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                id="admin-new-url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none ring-[#ffcb05]/25 placeholder:text-slate-600 focus:border-[#ffcb05] focus:ring-2"
              />
            </div>
            {coverField("new")}
            <div className="flex justify-stretch md:justify-end">
              <button
                type="submit"
                disabled={saving}
                className="min-h-11 w-full rounded-lg bg-[#ffcb05] px-5 py-2.5 text-sm font-bold text-slate-900 shadow-sm hover:bg-[#e6b604] disabled:opacity-50 md:min-h-0 md:w-auto"
              >
                {saving ? "儲存中…" : "建立影片"}
              </button>
            </div>
          </form>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
          <div className="border-b border-slate-800 px-4 py-3 md:px-6 md:py-4">
            <h2 className="text-lg font-bold text-white">影片列表</h2>
            <p className="mt-1 text-sm text-slate-500">
              共 {videos.length} 筆；前台依分類區塊、分類內依發布日新到舊排序
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">載入中…</div>
          ) : videos.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              尚無影片，請使用上方表單新增。
            </div>
          ) : (
            <ul className="divide-y divide-slate-800">
              {videos.map((v) => {
                const thumb = getVideoPosterSrc(v);
                return (
                  <li
                    key={v.id}
                    className="flex flex-col gap-4 px-4 py-4 hover:bg-slate-800/40 sm:flex-row sm:items-center md:px-6"
                  >
                    <div className="aspect-video w-full min-w-0 shrink-0 overflow-hidden rounded-lg border border-slate-700 bg-slate-950 sm:w-44">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : isYouTube(v.url) ? (
                        <iframe
                          src={getEmbedUrl(v.url)}
                          title={v.title}
                          className="h-full w-full"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        />
                      ) : (
                        <video
                          src={v.url}
                          controls
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-[#ffcb05]">
                        {v.category || "未分類"}
                      </span>
                      <p className="mt-1 truncate font-bold text-slate-100">
                        {v.title}
                      </p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {v.url}
                      </p>
                      {v.coverUrl ? (
                        <p className="mt-1 truncate text-xs text-slate-600">
                          封面：{v.coverUrl}
                        </p>
                      ) : null}
                      <p className="mt-1 text-xs text-slate-600">
                        發布：{" "}
                        {new Date(v.date)
                          .toLocaleDateString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, "/")}
                      </p>
                    </div>
                    <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(v)}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-600 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 sm:min-h-0 sm:flex-initial sm:justify-start"
                      >
                        <Pencil className="h-4 w-4" />
                        編輯
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(v.id)}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-900/60 px-3 py-2 text-sm font-medium text-red-300 hover:bg-red-950/50 sm:min-h-0 sm:flex-initial sm:justify-start"
                      >
                        <Trash2 className="h-4 w-4" />
                        刪除
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {editId && (
        <div className="fixed inset-0 z-[100] flex min-h-0 items-end justify-center overflow-y-auto overscroll-contain bg-slate-950/80 p-0 backdrop-blur-sm md:items-center md:p-4">
          <div className="max-h-[min(92dvh,100vh)] w-full max-w-xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-slate-700 bg-slate-900 shadow-2xl md:max-h-[90vh] md:rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 md:px-6 md:py-4">
              <h2 className="text-xl font-bold text-white">編輯影片</h2>
              <button
                type="button"
                onClick={() => setEditId(null)}
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200 md:min-h-0 md:min-w-0 md:p-2"
                aria-label="關閉"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="space-y-4 p-4 pb-6 md:p-6 md:pb-6">
              <div>
                <label
                  htmlFor="admin-edit-title"
                  className="mb-1 block text-sm font-medium text-slate-300"
                >
                  影片標題 <span className="text-red-400">*</span>
                </label>
                <input
                  id="admin-edit-title"
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-[#ffcb05] focus:ring-2 focus:ring-[#ffcb05]/20"
                />
              </div>
              {categoryField("edit")}
              <div>
                <label
                  htmlFor="admin-edit-url"
                  className="mb-1 block text-sm font-medium text-slate-300"
                >
                  影片連結 <span className="text-red-400">*</span>
                </label>
                <input
                  id="admin-edit-url"
                  type="url"
                  required
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2.5 text-slate-100 outline-none focus:border-[#ffcb05] focus:ring-2 focus:ring-[#ffcb05]/20"
                />
              </div>
              {coverField("edit")}
              <div className="flex flex-col-reverse gap-2 pt-2 md:flex-row md:justify-end md:gap-3">
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="min-h-11 w-full rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-700 md:min-h-0 md:w-auto"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-11 w-full rounded-lg bg-[#ffcb05] px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-[#e6b604] disabled:opacity-50 md:min-h-0 md:w-auto"
                >
                  {saving ? "儲存中…" : "儲存變更"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
