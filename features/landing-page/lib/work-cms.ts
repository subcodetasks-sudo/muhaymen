import { cacheLife, cacheTag } from "next/cache";
import { fetchApi } from "@/lib/api";
import type { AppLocale, WorkDetail, WorkDetailResponse } from "../types";

export async function getWorkBySlug(locale: AppLocale, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("works", `work-${slug}`, `work-${locale}-${slug}`);

  const response = await fetchApi<WorkDetailResponse>(
    `/works/${encodeURIComponent(slug)}`,
    { locale },
  );

  return response.data;
}

export function getWorkSeoText(content: WorkDetail) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

  return {
    title: stripHtml(content.title),
    description: stripHtml(content.description),
  };
}

export function buildWorkJsonLd(content: WorkDetail, locale: AppLocale) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}/works/${content.slug}`;
  const portfolioUrl = `${siteUrl}/${locale}#portfolio`;
  const { title, description } = getWorkSeoText(content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}/#work`,
        name: title,
        description,
        url: pageUrl,
        inLanguage: locale,
        ...(content.image.url ? { image: content.image.url } : {}),
        genre: stripHtml(content.category.title),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: locale === "ar" ? "أعمالنا" : "Portfolio",
            item: portfolioUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
