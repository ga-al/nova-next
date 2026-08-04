import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { pickMessages } from "./pick-messages";

interface ScopedIntlProviderProps {
  namespaces: readonly string[];
  locale: string;
  children: React.ReactNode;
}

/**
 * Wraps `children` in a NextIntlClientProvider that only ships the given
 * namespaces to the client. Used by per-section layouts to avoid bundling the
 * entire ~250 KB messages JSON with every page load.
 *
 * `locale` is required so the provider can call `setRequestLocale` before
 * `getMessages` — without it, next-intl forces dynamic rendering on the whole
 * subtree.
 */
export default async function ScopedIntlProvider({
  namespaces,
  locale,
  children,
}: ScopedIntlProviderProps) {
  setRequestLocale(locale);

  const messages = await getMessages();
  const scoped = pickMessages(messages, namespaces);

  return (
    <NextIntlClientProvider locale={locale} messages={scoped}>
      {children}
    </NextIntlClientProvider>
  );
}
