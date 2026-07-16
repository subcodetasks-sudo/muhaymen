"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/react-bits/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "../../hooks/use-favorites";
import {
  getArticleFavoriteKeys,
  getServiceFavoriteKeys,
} from "../../lib/favorites-ids";
import {
  getEmptyFavorites,
  isFavorite,
} from "../../lib/favorites-storage";
import { getServiceSlug } from "../../lib/service-cms";
import type { ArticleWithCategory, CmsServiceItem } from "../../types";
import { ArticleCard } from "../articles/article-card";
import { ServiceCard } from "../our-services/service-card";

type FavoritesFilter = "all" | "article" | "service";

type FavoritesPageClientProps = {
  articles: ArticleWithCategory[];
  services: CmsServiceItem[];
  serviceLegacySlugs: (string | undefined)[];
  articleLegacySlugs: (string | undefined)[];
  serviceSlugToId: [string, string][];
  articleSlugToId: [string, string][];
};

export function FavoritesPageClient({
  articles,
  services,
  serviceLegacySlugs,
  articleLegacySlugs,
}: FavoritesPageClientProps) {
  const t = useTranslations("FavoritesPage");
  const { data, isPending } = useFavorites();
  const favorites = data ?? getEmptyFavorites();
  const [activeFilter, setActiveFilter] = useState<FavoritesFilter>("all");

  const favoritedArticles = useMemo(() => {
    return articles.filter((article, index) => {
      const { id, aliases } = getArticleFavoriteKeys(article, index, [
        articleLegacySlugs[index],
      ]);
      return isFavorite(favorites, "article", id, aliases);
    });
  }, [articleLegacySlugs, articles, favorites]);

  const favoritedServices = useMemo(() => {
    return services.filter((service, index) => {
      const { id, aliases } = getServiceFavoriteKeys(service, index, [
        serviceLegacySlugs[index],
      ]);
      return isFavorite(favorites, "service", id, aliases);
    });
  }, [favorites, serviceLegacySlugs, services]);

  const filters: { key: FavoritesFilter; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "article", label: t("filters.articles") },
    { key: "service", label: t("filters.services") },
  ];

  const showArticles =
    activeFilter === "all" || activeFilter === "article";
  const showServices =
    activeFilter === "all" || activeFilter === "service";

  const visibleArticles = showArticles ? favoritedArticles : [];
  const visibleServices = showServices ? favoritedServices : [];
  const hasItems = visibleArticles.length > 0 || visibleServices.length > 0;

  const emptyMessage = (() => {
    if (activeFilter === "article") return t("emptyArticles");
    if (activeFilter === "service") return t("emptyServices");
    return t("emptyAll");
  })();

  if (isPending) {
    return (
      <div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        aria-busy="true"
        aria-label={t("loading")}
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-3xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-bold transition-all",
              activeFilter === filter.key
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {hasItems ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleArticles.map((article) => {
            const index = articles.findIndex(
              (item) => item.slug === article.slug,
            );
            return (
              <ArticleCard
                key={`article-${article.slug}`}
                article={article}
                index={index}
                legacySlug={articleLegacySlugs[index]}
              />
            );
          })}
          {visibleServices.map((service) => {
            const index = services.indexOf(service);
            const slug = getServiceSlug(service.title);
            return (
              <ServiceCard
                key={`service-${slug}`}
                service={service}
                index={index}
                legacySlug={serviceLegacySlugs[index]}
                href={`/services/${slug}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card px-8 py-16 text-center">
          <p className="mb-6 text-lg text-muted-foreground">{emptyMessage}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(activeFilter === "all" || activeFilter === "article") && (
              <Button variant="outline" className="rounded-full font-bold" asChild>
                <Link href="/articles">{t("browseArticles")}</Link>
              </Button>
            )}
            {(activeFilter === "all" || activeFilter === "service") && (
              <Button className="rounded-full font-bold" asChild>
                <Link href="/services">{t("browseServices")}</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
