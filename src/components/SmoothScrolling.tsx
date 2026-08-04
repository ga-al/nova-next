"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import "lenis/dist/lenis.css";

/** Duration-based easing — «пролистывание», а не лёгкий lerp. */
const LENIS_OPTIONS: LenisOptions = {
  autoRaf: true,
  // без lerp: анимация идёт по duration + easing
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  // якоря меню / «Далее» — через lenis.scrollTo, не через прыжок браузера
  anchors: true,
  syncTouch: false,
  touchMultiplier: 1.5,
  wheelMultiplier: 0.8,
};

export function SmoothScrolling({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
