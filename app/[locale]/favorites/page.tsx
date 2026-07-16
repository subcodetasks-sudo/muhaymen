import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FavoritesPage } from "@/features/landing-page/components/favorites";
import type { AppLocale } from "@/features/landing-page/types";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const t = await getTranslations("FavoritesPage");
  const title = t("fallbackTitle");
  const description = t("fallbackDescription");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: appLocale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <FavoritesPage locale={locale as AppLocale} />;
}
