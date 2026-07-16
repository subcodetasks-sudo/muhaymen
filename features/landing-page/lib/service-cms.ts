import { getServicesContent } from "./cms";
import type { AppLocale, CmsServiceItem } from "../types";

export type ServiceDetail = CmsServiceItem & {
  slug: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getServiceSlug(title: string) {
  return stripHtml(title)
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServiceSeoText(service: CmsServiceItem) {
  const metaTitle = stripHtml(service.meta_title);
  const metaDescription = stripHtml(service.meta_description);

  return {
    title: metaTitle || stripHtml(service.title),
    description: metaDescription || stripHtml(service.description),
  };
}

export async function getServiceBySlug(locale: AppLocale, slug: string) {
  const content = await getServicesContent(locale);
  const index = content.services.findIndex(
    (item) => getServiceSlug(item.title) === slug,
  );

  if (index < 0) {
    return null;
  }

  const service = content.services[index];

  return {
    service: {
      ...service,
      slug,
    },
    index,
  };
}

export function buildServiceJsonLd(
  service: ServiceDetail,
  locale: AppLocale,
  servicesLabel: string,
) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com").replace(
    /\/$/,
    "",
  );
  const pageUrl = `${siteUrl}/${locale}/services/${service.slug}`;
  const servicesUrl = `${siteUrl}/${locale}/services`;
  const { title, description } = getServiceSeoText(service);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}/#service`,
        name: title,
        description,
        url: pageUrl,
        inLanguage: locale,
        ...(service.image?.url ? { image: service.image.url } : {}),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: locale === "ar" ? "الرئيسية" : "Home",
            item: `${siteUrl}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: servicesLabel,
            item: servicesUrl,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
