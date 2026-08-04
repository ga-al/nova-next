"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "./AboutSection.module.css";

const ITEMS = ["about1", "about2", "about3", "about4"] as const;

export default function AboutSection() {
  const t = useTranslations("home");

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <div className={styles.about__grid}>
          <div className={styles.about__media}>
            <Image
              className={styles.about__img}
              src="/images/about-pipes.webp"
              alt={t("aboutImgAlt")}
              width={720}
              height={560}
              sizes="(max-width: 61.25rem) 100vw, 55vw"
            />
          </div>
          <div className={styles.about__copy}>
            <p className="eyebrow">{t("aboutEyebrow")}</p>
            <h2 id="about-title" className="sectionTitle">
              {t("aboutTitle")}
            </h2>
            <ul className={styles.about__list}>
              {ITEMS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
        </div>

        <a className="scroll-hint" href="#pipes">
          {t("heroScroll")}
        </a>
      </div>
    </section>
  );
}
