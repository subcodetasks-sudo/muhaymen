import type { AppLocale } from "@/features/landing-page/types";

export type SettingType = "string" | "boolean" | "json" | "image";

export type SettingEntry = {
  key: string;
  value: string | boolean | string[] | null;
  type: SettingType;
};

export type AppSettings = {
  app_name: string;
  app_name_en: string;
  contact_email: string;
  contact_phone: string;
  default_locale: string;
  default_currency: string;
  maintenance_mode: boolean;
  supported_currencies: string[];
  logo: string | null;
};

export type SettingsResponse = {
  success: boolean;
  message: string;
  data: SettingEntry[];
};

export function parseAppSettings(entries: SettingEntry[]): AppSettings {
  const map = Object.fromEntries(entries.map((entry) => [entry.key, entry.value]));

  return {
    app_name: String(map.app_name ?? ""),
    app_name_en: String(map.app_name_en ?? ""),
    contact_email: String(map.contact_email ?? ""),
    contact_phone: String(map.contact_phone ?? ""),
    default_locale: String(map.default_locale ?? "ar"),
    default_currency: String(map.default_currency ?? "SAR"),
    maintenance_mode: Boolean(map.maintenance_mode),
    supported_currencies: Array.isArray(map.supported_currencies)
      ? map.supported_currencies.map(String)
      : [],
    logo: map.logo ? String(map.logo) : null,
  };
}

export function getAppName(settings: AppSettings, locale: AppLocale): string {
  return locale === "ar" ? settings.app_name : settings.app_name_en;
}
