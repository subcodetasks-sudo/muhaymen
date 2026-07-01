import type { MetadataRoute } from "next";
import {
  getArticlesContent,
  getWorksContent,
} from "@/features/landing-page/lib/cms";
import type { AppLocale } from "@/features/landing-page/types";
import { getAllArticlesWithCategory } from "@/features/landing-page/utils/articles-utils";
import { getAllWorksWithCategory } from "@/features/landing-page/utils/portfolio-utils";
import { routing } from "@/i18n/routing";
import {
  getAbsoluteLocalizedUrl,
  getLanguageAlternates,
} from "@/lib/site-url";

export const revalidate = 3600;

function createStaticEntry(
  href: "/" | "/articles",
  options: {
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: getAbsoluteLocalizedUrl(routing.defaultLocale as AppLocale, href),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: {
      languages: getLanguageAlternates(href),
    },
  };
}

async function getArticleEntries(): Promise<MetadataRoute.Sitemap> {
  const articlesByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale: locale as AppLocale,
      articles: getAllArticlesWithCategory(
        await getArticlesContent(locale as AppLocale),
      ),
    })),
  );

  return articlesByLocale.flatMap(({ locale, articles }) =>
    articles.map((article) => ({
      url: getAbsoluteLocalizedUrl(locale, {
        pathname: "/articles/[articleSlug]",
        params: { articleSlug: article.slug },
      }),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );
}

async function getWorkEntries(): Promise<MetadataRoute.Sitemap> {
  const worksByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale: locale as AppLocale,
      works: getAllWorksWithCategory(
        await getWorksContent(locale as AppLocale),
      ),
    })),
  );

  return worksByLocale.flatMap(({ locale, works }) =>
    works.map((work) => ({
      url: getAbsoluteLocalizedUrl(locale, {
        pathname: "/works/[workSlug]",
        params: { workSlug: work.slug },
      }),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articleEntries, workEntries] = await Promise.all([
    getArticleEntries(),
    getWorkEntries(),
  ]);

  return [
    createStaticEntry("/", {
      changeFrequency: "weekly",
      priority: 1,
    }),
    createStaticEntry("/articles", {
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...articleEntries,
    ...workEntries,
  ];
}
