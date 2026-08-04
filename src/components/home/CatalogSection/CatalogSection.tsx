"use client";

import { useTranslations } from "next-intl";
import {
  CATALOG_DOWNLOAD_NAME,
  CATALOG_FILE,
  catalogCards,
} from "@/data/catalog";
import styles from "./CatalogSection.module.css";

export default function CatalogSection() {
  const t = useTranslations("home");

  return (
    <section id="pipes" className={styles.pipes} aria-labelledby="pipes-title">
      <div className="container">
        <div className={styles.pipes__head}>
          <div>
            <p className="eyebrow">{t("pipesEyebrow")}</p>
            <h2 id="pipes-title" className="sectionTitle">
              {t("pipesTitle")}
            </h2>
          </div>
          <a
            className="btn btn--ghost"
            href={CATALOG_FILE}
            download={CATALOG_DOWNLOAD_NAME}
          >
            {t("pipesCta")}
          </a>
        </div>
        <ul className={styles.pipes__grid}>
          {catalogCards.map((card) => (
            <li key={card.id} className={styles.pipe}>
              <h3 className={styles.pipe__title}>{t(card.titleKey)}</h3>
              {card.kind === "specs" ? (
                <dl className={styles.pipe__specs}>
                  {card.specs.map((row) => (
                    <div key={row.termKey} className={styles.pipe__row}>
                      <dt className={styles.pipe__term}>{t(row.termKey)}</dt>
                      <dd className={styles.pipe__value}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className={styles.pipe__text}>{t(card.textKey)}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
