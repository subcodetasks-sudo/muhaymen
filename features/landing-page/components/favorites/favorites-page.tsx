import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/react-bits/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import { getArticlesContent, getServicesContent } from "../../lib/cms";
import {
  getArticleFavoriteId,
  getServiceFavoriteId,
} from "../../lib/favorites-ids";
import { getServiceSlug } from "../../lib/service-cms";
import { getAllArticlesWithCategory } from "../../utils/articles-utils";
import type { AppLocale } from "../../types";
import { Footer } from "../layout/footer";
import { FavoritesPageClient } from "./favorites-page-client";

type FavoritesPageProps = {
  locale: AppLocale;
};

export async function FavoritesPage({ locale }: FavoritesPageProps) {
  const otherLocale: AppLocale = locale === "ar" ? "en" : "ar";

  const [articlesContent, otherArticlesContent, servicesContent, otherServicesContent, t] =
    await Promise.all([
      getArticlesContent(locale),
      getArticlesContent(otherLocale),
      getServicesContent(locale),
      getServicesContent(otherLocale),
      getTranslations("FavoritesPage"),
    ]);

  const articles = getAllArticlesWithCategory(articlesContent);
  const otherArticles = getAllArticlesWithCategory(otherArticlesContent);
  const services = servicesContent.services;
  const otherServices = otherServicesContent.services;

  const serviceLegacySlugs = services.map((_, index) =>
    otherServices[index]
      ? getServiceSlug(otherServices[index].title)
      : undefined,
  );

  const articleLegacySlugs = articles.map((_, index) =>
    otherArticles[index]?.slug,
  );

  const serviceSlugToId = new Map<string, string>();
  services.forEach((service, index) => {
    const stableId = getServiceFavoriteId(service, index);
    serviceSlugToId.set(getServiceSlug(service.title), stableId);
    const other = otherServices[index];
    if (other) {
      serviceSlugToId.set(getServiceSlug(other.title), stableId);
    }
  });

  const articleSlugToId = new Map<string, string>();
  articles.forEach((article, index) => {
    const stableId = getArticleFavoriteId(article, index);
    articleSlugToId.set(article.slug, stableId);
    const other = otherArticles[index];
    if (other?.slug) {
      articleSlugToId.set(other.slug, stableId);
    }
  });

  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="px-6 pb-24 pt-28">
        <div className="container mx-auto max-w-6xl">
          <Button
            variant="ghost"
            className="mb-8 rounded-full font-bold"
            asChild
          >
            <Link href="/">
              <BackArrow className="me-2" size={16} />
              {t("backToHome")}
            </Link>
          </Button>

          <div className="mb-14">
            <h1 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <FavoritesPageClient
            articles={articles}
            services={services}
            serviceLegacySlugs={serviceLegacySlugs}
            articleLegacySlugs={articleLegacySlugs}
            serviceSlugToId={[...serviceSlugToId.entries()]}
            articleSlugToId={[...articleSlugToId.entries()]}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
