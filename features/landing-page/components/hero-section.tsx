import { buildHomeJsonLd, getHeroContent } from "../lib/cms";
import type { LocaleProps } from "../types";
import { HeroSectionClient } from "./hero-section-client";

export async function HeroSection({ locale, direction }: LocaleProps) {
  const content = await getHeroContent(locale);
  const jsonLd = buildHomeJsonLd(content, locale);

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
