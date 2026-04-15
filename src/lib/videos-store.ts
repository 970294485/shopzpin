import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { VideoRecord } from "./video-types";

const DATA_DIR = path.join(process.cwd(), "data");
const VIDEOS_FILE = path.join(DATA_DIR, "videos.json");

const UNCATEGORIZED = "未分類";

export function normalizeVideoRecord(raw: unknown): VideoRecord {
  const o = raw as Record<string, unknown>;
  const catRaw = typeof o.category === "string" ? o.category.trim() : "";
  const coverRaw = typeof o.coverUrl === "string" ? o.coverUrl.trim() : "";
  return {
    id: String(o.id ?? ""),
    title: String(o.title ?? ""),
    url: String(o.url ?? ""),
    date:
      typeof o.date === "string" && o.date
        ? o.date
        : new Date().toISOString(),
    category: catRaw || UNCATEGORIZED,
    coverUrl: coverRaw,
  };
}

const defaultVideos: VideoRecord[] = [
  normalizeVideoRecord({
    id: "1",
    title: "Shopzpin 平台功能介紹",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    date: "2024-01-17T00:00:00.000Z",
    category: "產品介紹",
    coverUrl: "",
  }),
];

async function ensureDataFile(): Promise<void> {
  try {
    await readFile(VIDEOS_FILE, "utf-8");
  } catch {
    await mkdir(DATA_DIR, { recursive: true });
    await writeFile(VIDEOS_FILE, JSON.stringify(defaultVideos, null, 2), "utf-8");
  }
}

async function loadFromDisk(): Promise<VideoRecord[]> {
  await ensureDataFile();
  const raw = await readFile(VIDEOS_FILE, "utf-8");
  const parsed = JSON.parse(raw) as unknown[];
  return parsed.map((item) => normalizeVideoRecord(item));
}

async function saveToDisk(videos: VideoRecord[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(VIDEOS_FILE, JSON.stringify(videos, null, 2), "utf-8");
}

export async function readVideos(): Promise<VideoRecord[]> {
  const list = await loadFromDisk();
  return [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getVideoById(id: string): Promise<VideoRecord | undefined> {
  const list = await loadFromDisk();
  return list.find((v) => v.id === id);
}

function sanitizeCategory(s: string): string {
  const t = s.trim();
  if (!t) return UNCATEGORIZED;
  return t.slice(0, 64);
}

function sanitizeCoverUrl(s: string): string {
  return s.trim().slice(0, 2048);
}

export async function createVideo(input: {
  title: string;
  url: string;
  category: string;
  coverUrl: string;
}): Promise<VideoRecord> {
  const list = await loadFromDisk();
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now());
  const record: VideoRecord = {
    id,
    title: input.title.trim(),
    url: input.url.trim(),
    date: new Date().toISOString(),
    category: sanitizeCategory(input.category),
    coverUrl: sanitizeCoverUrl(input.coverUrl),
  };
  await saveToDisk([record, ...list]);
  return record;
}

export async function updateVideo(
  id: string,
  input: { title: string; url: string; category: string; coverUrl: string }
): Promise<VideoRecord | null> {
  const list = await loadFromDisk();
  const idx = list.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  const prev = list[idx];
  const updated: VideoRecord = {
    ...prev,
    title: input.title.trim(),
    url: input.url.trim(),
    category: sanitizeCategory(input.category),
    coverUrl: sanitizeCoverUrl(input.coverUrl),
  };
  const next = [...list];
  next[idx] = updated;
  await saveToDisk(next);
  return updated;
}

export async function deleteVideo(id: string): Promise<boolean> {
  const list = await loadFromDisk();
  const next = list.filter((v) => v.id !== id);
  if (next.length === list.length) return false;
  await saveToDisk(next);
  return true;
}
