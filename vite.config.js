import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))

// Исходники — в src/ (dev: HMR, build: dist/).
// Публикация на GitHub Pages: `npm run publish` копирует dist/ в корень репозитория
// (main + /). base './' — относительные пути к ассетам: сайт работает на любом
// подпути (user.github.io/<repo>/, пользовательский site, локально).
export default defineConfig({
  root: resolve(here, 'src'),
  publicDir: resolve(here, 'src/public'),
  base: process.env.BASE_PATH || './',
  build: {
    outDir: resolve(here, 'dist'),
    emptyOutDir: true,
  },
  plugins: [preact()],
})
