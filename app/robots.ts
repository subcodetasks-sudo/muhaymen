import type { MetadataRoute } from "next";
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

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: new URL(siteUrl).host,
  };
}
