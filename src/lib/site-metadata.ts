import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export const DEFAULT_SITE_URL = siteConfig.defaultSiteUrl;
export const SITE_NAME = siteConfig.name;
export const SITE_TITLE_BRAND = siteConfig.titleBrand;
export const SITE_ICONS = siteConfig.icons;

function normalizeSiteUrl(url: string): string {
  const trimmed = url.trim().replace(/\/$/, "");

  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function getSiteUrlFromEnv(): string | undefined {
  const fromRuntimeEnv = process.env.SITE_URL?.trim();
  if (fromRuntimeEnv) {
    return normalizeSiteUrl(fromRuntimeEnv);
  }

  const fromPublicEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromPublicEnv) {
    return normalizeSiteUrl(fromPublicEnv);
  }

  return undefined;
}

/**
 * Public site origin for metadata (OG/Twitter absolute URLs).
 * Env only — no `headers()` — so pages stay statically renderable.
 * Set NEXT_PUBLIC_SITE_URL (or SITE_URL) in production.
 */
export function getSiteUrl(): string {
  return getSiteUrlFromEnv() ?? DEFAULT_SITE_URL;
}

export function getBaseMetadata(
  siteUrl: string = getSiteUrl(),
): Pick<Metadata, "metadataBase" | "icons"> {
  return {
    metadataBase: new URL(siteUrl),
    icons: SITE_ICONS,
  };
}

export function formatPageTitle(pageTitle: string): string {
  const normalized = pageTitle.trim();

  if (!normalized) {
    return SITE_TITLE_BRAND;
  }

  const brandPrefix = `${SITE_TITLE_BRAND}${siteConfig.titleSeparator}`;

  if (normalized.toUpperCase().startsWith(SITE_TITLE_BRAND)) {
    return normalized;
  }

  return `${brandPrefix}${normalized}`;
}

export function getOgImage(siteUrl: string) {
  return {
    url: new URL(siteConfig.ogImage.path, `${siteUrl}/`).toString(),
    width: siteConfig.ogImage.width,
    height: siteConfig.ogImage.height,
    alt: SITE_NAME,
  } as const;
}

/** Path without locale prefix. Use "/" for the home page. */
export function normalizePathname(pathname = "/"): string {
  if (!pathname || pathname === "/") {
    return "";
  }

  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function buildLocalizedPath(locale: string, pathname = "/"): string {
  return `/${locale}${normalizePathname(pathname)}`;
}

export function buildLanguageAlternates(
  siteUrl: string,
  pathname = "/",
): Record<string, string> {
  const path = normalizePathname(pathname);
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`;
  }

  languages["x-default"] = `${siteUrl}/${routing.defaultLocale}${path}`;

  return languages;
}

export type OpenGraphType = "website" | "article";

export type OpenGraphArticle = {
  publishedTime?: string;
  authors?: string[];
};

function resolveOgLocale(locale: string): string {
  return (
    siteConfig.ogLocales[locale as keyof typeof siteConfig.ogLocales] ??
    siteConfig.ogLocales[routing.defaultLocale as keyof typeof siteConfig.ogLocales] ??
    "en_US"
  );
}

export function buildOpenGraph({
  title,
  description,
  locale,
  siteUrl,
  pathname = "/",
  type = "website",
  article,
}: {
  title: string;
  description: string;
  locale: string;
  siteUrl: string;
  pathname?: string;
  type?: OpenGraphType;
  article?: OpenGraphArticle;
}): NonNullable<Metadata["openGraph"]> {
  const ogLocale = resolveOgLocale(locale);
  const alternateLocale = routing.locales
    .filter((item) => item !== locale)
    .map((item) => resolveOgLocale(item));

  return {
    type,
    siteName: SITE_NAME,
    locale: ogLocale,
    alternateLocale,
    url: `${siteUrl}${buildLocalizedPath(locale, pathname)}`,
    title,
    description,
    images: [getOgImage(siteUrl)],
    ...(type === "article" && article?.publishedTime
      ? { publishedTime: article.publishedTime }
      : {}),
    ...(type === "article" && article?.authors?.length
      ? { authors: article.authors }
      : {}),
  };
}

export function buildTwitter({
  title,
  description,
  siteUrl,
}: {
  title: string;
  description: string;
  siteUrl: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [getOgImage(siteUrl).url],
  };
}

export function normalizeMetaDescription(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export async function withPageTitle(
  title: string,
  options?: {
    description?: string;
    locale?: string;
    pathname?: string;
    openGraphType?: OpenGraphType;
    openGraphArticle?: OpenGraphArticle;
  },
): Promise<
  Pick<
    Metadata,
    | "metadataBase"
    | "icons"
    | "title"
    | "description"
    | "alternates"
    | "openGraph"
    | "twitter"
  >
> {
  const formattedTitle = formatPageTitle(title);
  const siteUrl = getSiteUrl();
  const baseMetadata = getBaseMetadata(siteUrl);
  const description = options?.description
    ? normalizeMetaDescription(options.description)
    : undefined;
  const locale = options?.locale ?? routing.defaultLocale;
  const pathname = options?.pathname ?? "/";
  const openGraphDescription = description ?? formattedTitle;
  const localizedPath = buildLocalizedPath(locale, pathname);

  return {
    ...baseMetadata,
    title: formattedTitle,
    ...(description ? { description } : {}),
    alternates: {
      canonical: `${siteUrl}${localizedPath}`,
      languages: buildLanguageAlternates(siteUrl, pathname),
    },
    openGraph: buildOpenGraph({
      title: formattedTitle,
      description: openGraphDescription,
      locale,
      siteUrl,
      pathname,
      type: options?.openGraphType,
      article: options?.openGraphArticle,
    }),
    twitter: buildTwitter({
      title: formattedTitle,
      description: openGraphDescription,
      siteUrl,
    }),
  };
}
