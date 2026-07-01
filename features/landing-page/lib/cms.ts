import { cache } from "react";
import { fetchApi } from "@/lib/api";
import { getAllWorksWithCategory } from "../utils/portfolio-utils";
import { getAllArticlesWithCategory } from "../utils/articles-utils";
import type {
  AppLocale,
  AboutContent,
  AboutContentResponse,
  HeroContent,
  HeroContentResponse,
  ServicesContent,
  ServicesContentResponse,
  WorksContent,
  WorksContentResponse,
  ArticlesContent,
  ArticlesContentResponse,
  FooterContentResponse,
  ClientsContent,
  ClientsContentResponse,
  MethodologyContentResponse,
} from "../types";

export const getHeroContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<HeroContentResponse>("/content/hero", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getAboutContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<AboutContentResponse>("/about", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getServicesContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<ServicesContentResponse>("/services", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getWorksContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<WorksContentResponse>("/works", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getClientsContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<ClientsContentResponse>("/clients", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getMethodologyContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<MethodologyContentResponse>("/methodology", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getArticlesContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<ArticlesContentResponse>("/articles", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export const getFooterContent = cache(async (locale: AppLocale) => {
  const response = await fetchApi<FooterContentResponse>("/footer", {
    locale,
    next: { revalidate: 60 },
  });

  return response.data;
});

export function getAboutSeoText(content: AboutContent) {
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

export function getServicesSeoText(content: ServicesContent) {
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

export function getWorksSeoText(content: WorksContent) {
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

export function getArticlesSeoText(content: ArticlesContent) {
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

export function buildArticlesJsonLd(content: ArticlesContent, locale: AppLocale) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;

  return buildArticlesCollectionJsonLd(
    content,
    locale,
    `${pageUrl}#blog`,
    `${pageUrl}/#webpage`,
  );
}

export function buildArticlesListPageJsonLd(
  content: ArticlesContent,
  locale: AppLocale,
) {
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;
  const articlesPageUrl = `${pageUrl}/articles`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildArticlesCollectionJsonLd(
        content,
        locale,
        articlesPageUrl,
        `${articlesPageUrl}/#webpage`,
      )["@graph"][0],
      {
        "@type": "BreadcrumbList",
        "@id": `${articlesPageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: pageUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: getArticlesSeoText(content).title,
            item: articlesPageUrl,
          },
        ],
      },
    ],
  };
}

function buildArticlesCollectionJsonLd(
  content: ArticlesContent,
  locale: AppLocale,
  collectionUrl: string,
  isPartOfId: string,
) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const { title, description } = getArticlesSeoText(content);
  const articles = getAllArticlesWithCategory(content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${collectionUrl}/#collection`,
        name: title,
        description,
        url: collectionUrl,
        inLanguage: locale,
        isPartOf: { "@id": isPartOfId },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articles.length,
          itemListElement: articles.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              "@id": `${siteUrl}/${locale}/articles/${article.slug}`,
              headline: stripHtml(article.title),
              description: stripHtml(article.description),
              url: `${siteUrl}/${locale}/articles/${article.slug}`,
              ...(article.image.url ? { image: article.image.url } : {}),
              articleSection: stripHtml(article.categoryTitle),
            },
          })),
        },
      },
    ],
  };
}

export function buildWorksJsonLd(content: WorksContent, locale: AppLocale) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;
  const sectionUrl = `${pageUrl}#portfolio`;
  const { title, description } = getWorksSeoText(content);
  const works = getAllWorksWithCategory(content);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${sectionUrl}/#collection`,
        name: title,
        description,
        url: sectionUrl,
        inLanguage: locale,
        isPartOf: { "@id": `${pageUrl}/#webpage` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((work, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              "@id": `${siteUrl}/${locale}/works/${work.slug}`,
              name: stripHtml(work.title),
              description: stripHtml(work.description),
              url: `${siteUrl}/${locale}/works/${work.slug}`,
              ...(work.image.url ? { image: work.image.url } : {}),
              genre: stripHtml(work.categoryTitle),
            },
          })),
        },
      },
    ],
  };
}

export function buildHomeJsonLd(
  content: HeroContent,
  locale: AppLocale,
  siteName: string,
) {
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
        name: siteName,
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

export function buildAboutJsonLd(content: AboutContent, locale: AppLocale) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;
  const { title, description } = getAboutSeoText(content);

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${pageUrl}/#about`,
    "mainEntity": {
      "@type": "Organization",
      "name": stripHtml(title),
      "description": stripHtml(description),
      "url": siteUrl,
      ...(content.image.url ? { "image": content.image.url } : {}),
    }
  };
}

export function buildClientsJsonLd(content: ClientsContent, locale: AppLocale) {
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, "").trim();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com"
  ).replace(/\/$/, "");
  const pageUrl = `${siteUrl}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${pageUrl}/#clients`,
    "name": stripHtml(content.title),
    "description": stripHtml(content.description),
    "itemListElement": content.clients.map((client, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": stripHtml(client.title),
        "description": stripHtml(client.description),
      }
    }))
  };
}
