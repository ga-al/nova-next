"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LocaleSwitcher.module.css";

const LOCALE_LABEL_KEYS = {
  ru: "localeRu",
  en: "localeEn",
} as const;

export default function LocaleSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className={styles.switcher} aria-label={t("localeSwitcherLabel")}>
      {routing.locales.map((item) => {
        const labelKey =
          LOCALE_LABEL_KEYS[item as keyof typeof LOCALE_LABEL_KEYS];
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={pathname}
            locale={item}
            className={isActive ? styles.active : styles.link}
            aria-current={isActive ? "page" : undefined}
            hrefLang={item}
          >
            {labelKey ? t(labelKey) : item.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
