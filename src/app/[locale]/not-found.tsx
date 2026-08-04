import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { NotFoundView } from "@/components/NotFoundView/NotFoundView";

/**
 * Locale-aware 404 inside [locale]/layout (header + footer).
 * Triggered by `[locale]/[...rest]/page.tsx` calling notFound().
 */
export default async function LocaleNotFoundPage() {
  const t = await getTranslations("common");

  return (
    <NotFoundView
      title={t("notFoundTitle")}
      text={t("notFound")}
      action={
        <Link className="btn btn--primary" href="/">
          {t("backHome")}
        </Link>
      }
    />
  );
}
