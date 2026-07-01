"use client";

import { useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { settingsKeys } from "@/features/landing-page/lib/query-keys";
import type { AppSettings } from "@/lib/settings";

const emptySubscribe = () => () => {};

// Temporary: skip API fetch to isolate settings-related errors.
const DEFAULT_APP_SETTINGS: AppSettings = {
  app_name: "مهيمين",
  app_name_en: "Muhaymin",
  contact_email: "info@muhaymin.com",
  contact_phone: "+966500000000",
  default_locale: "ar",
  default_currency: "SAR",
  maintenance_mode: false,
  supported_currencies: ["SAR"],
  logo: null,
};

export function useAppSettings() {
  const isServer = useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  );

  return useQuery({
    queryKey: settingsKeys.all,
    queryFn: async () => DEFAULT_APP_SETTINGS,
    enabled: !isServer,
  });
}
