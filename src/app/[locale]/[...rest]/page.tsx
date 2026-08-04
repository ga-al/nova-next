import { notFound } from "next/navigation";

/**
 * Unknown paths under a valid locale (e.g. /ru/no-such-page) only hit our
 * [locale]/not-found.tsx when something calls notFound() — this catch-all
 * does that. See https://next-intl.dev/docs/environments/error-files
 */
export default function CatchAllPage() {
  notFound();
}
