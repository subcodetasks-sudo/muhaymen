import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPublicSiteUrl } from "@/lib/site-url";
import { getAppSettings } from "@/lib/settings-server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteUrl = getPublicSiteUrl();

  try {
    const settings = await getAppSettings();

    if (settings.maintenance_mode) {
      return {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      };
    }
  } catch {
    // Fall back to public crawling rules when settings are unavailable.
  }

  // Favorites is client-only personal state; keep it out of search indexes.
  // Default locale has no prefix (`as-needed`); non-default locales do.
  const favoritesDisallows = routing.locales.map((locale) =>
    locale === routing.defaultLocale ? "/favorites" : `/${locale}/favorites`,
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", ...favoritesDisallows],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
