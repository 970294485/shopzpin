/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ADMIN_USERNAME?: string;
  readonly ADMIN_PASSWORD?: string;
  readonly ADMIN_SESSION_SECRET?: string;
  /** YouTube video ID for homepage「觀看演示」modal (optional; default in Hero.tsx). */
  readonly PUBLIC_HERO_DEMO_YOUTUBE_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
