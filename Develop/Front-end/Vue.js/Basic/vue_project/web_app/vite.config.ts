import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '/@' : path.resolve(__dirname, './src'),
      '/@components' : path.resolve(__dirname, './src/components'),
      '/@app_modules': path.resolve(__dirname, './src/modules'),
      '/@store' : path.resolve(__dirname, './src/store'),
      '/@router' : path.resolve(__dirname, './src/router'),
      '/@compositions' : path.resolve(__dirname, './src/compositions'),
    },
  },
})
