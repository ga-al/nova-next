"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";

const navItems = [
  { label: "home", href: "/" },
  { label: "about", href: "#about" },
  { label: "catalog", href: "#pipes" },
];

const DESKTOP_MQ = "(min-width: 769px)";

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    const onChange = () => {
      if (mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className="container">
          <Link href="/" className={styles.logo}>
            <img src="/logo.svg" alt="Nova" />
          </Link>
          <nav className={styles.nav} aria-label={tCommon("mainNav")}>
            <ul className={styles.nav__list}>
              {navItems.map((item) => (
                <li className={styles.nav__item} key={item.label}>
                  <Link href={item.href} className={styles.nav__link}>
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.header__actions}>
            <LocaleSwitcher />
            <button
              className={styles.burger}
              type="button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? tCommon("closeMenu") : tCommon("openMenu")}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu items={navItems} isOpen={isOpen} onClose={close} />
    </header>
  );
}
