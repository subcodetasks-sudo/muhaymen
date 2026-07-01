"use client";

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { settingsKeys } from "@/features/landing-page/lib/query-keys";
import { parseAppSettings, type SettingsResponse } from "@/lib/settings";

const emptySubscribe = () => () => {};

export function useAppSettings() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: async () => {
      const response = await fetchApi<SettingsResponse>("/auth/settings");
      return parseAppSettings(response.data);
    },
    enabled: !isServer,
  });
}
