import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteHostname = siteUrl ? new URL(siteUrl).hostname : undefined;

const nextConfig: NextConfig = {
  cacheComponents: true,
  experimental: {
    rootParams: true,
  },
  images: siteHostname
    ? {
        remotePatterns: [
          {
            protocol: "https",
            hostname: siteHostname,
            pathname: "/**",
          },
        ],
      }
    : undefined,
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
