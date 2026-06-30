import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { LandingPage } from "@/features/landing-page";
import {
  getHeroContent,
  getHeroSeoText,
} from "@/features/landing-page/lib/cms";
import type { AppLocale } from "@/features/landing-page/types";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("LandingPage");

  try {
    const content = await getHeroContent(locale);
    const { title, description } = getHeroSeoText(content);
    return { title, description };
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
