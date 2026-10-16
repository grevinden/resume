// Сборка results dist/ → корень репозитория: GitHub Pages отдаёт сайт
// напрямую из ветки main (настраивается: branch main, folder /).
// Использование: npm run publish  (= vite build && node scripts/publish.mjs)
import { cpSync, mkdirSync, rmSync } from 'node:fs'

for (const [src, dst] of [
  ['dist/index.html', 'index.html'],
  ['dist/index.html', '404.html'],
  ['dist/favicon.svg', 'favicon.svg'],
]) {
  cpSync(src, dst)
}

rmSync('assets', { recursive: true, force: true })
mkdirSync('assets')
cpSync('dist/assets', 'assets', { recursive: true })

console.log('✔ корень репозитория готов: index.html, assets/, 404.html, favicon.svg — закоммитьте и запушьте')
