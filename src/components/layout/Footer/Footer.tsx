import styles from "./Footer.module.css";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <p>{t("footerNote")}</p>
        </div>
        <div className={styles.footer__wrapper}>
          <div className="container">
            <div className={styles.footer__meta}>
              <span className={styles.footer__copyright}>
                © {year} {siteConfig.name}
              </span>
              <div className={styles.footer__links}>
                <a
                  href={siteConfig.liveSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("liveSite")}
                </a>
                <a
                  href={siteConfig.themeCodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("themeCode")}
                </a>
              </div>
              <span className={styles.footer__plug}></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
