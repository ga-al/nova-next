"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import styles from "./HeroSection.module.css";

export default function HeroSection({
  handleOpen,
}: {
  handleOpen: () => void;
}) {
  const t = useTranslations("home");

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-title">
      <div className="container">
        <div className={styles.hero__bg} aria-hidden="true" />

        <div className={styles.hero__content}>
          <p className={styles.hero__brand}>{siteConfig.name}</p>
          <h1 id="hero-title" className={styles.hero__title}>
            <span>{t("heroTitleFirst")}</span>
            <span className={styles["hero__title-accent"]}>
              {t("heroTitleAccent")}
            </span>
          </h1>
          <p className={styles.hero__lead}>{t("heroLead")}</p>
          <div className={styles.hero__cta}>
            <button
              type="button"
              className="btn btn--primary"
              onClick={handleOpen}
            >
              {t("priceCta")}
            </button>
            <Link className="btn btn--ghost" href="#pipes">
              {t("heroCatalogCta")}
            </Link>
          </div>
        </div>

        <div className={styles.hero__visual} aria-hidden="true">
          <div className={styles.hero__metal}>
            <div className={styles.hero__pipe}>
              <div className={styles["hero__pipe-core"]} />
            </div>
          </div>
        </div>

        <a className="scroll-hint" href="#about">
          {t("heroScroll")}
        </a>
      </div>
    </section>
  );
}
