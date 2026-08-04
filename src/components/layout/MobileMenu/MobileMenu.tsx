"use client";

import { useState, useEffect, type TransitionEvent } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import styles from "./MobileMenu.module.css";

/** Длительность CSS-анимации закрытия — должна совпадать с transition в MobileMenu.module.css */
const EXIT_MS = 350;

export default function MobileMenu({
  items,
  isOpen,
  onClose,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");

  // mounted — меню в DOM (нужно для анимации выхода)
  // visible — флаг для CSS data-open (запускает transition)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(id);
    }

    setVisible(false);
    const timer = window.setTimeout(() => {
      setMounted(false);
    }, EXIT_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const handleTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (!isOpen) {
      setMounted(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      id="mobile-menu"
      className={styles.mobileMenu}
      data-open={visible ? "true" : "false"}
      onTransitionEnd={handleTransitionEnd}
    >
      <button
        type="button"
        className={styles.mobileMenu__backdrop}
        aria-label={tCommon("closeMenu")}
        onClick={onClose}
      />
      <nav
        className={styles.mobileMenu__nav}
        aria-label={tCommon("mobileNav")}
      >
        <ul className={styles.mobileMenu__list}>
          {items.map((item) => (
            <li className={styles.mobileMenu__item} key={item.label}>
              <Link
                href={item.href}
                className={styles.mobileMenu__link}
                onClick={onClose}
              >
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>,
    document.body,
  );
}
