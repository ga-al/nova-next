# Nova — portfolio demo

Двуязычный (ru/en) промышленный лендинг на Next.js App Router. Демонстрирует
локализованный роутинг, статически дружелюбные Open Graph-метаданные, scoped i18n
payloads и кастомную CSS-систему (не готовый UI-kit).

**Живой референс:** [datsumetals.com](https://datsumetals.com/) ·
**Источник темы:** [datsu-site-vertical](https://github.com/ga-al/datsu-site-vertical)

## Стек

- Next.js 16 (App Router) + React 19 + TypeScript
- `next-intl` — локали всегда с префиксом через `src/proxy.ts`
- Плавный скролл Lenis (учитывает `prefers-reduced-motion`)
- CSS Modules + дизайн-токены в `globals.css`

## Быстрый старт

```bash
cp .env.example .env.local
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — редирект на `/ru`.

Задайте `NEXT_PUBLIC_SITE_URL` для корректных canonical / OG URL в production.

## Что показывает этот демо

- **Scoped messages** — layout отдаёт `common` + `nav`; главная страница
  оборачивает `home` + `contactForm` через `ScopedIntlProvider` (`pickMessages`).
- **Хелперы метаданных** — `createPageMetadata` собирает title, description,
  canonical, hreflang, Open Graph и Twitter-карточки без вызова `headers()`.
- **Модалка контакта** — нативный `<dialog>`, управление фокусом, честный demo API
  (`/api/contact` только валидирует; письма не отправляет).
- **Типизированные данные каталога / тикера** в `src/data/`, строки UI — в messages.

## Карта проекта

```
src/
  config/site.ts                 # бренд, OG, URL футера
  data/                          # тикер + характеристики каталога
  i18n/                          # маршрутизация, навигация, request
  messages/                      # ru.json / en.json
  lib/
    page-metadata.ts
    site-metadata.ts
    pick-messages.ts
    ScopedIntlProvider.tsx
  components/
    SmoothScrolling.tsx
    contact/
    home/                        # Hero, Ticker, About, Catalog
    layout/                      # Header, Footer, MobileMenu, LocaleSwitcher
  app/
    api/contact/route.ts
    [locale]/                   # layout, page, not-found
  proxy.ts                       # middleware next-intl (Next.js 16)
```

## Скрипты

| Команда           | Назначение           |
| ----------------- | -------------------- |
| `npm run dev`     | Локальная разработка |
| `npm run build`   | Production-сборка    |
| `npm run lint`    | ESLint               |
| `npm run typecheck` | `tsc --noEmit`     |

## Ребрендинг

1. Отредактируйте `src/config/site.ts` (имя, заголовки, иконки, live/theme URL).
2. Обновите `src/messages/ru.json` и `en.json`.
3. Замените ассеты в `public/images/` и шрифты в `public/fonts/`.

## Заметки

- Локаль всегда в URL (`/ru`, `/en`). Детекция по cookie / Accept-Language отключена.
- Success-состояние формы контакта поясняет, что это локальное демо — почта не уходит.
- Тёмная тема следует за `prefers-color-scheme` через CSS-токены.
- Неизвестные URL внутри локали (напр. `/ru/missing`) попадают в `[locale]/[...rest]` → `notFound()` → оформленный 404.
