import type { AppLocale } from "../types";

export const landingCmsKeys = {
  all: ["landing-cms"] as const,
  hero: (locale: AppLocale) => [...landingCmsKeys.all, "hero", locale] as const,
  services: (locale: AppLocale) =>
    [...landingCmsKeys.all, "services", locale] as const,
  articles: (locale: AppLocale) =>
    [...landingCmsKeys.all, "articles", locale] as const,
  clients: (locale: AppLocale) =>
    [...landingCmsKeys.all, "clients", locale] as const,
  methodology: (locale: AppLocale) =>
    [...landingCmsKeys.all, "methodology", locale] as const,
};

export const settingsKeys = {
  all: ["app-settings"] as const,
};

export const favoritesKeys = {
  all: ["favorites"] as const,
};