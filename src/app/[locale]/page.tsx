import ScopedIntlProvider from "@/lib/ScopedIntlProvider";
import HomeContent from "@/components/home/HomeContent";
import { createPageMetadata } from "@/lib/page-metadata";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateMetadata({ params }: Props) {
  return createPageMetadata({
    params,
    namespace: "home",
    titleKey: "metaTitle",
    descriptionKey: "metaDescription",
    pathname: "/",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <ScopedIntlProvider locale={locale} namespaces={["home", "contactForm"]}>
      <HomeContent />
    </ScopedIntlProvider>
  );
}
