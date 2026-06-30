import { cache } from "react";
import { fetchApi } from "@/lib/api";
import type { AppLocale, HeroContent, HeroContentResponse } from "../types";

export const getHeroContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<HeroContentResponse>("/content/hero", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export function getHeroSeoText(content: HeroContent) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

  return {
    title: content.seo?.title
      ? stripHtml(content.seo.title)
      : stripHtml(content.title),
    description: content.seo?.description
      ? stripHtml(content.seo.description)
      : stripHtml(content.description),
  };
}

export function buildHomeJsonLd(content: HeroContent, locale: AppLocale) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;
  const { title, description } = getHeroSeoText(content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Muhaymin",
        description,
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}/#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        inLanguage: locale,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
