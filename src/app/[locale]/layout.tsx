import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SmoothScrolling } from "@/components/SmoothScrolling";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { routing } from "@/i18n/routing";
import { pickMessages } from "@/lib/pick-messages";
import "../globals.css";
import styles from "./layout.module.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Layout-level client namespaces (e.g. switcher, mobile menu). Pages add their own via ScopedIntlProvider. */
const LAYOUT_NAMESPACES = ["common", "nav"] as const;

const CRITICAL_FONTS = [
  "/fonts/Aneliza-Regular.woff2",
  "/fonts/Aneliza-Medium.woff2",
  "/fonts/Aneliza-Bold.woff2",
  "/fonts/Wadik-Bold.woff2",
] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const layoutMessages = pickMessages(messages, LAYOUT_NAMESPACES);

  return (
    <html lang={locale}>
      <head>
        {CRITICAL_FONTS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body>
        <SmoothScrolling>
          <NextIntlClientProvider locale={locale} messages={layoutMessages}>
            <Header />
            <main className={styles.main}>{children}</main>
          </NextIntlClientProvider>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
