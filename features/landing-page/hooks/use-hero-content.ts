"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { landingCmsKeys } from "../lib/query-keys";
import type { AppLocale, HeroContentResponse } from "../types";

export function useHeroContent(locale: AppLocale) {
  return useQuery({
    queryKey: landingCmsKeys.hero(locale),
    queryFn: async () => {
      const response = await fetchApi<HeroContentResponse>("/content/hero", {
        locale,
      });
      return response.data;
    },
  });
}
