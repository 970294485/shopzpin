import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '');
        return path.resolve(import.meta.dirname, 'src/assets', filename);
      }
    },
  };
}

export default defineConfig({
  output: 'server',
  // 與預渲染目錄產物（各路由下的 index.html）一致，利於 Nginx 等靜態伺服器解析
  trailingSlash: 'always',
  adapter: node({ mode: 'standalone' }),
  integrations: [react()],
  vite: {
    plugins: [figmaAssetResolver(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  },
});
