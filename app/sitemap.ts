import type { MetadataRoute } from "next";
import {
  getArticlesContent,
  getServicesContent,
  getWorksContent,
} from "@/features/landing-page/lib/cms";
import { getServiceSlug } from "@/features/landing-page/lib/service-cms";
import type { AppLocale } from "@/features/landing-page/types";
import { getAllArticlesWithCategory } from "@/features/landing-page/utils/articles-utils";
import { getAllWorksWithCategory } from "@/features/landing-page/utils/portfolio-utils";
import { routing } from "@/i18n/routing";
import { getAppSettings } from "@/lib/settings-server";
import {
  getAbsoluteLocalizedUrl,
  getLanguageAlternates,
  type LocalizedHref,
} from "@/lib/site-url";

export const revalidate = 3600;

const STATIC_PAGES: Array<{
  href: Extract<LocalizedHref, string>;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { href: "/", changeFrequency: "weekly", priority: 1 },
  { href: "/about-us", changeFrequency: "monthly", priority: 0.9 },
  { href: "/services", changeFrequency: "weekly", priority: 0.9 },
  { href: "/works", changeFrequency: "weekly", priority: 0.8 },
  { href: "/articles", changeFrequency: "weekly", priority: 0.8 },
];

function createStaticEntry(
  href: Extract<LocalizedHref, string>,
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

async function getServiceEntries(): Promise<MetadataRoute.Sitemap> {
  const servicesByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale: locale as AppLocale,
      services: (await getServicesContent(locale as AppLocale)).services,
    })),
  );

  return servicesByLocale.flatMap(({ locale, services }) =>
    services.map((service) => ({
      url: getAbsoluteLocalizedUrl(locale, {
        pathname: "/services/[serviceSlug]",
        params: { serviceSlug: getServiceSlug(service.title) },
      }),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );
}

async function getWorkEntries(): Promise<MetadataRoute.Sitemap> {
  const worksByLocale = await Promise.all(
    routing.locales.map(async (locale) => ({
      locale: locale as AppLocale,
      works: getAllWorksWithCategory(await getWorksContent(locale as AppLocale)),
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
  try {
    const settings = await getAppSettings();
    if (settings.maintenance_mode) {
      return [];
    }
  } catch {
    // Fall through and serve the public sitemap when settings are unavailable.
  }

  const [articleEntries, serviceEntries, workEntries] = await Promise.all([
    getArticleEntries(),
    getServiceEntries(),
    getWorkEntries(),
  ]);

  return [
    ...STATIC_PAGES.map((page) =>
      createStaticEntry(page.href, {
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      }),
    ),
    ...serviceEntries,
    ...articleEntries,
    ...workEntries,
  ];
}
