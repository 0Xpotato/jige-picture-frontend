import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    // 允许访问的主机名，用于 `ngrok` 或其他工具
    allowedHosts: ['relieved-formally-crappie.ngrok-free.app'],

    // 如果需要更多主机名，可在数组中添加
  },
})
