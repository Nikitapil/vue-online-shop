/// <reference types="vitest" />
import { fileURLToPath, URL } from 'node:url';
import { resolve, dirname } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve(dirname(fileURLToPath(import.meta.url)), '/src/locales/**')
    })
  ],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      include: ['src/**/*'],
      exclude: ['src/api', 'src/main.ts']
    },
    setupFiles: ['vitest.setup.ts'],
    css: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
