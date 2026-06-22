import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'serve' ? '/' : '/static/',   // <— ключевой момент
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}))
