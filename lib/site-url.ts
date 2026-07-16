import type { AppLocale } from "@/features/landing-page/types";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function getPublicSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com").replace(
    /\/$/,
    "",
  );
}

export type LocalizedHref =
  | "/"
  | "/about-us"
  | "/articles"
  | "/services"
  | "/works"
  | {
      pathname: "/articles/[articleSlug]";
      params: { articleSlug: string };
    }
  | {
      pathname: "/services/[serviceSlug]";
      params: { serviceSlug: string };
    }
  | {
      pathname: "/works/[workSlug]";
      params: { workSlug: string };
    };

export function getAbsoluteLocalizedUrl(
  locale: AppLocale,
  href: LocalizedHref,
): string {
  const pathname = getPathname({ locale, href });
  return `${getPublicSiteUrl()}${pathname}`;
}

export function getLanguageAlternates(
  href: LocalizedHref,
): Record<string, string> {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      getAbsoluteLocalizedUrl(locale as AppLocale, href),
    ]),
  );

  return {
    ...languages,
    "x-default": getAbsoluteLocalizedUrl(
      routing.defaultLocale as AppLocale,
      href,
    ),
  };
}
