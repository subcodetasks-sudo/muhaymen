"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { landingCmsKeys } from "../lib/query-keys";
import type { AppLocale, ArticlesContentResponse } from "../types";

export function useArticlesContent(locale: AppLocale) {
  return useQuery({
    queryKey: landingCmsKeys.articles(locale),
    queryFn: async () => {
      const response = await fetchApi<ArticlesContentResponse>("/articles", {
        locale,
      });
      return response.data;
    },
  });
}
