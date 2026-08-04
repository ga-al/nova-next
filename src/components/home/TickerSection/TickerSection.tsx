"use client";

import { useTranslations } from "next-intl";
import {
  TICKER_COPIES_PER_HALF,
  tickerData,
  type TickerItem,
} from "@/data/ticker";
import styles from "./TickerSection.module.css";

const tickerItems = Array.from(
  { length: TICKER_COPIES_PER_HALF },
  (_, copy) =>
    tickerData.map((item) => ({ ...item, id: `${copy}-${item.name}` })),
).flat();

function TickerCards({
  prefix,
  weight,
}: {
  prefix: string;
  weight: string;
}) {
  return tickerItems.map((item: TickerItem & { id: string }) => (
    <article key={`${prefix}-${item.id}`} className={styles.tickerCard}>
      <h3 className={styles.tickerCard__name}>{item.name}</h3>
      <p className={styles.tickerCard__value}>
        {item.value}
        <span>{weight}</span>
        <em className={item.direction === "up" ? styles.up : styles.down}>
          {item.change}
        </em>
      </p>
      <time dateTime={item.dateTime}>{item.time}</time>
    </article>
  ));
}

export default function TickerSection({
  handleOpen,
}: {
  handleOpen: () => void;
}) {
  const t = useTranslations("home");
  const weight = t("tickerWeight");

  return (
    <section id="ticker" className={styles.ticker}>
      <div className="container">
        <div className={styles.ticker__viewport}>
          <div
            className={`${styles.ticker__fade} ${styles["ticker__fade--left"]}`}
            aria-hidden="true"
          />
          <div className={styles.ticker__track}>
            <div className={styles.ticker__group}>
              <TickerCards prefix="a" weight={weight} />
            </div>
            <div className={styles.ticker__group} aria-hidden="true">
              <TickerCards prefix="b" weight={weight} />
            </div>
          </div>
          <div
            className={`${styles.ticker__fade} ${styles["ticker__fade--right"]}`}
            aria-hidden="true"
          />
          <div className={styles.ticker__action}>
            <button
              type="button"
              className="btn btn--transparent"
              onClick={handleOpen}
            >
              {t("priceCta")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
