import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  type OpenGraphArticle,
  type OpenGraphType,
  withPageTitle,
} from "@/lib/site-metadata";

type LocaleParams = { locale: string };

export async function createPageMetadata({
  params,
  namespace,
  titleKey,
  descriptionKey,
  descriptionNamespace,
  pathname = "/",
  resolveTitle,
  resolveDescription,
  openGraphType,
  openGraphArticle,
  resolveOpenGraphArticle,
}: {
  params: Promise<LocaleParams>;
  namespace: string;
  titleKey?: string;
  descriptionKey?: string;
  descriptionNamespace?: string;
  /** Path without locale prefix, e.g. "/" or "/about". */
  pathname?: string;
  resolveTitle?: (
    t: Awaited<ReturnType<typeof getTranslations>>,
  ) => string | Promise<string>;
  resolveDescription?: (
    t: Awaited<ReturnType<typeof getTranslations>>,
    locale: string,
  ) => string | Promise<string>;
  openGraphType?: OpenGraphType;
  openGraphArticle?: OpenGraphArticle;
  resolveOpenGraphArticle?: (
    t: Awaited<ReturnType<typeof getTranslations>>,
    locale: string,
  ) => OpenGraphArticle | undefined | Promise<OpenGraphArticle | undefined>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace });

  const title = resolveTitle
    ? await resolveTitle(t)
    : titleKey
      ? t(titleKey)
      : "";

  let description: string | undefined;

  if (resolveDescription) {
    description = await resolveDescription(t, locale);
  } else if (descriptionKey) {
    const tDescription = descriptionNamespace
      ? await getTranslations({ locale, namespace: descriptionNamespace })
      : t;
    description = tDescription(descriptionKey);
  }

  const article = resolveOpenGraphArticle
    ? await resolveOpenGraphArticle(t, locale)
    : openGraphArticle;

  return await withPageTitle(title, {
    description,
    locale,
    pathname,
    openGraphType,
    openGraphArticle: article,
  });
}
