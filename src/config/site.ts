import type { Metadata } from "next";

/**
 * Single place to rebrand a new project cloned from this template.
 * Keep marketing copy out of here — put UI strings in messages/*.json.
 */
export const siteConfig = {
  name: "Nova",
  /** Prefix for <title>, Open Graph and Twitter titles. */
  titleBrand: "NOVA",
  titleSeparator: " | ",
  defaultSiteUrl: "http://localhost:3000",
  /** Live client site + source — portfolio credit links in the footer. */
  liveSiteUrl: "https://datsumetals.com/",
  themeCodeUrl: "https://github.com/ga-al/nova-next",
  ogImage: {
    path: "/images/og.png",
    width: 1200,
    height: 630,
  },
  icons: {
    icon: [
      { url: "/images/favicon-16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/images/favicon-32.svg", sizes: "32x32", type: "image/svg+xml" },
      { url: "/images/favicon-48.svg", sizes: "48x48", type: "image/svg+xml" },
    ],
  } satisfies NonNullable<Metadata["icons"]>,
  /**
   * Open Graph locale tags. Keys must match `routing.locales`.
   * Add a row when you introduce another language.
   */
  ogLocales: {
    ru: "ru_RU",
    en: "en_US",
  } as const satisfies Record<string, string>,
} as const;

export type SiteLocale = keyof typeof siteConfig.ogLocales;
