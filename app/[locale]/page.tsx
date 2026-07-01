import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LandingPage } from "@/features/landing-page";
import {
  getHeroContent,
  getHeroSeoText,
} from "@/features/landing-page/lib/cms";
import type { AppLocale } from "@/features/landing-page/types";
import { getAppName } from "@/lib/settings";
import { getAppSettings } from "@/lib/settings-server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("LandingPage");

  try {
    const [content, settings] = await Promise.all([
      getHeroContent(locale),
      getAppSettings(),
    ]);
    const { description } = getHeroSeoText(content);
    const title = getAppName(settings, locale);

    return {
      title,
      description,
      applicationName: title,
      openGraph: {
        title,
        description,
        siteName: title,
        locale: locale === "ar" ? "ar_SA" : "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: t("title"),
      description: t("description"),
    };
  }
}

export default function Page() {
  return <LandingPage />;
}
