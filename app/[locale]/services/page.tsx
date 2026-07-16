import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServicesPage } from "@/features/landing-page/components/our-services";
import {
  getServicesContent,
  getServicesSeoText,
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
    const content = await getServicesContent(appLocale);
    const { title, description } = getServicesSeoText(content);

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
    const t = await getTranslations("ServicesPage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  return <ServicesPage locale={locale as AppLocale} />;
}
