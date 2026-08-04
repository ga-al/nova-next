"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import styles from "./Header.module.css";
import MobileMenu from "../MobileMenu/MobileMenu";

const navItems = [
  { label: "home", href: "#hero" },
  { label: "about", href: "#about" },
  { label: "catalog", href: "#pipes" },
];

const sectionIds = navItems.map((item) => item.href.slice(1));
const DESKTOP_MQ = "(min-width: 769px)";

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState(sectionIds[0]);

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

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (elements.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleRatios.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleRatios.delete(entry.target.id);
          }
        }

        let nextId = sectionIds[0];
        let bestRatio = -1;

        for (const id of sectionIds) {
          const ratio = visibleRatios.get(id);
          if (ratio != null && ratio >= bestRatio) {
            bestRatio = ratio;
            nextId = id;
          }
        }

        if (bestRatio >= 0) {
          setActiveId((prev) => (prev === nextId ? prev : nextId));
        }
      },
      {
        // Учитываем fixed-header; активация, когда блок в верхней части экрана
        rootMargin: "-64px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <div className="container">
          <Link href="/" className={styles.logo}>
            <Image src="/logo.svg" alt="Nova" width={126} height={32} priority />
          </Link>
          <nav className={styles.nav} aria-label={tCommon("mainNav")}>
            <ul className={styles.nav__list}>
              {navItems.map((item) => {
                const id = item.href.slice(1);
                const isActive = activeId === id;

                return (
                  <li className={styles.nav__item} key={item.label}>
                    <Link
                      href={item.href}
                      className={
                        isActive
                          ? `${styles.nav__link} ${styles.nav__linkActive}`
                          : styles.nav__link
                      }
                      aria-current={isActive ? "true" : undefined}
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                );
              })}
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
      <MobileMenu
        items={navItems}
        activeId={activeId}
        isOpen={isOpen}
        onClose={close}
      />
    </header>
  );
}
