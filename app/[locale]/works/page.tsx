import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { WorksPage } from "@/features/landing-page/components/works-page";
import { getWorksContent, getWorksSeoText } from "@/features/landing-page/lib/cms";
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
    const content = await getWorksContent(appLocale);
    const { title, description } = getWorksSeoText(content);

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
    const t = await getTranslations("WorksPage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;

  return <WorksPage locale={locale as AppLocale} />;
}