"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useArticlesContent } from "../../hooks/use-articles-content";
import { useFavorites } from "../../hooks/use-favorites";
import { useServicesContent } from "../../hooks/use-services-content";
import {
  getArticleFavoriteId,
  getServiceFavoriteId,
  isStableFavoriteId,
} from "../../lib/favorites-ids";
import { favoritesKeys } from "../../lib/query-keys";
import {
  getEmptyFavorites,
  migrateFavoritesToStableIds,
  writeFavorites,
} from "../../lib/favorites-storage";
import { getServiceSlug } from "../../lib/service-cms";
import { getAllArticlesWithCategory } from "../../utils/articles-utils";

/**
 * Rewrites locale-specific favorite slugs (e.g. Arabic title slugs) into
 * locale-stable ids so hearts and the favorites page work in both languages.
 */
export function FavoritesMigrator() {
  const queryClient = useQueryClient();
  const ranRef = useRef(false);
  const { data: favorites } = useFavorites();
  const { data: arServices } = useServicesContent("ar");
  const { data: enServices } = useServicesContent("en");
  const { data: arArticles } = useArticlesContent("ar");
  const { data: enArticles } = useArticlesContent("en");

  useEffect(() => {
    if (ranRef.current) return;
    if (!favorites || !arServices || !enServices || !arArticles || !enArticles) {
      return;
    }

    const hasLegacy = [...favorites.services, ...favorites.articles].some(
      (value) => !isStableFavoriteId(value),
    );
    if (!hasLegacy) {
      ranRef.current = true;
      return;
    }

    const serviceSlugToId = new Map<string, string>();
    const maxServices = Math.max(
      arServices.services.length,
      enServices.services.length,
    );

    for (let index = 0; index < maxServices; index += 1) {
      const ar = arServices.services[index];
      const en = enServices.services[index];
      const stableSource = ar ?? en;
      if (!stableSource) continue;

      const stableId = getServiceFavoriteId(stableSource, index);
      if (ar) serviceSlugToId.set(getServiceSlug(ar.title), stableId);
      if (en) serviceSlugToId.set(getServiceSlug(en.title), stableId);
    }

    const articleSlugToId = new Map<string, string>();
    const arList = getAllArticlesWithCategory(arArticles);
    const enList = getAllArticlesWithCategory(enArticles);
    const maxArticles = Math.max(arList.length, enList.length);

    for (let index = 0; index < maxArticles; index += 1) {
      const ar = arList[index];
      const en = enList[index];
      const stableSource = ar ?? en;
      if (!stableSource) continue;

      const stableId = getArticleFavoriteId(stableSource, index);
      if (ar) articleSlugToId.set(ar.slug, stableId);
      if (en) articleSlugToId.set(en.slug, stableId);
    }

    const migrated = migrateFavoritesToStableIds(
      favorites ?? getEmptyFavorites(),
      {
        services: serviceSlugToId,
        articles: articleSlugToId,
      },
    );

    const unchanged =
      migrated.services.join("\0") === favorites.services.join("\0") &&
      migrated.articles.join("\0") === favorites.articles.join("\0");

    ranRef.current = true;
    if (unchanged) return;

    writeFavorites(migrated);
    queryClient.setQueryData(favoritesKeys.all, migrated);
  }, [
    arArticles,
    arServices,
    enArticles,
    enServices,
    favorites,
    queryClient,
  ]);

  return null;
}
