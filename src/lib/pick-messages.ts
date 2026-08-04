import type { AbstractIntlMessages } from "next-intl";

/**
 * Picks specific top-level namespaces from a messages object.
 *
 * Used to scope NextIntlClientProvider so we only ship the translations a page's
 * client components actually use, instead of the full ~250 KB JSON.
 */
export function pickMessages<TKey extends string>(
  messages: AbstractIntlMessages,
  keys: readonly TKey[],
): AbstractIntlMessages {
  const out: Record<string, AbstractIntlMessages[string]> = {};
  for (const key of keys) {
    if (key in messages) {
      out[key] = messages[key];
    }
  }
  return out;
}
