import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseURL = mode === 'production'
      ? '/'  // GitHub Pages expects the base URL to match the repository name
      : '/';                 // Local development uses the root path

  return {
    base: baseURL,  // Use the baseURL variable directly, not a comparison
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  };
});