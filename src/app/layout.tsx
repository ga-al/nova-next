import type { ReactNode } from "react";
import "./globals.css";

/**
 * Required when `app/not-found.tsx` exists. The real chrome lives in
 * `[locale]/layout.tsx` (html/body). This layout only passes children through.
 * @see https://next-intl.dev/docs/environments/error-files
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
