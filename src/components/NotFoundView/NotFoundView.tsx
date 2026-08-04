import type { ReactNode } from "react";
import styles from "./NotFoundView.module.css";

type NotFoundViewProps = {
  title: string;
  text: string;
  action: ReactNode;
};

export function NotFoundView({ title, text, action }: NotFoundViewProps) {
  return (
    <section className={styles.notFound} aria-labelledby="not-found-title">
      <div className={`container ${styles.notFound__inner}`}>
        <p className={styles.notFound__code} aria-hidden="true">
          404
        </p>
        <h1 id="not-found-title" className={styles.notFound__title}>
          {title}
        </h1>
        <p className={styles.notFound__text}>{text}</p>
        {action}
      </div>
    </section>
  );
}
