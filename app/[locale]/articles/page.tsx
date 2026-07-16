import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArticlesPage } from "@/features/landing-page/components/articles";
import {
  getArticlesContent,
  getArticlesSeoText,
} from "@/features/landing-page/lib/cms";
import type { AppLocale } from "@/features/landing-page/types";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;

  try {
    const content = await getArticlesContent(appLocale);
    const { title, description } = getArticlesSeoText(content);

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
  } catch {
    const t = await getTranslations("ArticlesPage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <ArticlesPage locale={locale as AppLocale} />;
}
