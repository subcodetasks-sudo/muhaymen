"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { landingCmsKeys } from "../lib/query-keys";
import type { AppLocale, ServicesContentResponse } from "../types";

export function useServicesContent(locale: AppLocale, initialData?: ServicesContentResponse["data"]) {
  return useQuery({
    queryKey: landingCmsKeys.services(locale),
    queryFn: async () => {
      const response = await fetchApi<ServicesContentResponse>("/services", {
        locale,
      });
      return response.data;
    },
    initialData,
  });
}
