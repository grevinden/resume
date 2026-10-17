# AGENTS.md — handoff для агентов

Статический сайт-резюме **Антона Растяженко**: Preact 11 + Vite 8, без бэкенда,
тёмная «терминальная» эстетика + отдельная светлая печатная вёрстка (A4).
GitHub: `grevinden/resume`, GitHub Pages: **ветка `main`, папка `/`** → `https://grevinden.github.io/resume/`.

## Главное, что нужно знать

**Репозиторий двухслойный.** В корне лежит *результат публикации* (сгенерировано, руками не править):
`index.html`, `404.html`, `assets/` (hashed JS/CSS, шрифты, портрет), `favicon.svg`, `resume-print.pdf`.
*Исходники* — в `src/`; сборка пишет в `dist/` (в git не попадает, `.gitignore`).

```
src/
├─ index.html            # entry Vite (root = src/), мета og/ru
├─ main.jsx              # монтаж: @fontsource-шрифты → tokens.css → base.css → render(<App/>)
├─ app.jsx               # каркас: .screen-only (сайт) + <PrintResume/>
├─ data/resume.js        # ЕДИНЫЙ ИСТОЧНИК КОНТЕНТА: profile, about, skills,
│                         # projects, experience, contacts, education, military
├─ public/               # статика (favicon)
├─ assets/photo.jpg      # портрет 5:6, обрезка «на 15% вверх» — hero.css (object-position: 50% 85%)
├─ styles/
│  ├─ tokens.css         # ВСЯ палитра/типографика/геометрия (изменения дизайна — сюда)
│  └─ base.css          # reset, кнопки, @media print: .screen-only{display:none}
└─ components/           # nav, hero, stats, about, skills, projects, experience,
                         # military, education, contacts, footer — по .jsx + .css на рот;
                         # ui.jsx — общие (ToastProvider);
                         # print-resume.jsx/.css — печатный документ
scripts/publish.mjs      # npm run publish: dist/ → корень (index, 404, assets, favicon)
```

## Цикл работы

```sh
npm install
npm run dev        # HMR → http://localhost:5173
npm run build      # dist/
npm run publish    # build + dist/ → корень репозитория
git add -A && git commit -m '<scope>: <описание по-русски>' && git push origin main
```

После правок в `src/` **обязателен `npm run build`/`publish`** — пользователь смотрит
готовое `dist`, а не dev-сервер. Для просмотра поднять статик-сервер на `dist/`
(инструмент `preview_server` Coddy: он читает файлы с диска, правки видны после пересборки).

**Публикация = push в main.** Живой сайт проверяется через ~1–3 мин:
сравнить hesh бандлов в живом `index.html` с `dist/index.html` (`assets/index-*.*.js`)
и что `/resume-print.pdf` отвечает 200.

Коммиты: одна строка, по-русски, `<scope>: описание`
(`print: …`, `ru-check: …`, `publish: …`, `Языковой proofread: …`).
Тексты перед publish прогонять через скиллы `ru-text` / `ru-check` / `humanizer-ru`
(в истории есть коммиты «Языковой proofread» и «ru-check»); «1С» — всегда с большой С.

## Две вёрстки и их инварианты

**Экран** (`.screen-only`): тёмная тема (`--bg:#0a0c10`), акценты: янтарь `--accent:#ffb454`
и синий `--accent-2:#8fb6ff`; шрифты Unbounded (display) / Inter (body) / JetBrains Mono —
бандлятся через `@fontsource-variable`, CDN не нужен.

**Печать** (`.print-resume`): на экране `display:none`, в `@media print` показывается вместо сайта
(`@page` A4, margin 12/14mm; светлая, `#111`, без теней/анимаций; связать с `window.print()`
в кнопке «Распечатать» — `nav.jsx`).

Нестойкие места (не ломать):

1. **Мелкие `!important` в print-resume.css — структура, не костыль.**
   В сборке `base.css` идёт *после* `print-resume.css` (порядок импортов `main.jsx`:
   сначала app+компоненты, потом tokens/base), поэтому `html{color-scheme:dark}` и
   `body{background:var(--bg)}` сайта иначе перебивают печатный документ, а
   `printBackground:true` выводит их в PDF. Поэтому: `color-scheme: light !important`,
   `background:#fff !important`, `background-image:none !important` + `!important` на ссылках.
2. **Пагинация докичена по миллиметру** (3 страницы, ~81% заполнения 3-й):
   `font-size:10.2pt; line-height:1.85`, margin-bottom абзацев 16pt,
   элементы 18pt, секции 20pt. Любое изменение контента/шрифта/отступов сдвигает
   разбивку — пересчитать PDF (рецепт ниже) и при сбое страницы поправить отступы.
3. **Бренд в nav** (`nav.css`): имя — две строки (`.brand-name-stack`: Антон / Растяженко,
   11px), справа — «ячейка» `.brand-tags` (border-left 1px `--line`, padding-left 10px,
   min-width 58px): строка 1 `1С · linux`, строка 2 `backend` (8.5px, mono, faint).
   Брейкпоинты: ≤860px `.brand-tags` скрыто; ≤560px скрыты `.brand-text`+`.brand-tags`,
   «Распечатать» — только иконка (62px). Кнопки равного веса разной окраски:
   `.btn-print` — синий, `.nav-cta` — янтарный (в печати `.btn-print` → янтарный outline).
4. **`Обо\u00a0мне`** в `links[]` (`nav.jsx`) — nbsp не случайно: пробел даёт перенос
   метки в узкой шапке.
5. `hero.jsx`: терминальный блок `~/profile.yaml` — **декоративный**: «yaml» из данных
   `data/resume.js` (формат `key: value`, без кавычек/скобок), отдельного файла нет.
6. Факты (возраст, должности, компании, даты, контакты) живут **только** в
   `data/resume.js`; печатный шаблон берёт те же объекты — контент правится
   единожды и обновляется в обоих вёрстных.

## Проверки (вёрстка/печать)

Headless Chromium от Playwright (пакет в `node_modules`):

```
/Users/anton/Library/Caches/ms-playwright/chromium-1248/chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing
```

- **PDF печатной вёстки**: `page.emulateMedia({ media:'print' })` →
  `page.pdf({ printBackground: true })` — проверить: ровно 3 страницы,
  отсутствие тёмного фона (по draw-командам с цветом в stream'ах PDF).
- **Симуляция пагинации**: исполнить print-правил (font-size/line-height/margins из
  `print-resume.css`) + `getBoundingClientRect` каждого `h2`/`p`/`li`/`img` на чистом
  `#page` с margin 12/14mm → жадная паковка, `break-inside:avoid`, высота страницы
  273mm (A4 297 − 12 − 14).
- **Координаты вместо скриншотов**: модель этой сессии не читает PNG
  (`read` на картинке — ошибка «does not read images»); верстку проверять
  `getBoundingClientRect`/computed style.

## Состояние на момент handoff (2026-10-17)

Коммит `452bb47` выложен в main; живое `https://grevinden.github.io/resume/`
синхронизировано с `dist/` (`assets/index-DjE5hbmL.js` + `index-DZ-JEeIT.css`),
`resume-print.pdf` (787 KB, 3 стр.) публичен на `/resume-print.pdf`.
Открытых задач нет; правки — по циклу выше.
