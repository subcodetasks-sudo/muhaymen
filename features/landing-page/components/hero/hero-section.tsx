import { getAppName } from "@/lib/settings";
import { getAppSettings } from "@/lib/settings-server";
import { buildHomeJsonLd, getHeroContent } from "../../lib/cms";
import type { LocaleProps } from "../../types";
import { HeroSectionClient } from "./hero-section-client";

export async function HeroSection({ locale, direction }: LocaleProps) {
  const [content, settings] = await Promise.all([
    getHeroContent(locale),
    getAppSettings(),
  ]);
  const jsonLd = buildHomeJsonLd(content, locale, getAppName(settings, locale));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSectionClient locale={locale} direction={direction} />
    </>
  );
}
