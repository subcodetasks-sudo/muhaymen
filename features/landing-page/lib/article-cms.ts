import { cacheLife, cacheTag } from "next/cache";
import { fetchApi } from "@/lib/api";
import type {
  AppLocale,
  ArticleDetail,
  ArticleDetailResponse,
} from "../types";

export async function getArticleBySlug(locale: AppLocale, slug: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", `article-${slug}`, `article-${locale}-${slug}`);

  const response = await fetchApi<ArticleDetailResponse>(
    `/articles/${encodeURIComponent(slug)}`,
    { locale },
  );

  return response.data;
}

export function getArticleSeoText(content: ArticleDetail) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();

  return {
    title: stripHtml(content.title),
    description: stripHtml(content.description),
  };
}

export function buildArticleJsonLd(content: ArticleDetail, locale: AppLocale) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}/articles/${content.slug}`;
  const articlesUrl = `${siteUrl}/${locale}#blog`;
  const { title, description } = getArticleSeoText(content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}/#article`,
        headline: title,
        description,
        url: pageUrl,
        inLanguage: locale,
        ...(content.image.url ? { image: content.image.url } : {}),
        articleSection: stripHtml(content.category.title),
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
            name: locale === "ar" ? "المقالات" : "Articles",
            item: articlesUrl,
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
