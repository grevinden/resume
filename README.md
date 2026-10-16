# Портфолио — Антон Растяженко

Статичный сайт-портфолио: **Preact + Vite**, без бэкенда, деплой на **GitHub Pages**.

Всё, что нужно для разработки:

```
portfolio/
├─ index.html            # корневая обёртка Vite
├─ vite.config.js        # preact-пресет + BASE_PATH для Pages
├─ .github/workflows/deploy.yml  # CI: сборка и деплой на Pages
└─ src/
   ├─ main.jsx           # точка входа (шрифты, стили, render)
   ├─ app.jsx            # каркас секций + тосто-провайдер
   ├─ assets/photo.jpg   # портрет (hero + шапка PDF-версии)
   ├─ data/resume.js     # ЕДИНЫЙ ИСТОЧНИК КОНТЕНТА (тексты резюме)
   ├─ styles/            # tokens.css (палитра), base.css (reset, паттерны)
   └─ components/        # Nav, Hero, Stats, About, Skills, Projects, Experience, Contacts, Footer
```

## Локальный запуск

```sh
npm install     # разовая установка зависимостей
npm run dev     # dev-сервер Vite → http://localhost:5173
```

## Сборка

```sh
npm run build   # прод-сборка в dist/
npm run preview # локальный предпросмотр собранного dist → http://localhost:4173
```

## Публикация на GitHub Pages

1. Создайте публичный репозиторий, например `anton-rastyazhenko`.
2. Загрузите проект:

   ```sh
   git init -b main
   git add -A
   git commit -m "portfolio: preact + vite"
   git remote add origin git@github.com:<логин>/anton-rastyazhenko.git
   git push -u origin main
   ```

3. В репозитории: **Settings → Pages → Source: GitHub Actions** (строка появляется, как только workflow отработает).
4. Готово: workflow в `.github/workflows/deploy.yml` при каждом пуше в `main`:
   - ставит Node 22, `npm ci`;
   - собирает с `BASE_PATH=/<логин>/<репозиторий>/` (актуальный путь подставляется автоматически — переименовать репозиторий можно без правок);
   - ставит артефакт `dist/` на GitHub Pages.

Сайт будет жить по адресу `https://<логин>.github.io/<репозиторий>/`.

> Ручной путь (без Actions): соберите `BASE_PATH=/ваш-логин/ваш-репозиторий npm run build` и загрузите `dist/` в ветку `gh-pages` репозитория.

## Как править контент

Весь текст сайта — в `src/data/resume.js` (profile, about, skills, projects, experience, contacts).
Компоненты и стили менять не нужно: отредактировали данные → `npm run build`.

Портрет — `src/assets/photo.jpg`: замените файл (подойдёт любой JPEG/PNG;
лучше вертикальный кадр, 1200+ px по короткой стороне, лицо — в верхней трети;
наريطة кропится по 4:5 с упором на верх кадра) → `npm run build`.

## Что внутри

- **Preact 11 + Vite** — лёгкий runtime, статический HTML/CSS/JS без серверной.
- **Шрифты бандлятся** (`@fontsource-variable`: Unbounded / Inter / JetBrains Mono) — без внешних CDN, сайт работает офлайн.
- **Дизайн-токены** в `src/styles/tokens.css`: палитра «ink + warm amber», типографика, радиусы, easing.
- **UX/микроинтеракции**: scroll-reveal с каскадом, ротация ролей, счётчики цифр, hover-состоятия карточек, sticky-навигация с прогресс-баром и подсветкой активной секции, копирование email с тостом, `prefers-reduced-motion` уважается.
- **Портрет в hero**: фото в рамке «окна терминала» `anton · portrait.png` — плавное «дыхание» (Ken Burns), подпись, hover-подсветка; в печатной версии становится классической шапкой резюме (фото слева, имя рядом).
- **Принт-стили**: `Ctrl+P` превращает сайт в аккуратный PDF-резюме.
