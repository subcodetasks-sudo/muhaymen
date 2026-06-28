export const RTL_LOCALES = new Set(["ar", "fa", "he", "ur"]);

export function getDirection(locale: string): "rtl" | "ltr" {
  const baseLocale = locale.toLowerCase().split("-")[0];
  return RTL_LOCALES.has(baseLocale) ? "rtl" : "ltr";
}

export function isRtlLocale(locale: string) {
  return getDirection(locale) === "rtl";
}
