# Портфолио — Антон Растяженко

Статический сайт-резюме: **Preact 11 + Vite 8**, без бэкенда, тёмная «терминальная» эстетика.
Готов к публикации на **GitHub Pages** без сборки: готовые файлы (`index.html`, `assets/`, `404.html`, `favicon.svg`) лежат **в корне репозитория** — настраиваете branch `main`, folder `/`, и сайт поднимается.

## Структура

```
.
├─ index.html            # результат сборки — то, что отдаёт GitHub Pages
├─ 404.html              # копия index (на несуществующие пути)
├─ favicon.svg
├─ assets/               # результат сборки: JS/CSS, шрифты, портрет (hashed-имена)
├─ src/                  # исходники сайта
│  ├─ index.html         # entry Vite
│  ├─ main.jsx           # монтаж: шрифты, стили, render
│  ├─ app.jsx            # каркас: Hero → Stats → About → Skills → Projects → Experience → Military → Education → Contacts
│  ├─ public/            # статика (favicon)
│  ├─ assets/photo.jpg   # портрет
│  ├─ data/resume.js     # единый источник контента: все тексты сайта
│  ├─ styles/            # tokens.css (палитра), base.css
│  └─ components/        # nav, hero, stats, about, skills, projects, experience,
│                        #   military, education, contacts, footer
└─ scripts/publish.mjs   # npm run publish — копирует dist/ в корень репозитория
```

## Запуск локально

```sh
npm install
npm run dev        # dev-сервер с HMR → http://localhost:5173
npm run build      # сборка в dist/
npm run preview    # предпросмотр собранного → http://localhost:4173
npm run publish    # сборка + копирование готовых файлов в корень (index.html, assets/, 404.html, favicon.svg)
```

## Публикация (GitHub Pages)

1. Запушить репозиторий:

   ```sh
   git remote add origin git@github.com:grevinden/resume.git
   git push -u origin main
   ```

2. На GitHub: **Settings → Pages → Build and deployment → Source: `Deploy from a branch`** → ветка `main`, папка **`/ (root)`**.
3. Через минуту сайт на `https://grevinden.github.io/resume/`.

Сайт работает и в подпуте проекта (`user.github.io/resume/`), и на пользовательском сайте: все ссылки на ассеты относительные (`base: './'`), после переименования пересборка не нужна.

## Правки сайта

- **Тексты** — `src/data/resume.js` (профиль, навыки, проекты, опыт, военная служба, образование, контакты).
- **Портрет** — `src/assets/photo.jpg`; кадр 5:6, обрезка «на 15% вверх» задаётся в `hero.css` (`object-position: 50% 85%`).
- После правок: `npm run publish`, закоммитить `index.html`, `assets/`, `404.html`, `favicon.svg` и push.

## Печать

Ctrl/Cmd+P — отдельная печатная вёрстка: светлая, белый фон, портрет сверху, без анимаций.
