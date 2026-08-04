import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NotFoundView } from "@/components/NotFoundView/NotFoundView";

/**
 * Renders when `[locale]/layout` calls notFound() for an invalid locale
 * (or other cases outside a valid locale segment). Has its own document shell
 * because the locale layout did not mount.
 */
export default async function RootNotFound() {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: "common",
  });

  return (
    <html lang={routing.defaultLocale}>
      <body>
        <NotFoundView
          title={t("notFoundTitle")}
          text={t("notFound")}
          action={
            <Link
              className="btn btn--primary"
              href={`/${routing.defaultLocale}`}
            >
              {t("backHome")}
            </Link>
          }
        />
      </body>
    </html>
  );
}
