import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ServiceDetailsPage } from "@/features/landing-page/components/service-details-page";
import {
  buildServiceJsonLd,
  getServiceBySlug,
  getServiceSeoText,
} from "@/features/landing-page/lib/service-cms";
import type { AppLocale } from "@/features/landing-page/types";

type PageProps = {
  params: Promise<{ locale: string; serviceSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, serviceSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(serviceSlug);

  try {
    const result = await getServiceBySlug(appLocale, slug);

    if (!result) {
      return { title: "Not Found" };
    }

    const { title, description } = getServiceSeoText(result.service);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        locale: appLocale === "ar" ? "ar_SA" : "en_US",
        type: "article",
        ...(result.service.image?.url ? { images: [{ url: result.service.image.url }] } : {}),
      },
      twitter: {
        card: result.service.image?.url ? "summary_large_image" : "summary",
        title,
        description,
        ...(result.service.image?.url ? { images: [result.service.image.url] } : {}),
      },
    };
  } catch {
    const t = await getTranslations("ServicePage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, serviceSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(serviceSlug);
  const t = await getTranslations("ServicePage");

  const result = await getServiceBySlug(appLocale, slug);

  if (!result) {
    notFound();
  }

  const jsonLd = buildServiceJsonLd(result.service, appLocale, t("fallbackTitle"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailsPage
        locale={appLocale}
        service={result.service}
        homeLabel={t("homeLabel")}
        backLabel={t("backToServices")}
        servicesLabel={t("fallbackTitle")}
      />
    </>
  );
}
