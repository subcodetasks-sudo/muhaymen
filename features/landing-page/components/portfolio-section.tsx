import { buildWorksJsonLd, getWorksContent } from "../lib/cms";
import type { LocaleProps } from "../types";
import { PortfolioSectionClient } from "./portfolio-section-client";

const FEATURED_WORKS_LIMIT = 3;

export async function PortfolioSection({ locale }: LocaleProps) {
  const content = await getWorksContent(locale);
  const jsonLd = buildWorksJsonLd(content, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioSectionClient
        locale={locale}
        content={content}
        featuredLimit={FEATURED_WORKS_LIMIT}
      />
    </>
  );
}
