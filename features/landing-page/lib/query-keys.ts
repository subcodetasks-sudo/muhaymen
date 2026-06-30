import type { AppLocale } from "../types";

export const landingCmsKeys = {
  all: ["landing-cms"] as const,
  hero: (locale: AppLocale) => [...landingCmsKeys.all, "hero", locale] as const,
};
