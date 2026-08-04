import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "en"],
  defaultLocale: "ru",
  // Locale is always in the URL (/ru, /en) — no cookie or Accept-Language redirects.
  localeDetection: false,
  localeCookie: false,
});
