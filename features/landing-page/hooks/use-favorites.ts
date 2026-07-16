"use client";

import { useSyncExternalStore } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { showSuccessToast } from "@/components/themed-toast";
import { favoritesKeys } from "../lib/query-keys";
import {
  getEmptyFavorites,
  isFavorite,
  readFavorites,
  toggleFavoriteInState,
  writeFavorites,
  type FavoriteType,
  type FavoritesState,
} from "../lib/favorites-storage";

const emptySubscribe = () => () => {};

export function useFavorites() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  return useQuery({
    queryKey: favoritesKeys.all,
    queryFn: readFavorites,
    enabled: !isServer,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}

export function useIsFavorite(
  type: FavoriteType,
  id: string,
  aliases: string[] = [],
) {
  const { data } = useFavorites();
  return isFavorite(data ?? getEmptyFavorites(), type, id, aliases);
}

type ToggleFavoriteVariables = {
  type: FavoriteType;
  id: string;
  aliases?: string[];
};

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const t = useTranslations("Favorites");

  return useMutation({
    mutationFn: async ({
      type,
      id,
      aliases = [],
    }: ToggleFavoriteVariables) => {
      const current =
        queryClient.getQueryData<FavoritesState>(favoritesKeys.all) ??
        readFavorites();
      const { next, added } = toggleFavoriteInState(
        current,
        type,
        id,
        aliases,
      );
      writeFavorites(next);
      return { next, added, type };
    },
    onSuccess: ({ next, added, type }) => {
      queryClient.setQueryData(favoritesKeys.all, next);

      if (type === "service") {
        showSuccessToast(added ? t("addedService") : t("removedService"));
        return;
      }

      showSuccessToast(added ? t("addedArticle") : t("removedArticle"));
    },
  });
}
