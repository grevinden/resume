# HANDOFF.md — handoff для агентов

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
├─ app.jsx               # каркас: <Preloader/> + .screen-only (сайт) + <PrintResume/>
├─ data/resume.js        # ЕДИНЫЙ ИСТОЧНИК КОНТЕНТА: profile, about, skills,
│                         # projects, experience, contacts, education, military
├─ public/               # статика (favicon)
├─ assets/portrait.jpg   # портрет (1210×1762); кадр 5:6 и сдвиг — hero.css (object-position: 50% 85%)
├─ styles/
│  ├─ tokens.css         # ВСЯ палитра/типографика/геометрия (изменения дизайна — сюда)
│  └─ base.css          # reset, кнопки, @media print: .screen-only{display:none}
└─ components/           # nav, hero, stats, about, skills, projects, experience,
                         # military, education, contacts, footer — по .jsx + .css на рот;
                         # ui.jsx — общие (ToastProvider); preloader.jsx/.css — заставка загрузки;
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
готовое `dist` и корень репозитория, а не dev-сервер. Для просмотра поднять статик-сервер
на корне или `dist/` (`python3 -m http.server 4173 --bind 127.0.0.1`), после пересборки
обновить страницу.

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
   **Лестница приоритетов.** Блоки строки не сжимаются (подписи nowrap, `min-width: auto`),
   поэтому при нехватке места флекс выносит их за правый край, а `.nav` фиксированный —
   скролла нет, и элементы молча исчезают. Отсюда явные ступени по замеренной строке:
   ≤1180px — меню (полной строке нужно 1157px); ≤620px — теги (без меню 593px);
   ≤540px — имя (514px); ≤445px — кубик «АР», он последняя жертва бренда;
   подписи обеих кнопок не скрываются нигде — на узких экранах подтягиваются только
   отступы (≤860/430/375/355/330px). `flex: none` на `.nav-brand` и `.nav .nav-cta`,
   чтобы кнопки и бренд нельзя было вытеснить. Проверено прогоном 300–1600px по 1px:
   ни одной обрезки. Кнопки равного веса разной окраски: `.btn-print` — синий,
   `.nav-cta` — янтарный (в печати `.btn-print` → янтарный outline).
   Внимание: base.css собирается после компонентов, поэтому одиночный `.nav-cta`
   перебивается `.btn`; правки кнопок шапки — только через `.nav .nav-cta`.
4. **`Обо\u00a0мне`** в `links[]` (`nav.jsx`) — nbsp не случайно: пробел даёт перенос
   метки в узкой шапке.
5. `hero.jsx`: терминальный блок `~/profile.yaml` — **декоративный**: «yaml» из данных
   `data/resume.js` (формат `key: value`, без кавычек/скобок), отдельного файла нет.
6. Факты (возраст, должности, компании, даты, контакты) живут **только** в
   `data/resume.js`; печатный шаблон берёт те же объекты — контент правится
   единожды и обновляется в обоих вёрстных.
7. **Прелоадер** (`preloader.jsx/.css`): непрозрачный слой (`z-index: 120`) поверх сайта —
   пока не готовы портрет (`img.decode()`) и шрифты (`document.fonts.ready`), сайта не видно.
   Минимум показа 450 мс (чтобы не мигало на быстрой сети), страховка 5 с: если фото
   не загрузилось, сайт всё равно открывается. На время загрузки `html.is-booting`
   (`overflow: hidden`), затем класс `is-done` (opacity 0 + visibility hidden).
   В печати `display: none`. Портрет тянется и здесь (`new Image()`), и в hero —
   это один и тот же файл, запрос один.
8. **Портрет** (`src/assets/portrait.jpg`, 1210×1762): кадр hero 5:6 с `object-fit: cover`
   показывает 82,4% высоты фото, сдвиг — `object-position: 50% 85%` (значение из `3848f75`,
   одобрено владельцем — произвольно не менять). Кадр — крупный план «лицом в кадр»:
   верхние ~15% фото выше окна, `breathe` с зумом 1,06 срезает сверху ещё ~2,3% — запаса
   хватает. В печати `.pr-photo` — 27 мм ширины и своя высота (фото целиком, без обрезки),
   поэтому PDF при смене портрета пересобирать тем же рецептом.

## Проверки (вёрстка/печать)

Playwright в зависимостях нет. Рабочий headless-браузер этой машины — `/usr/bin/google-chrome`
(у `chromium-browser` порт отладки не поднимается):

```sh
/usr/bin/google-chrome --headless=new --remote-debugging-port=9359 --no-sandbox \
  --disable-gpu --user-data-dir=/tmp/opencode/cdp about:blank   # далее CDP по ws://127.0.0.1:9359
```

Через CDP: `Emulation.setDeviceMetricsOverride` — ширины, `Runtime.evaluate` —
`getBoundingClientRect`/computed style, `Page.captureScreenshot` (clip) — снимок элемента,
`Emulation.setEmulatedMedia({media:'print'})` + `Page.printToPDF({printBackground:true,
preferCSSPageSize:true})` — печатный PDF.

- **PDF печатной вёрстки**: ровно 3 страницы (считать `/Type /Page` в потоке PDF),
  отсутствие тёмного фона.
- **Ширины шапки**: прогон 300–1600px по 1px; критерий — ни один видимый блок не
  выходит за правый край окна и не обрезан внутри себя (`scrollWidth > clientWidth`),
  подписи обеих кнопок видны на всех ширинах, скрытия совпадают с порогами лестницы.
- **Координаты вместо скриншотов**: модель сессии не читает PNG; вёрстку проверять
  `getBoundingClientRect`/computed style, скриншоты — только для человека.

## Состояние на момент handoff (2026-10-17)

Задеплоено в main и проверено на живом сайте (`https://grevinden.github.io/resume/`):

- `3213fd6` — кадр портрета в hero возвращён к одобренному значению
  `object-position: 50% 85%` (в `0f8a9bf` был ошибочно сдвинут на `50% 2%`);
  контент/печать не менялись, `resume-print.pdf` не пересобирался.
- `0f8a9bf` — новый портрет (`src/assets/portrait.jpg`) вместо старого `photo.jpg`
  в hero и печати + прелоадер загрузки; пересобран `resume-print.pdf` (3 стр., 689 КБ)
  и корень репозитория.
- `8dce41d` — шапка: лестница приоритетов (пункт 3), кубик «АР» жертвуется последним,
  подписи обеих кнопок не скрываются никогда; удалён мёртвый код (`e.current` в
  `experience.jsx` + `.xp-dot-live`/`.xp-now` в `experience.css`); почта в `contacts.jsx`
  берётся из `data/resume.js`; неиспользуемый `BASE_PATH` убран.

Живые бандлы = локальные: `assets/index-CT86Q8g4.css` + `index-Bnhssle1.js` +
`portrait-CcsBQgKn.jpg` (портрет и прелоадер); `/resume-print.pdf` — 200.

Проверено: прогон ширин 300–1600px по 1px на собранной странице — ни одной обрезки;
контрольные ширины 300/375/445/540/620/880/1186/1440px — состояния совпадают с порогами
лестницы; прелоадер при выключенном кеше и 3G-троттлинге — на t≈0,7 с сайт закрыт
(`html.is-booting`, `overflow: hidden`, портрет ещё не готов), на t≈5 с — `is-done`,
портрет `complete`, `naturalWidth` 1210; в печати прелоадер `display: none`, PDF ровно
3 страницы без тёмного фона. Открытых задач нет.
