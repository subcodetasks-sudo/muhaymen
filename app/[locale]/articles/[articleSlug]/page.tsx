import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/features/landing-page/components/article-detail-page";
import {
  buildArticleJsonLd,
  getArticleBySlug,
  getArticleSeoText,
} from "@/features/landing-page/lib/article-cms";
import type { AppLocale } from "@/features/landing-page/types";
import { ApiError } from "@/lib/api";

type PageProps = {
  params: Promise<{ locale: string; articleSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, articleSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(articleSlug);

  try {
    const article = await getArticleBySlug(appLocale, slug);
    const { title, description } = getArticleSeoText(article);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        locale: appLocale === "ar" ? "ar_SA" : "en_US",
        type: "article",
        ...(article.image.url ? { images: [{ url: article.image.url }] } : {}),
      },
      twitter: {
        card: article.image.url ? "summary_large_image" : "summary",
        title,
        description,
        ...(article.image.url ? { images: [article.image.url] } : {}),
      },
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Not Found" };
    }

    const t = await getTranslations("ArticlePage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, articleSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(articleSlug);
  const t = await getTranslations("ArticlePage");

  let article;

  try {
    article = await getArticleBySlug(appLocale, slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const jsonLd = buildArticleJsonLd(article, appLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleDetailPage
        locale={appLocale}
        article={article}
        backLabel={t("backToArticles")}
        articlesLabel={t("fallbackTitle")}
      />
    </>
  );
}
