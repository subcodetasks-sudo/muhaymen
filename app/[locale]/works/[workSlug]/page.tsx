import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { WorkDetailPage } from "@/features/landing-page/components/work-detail-page";
import {
  buildWorkJsonLd,
  getWorkBySlug,
  getWorkSeoText,
} from "@/features/landing-page/lib/work-cms";
import type { AppLocale } from "@/features/landing-page/types";
import { ApiError } from "@/lib/api";

type PageProps = {
  params: Promise<{ locale: string; workSlug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, workSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(workSlug);

  try {
    const work = await getWorkBySlug(appLocale, slug);
    const { title, description } = getWorkSeoText(work);

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        locale: appLocale === "ar" ? "ar_SA" : "en_US",
        type: "article",
        ...(work.image.url ? { images: [{ url: work.image.url }] } : {}),
      },
      twitter: {
        card: work.image.url ? "summary_large_image" : "summary",
        title,
        description,
        ...(work.image.url ? { images: [work.image.url] } : {}),
      },
    };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { title: "Not Found" };
    }

    const t = await getTranslations("WorkPage");

    return {
      title: t("fallbackTitle"),
      description: t("fallbackDescription"),
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { locale, workSlug } = await params;
  const appLocale = locale as AppLocale;
  const slug = decodeURIComponent(workSlug);
  const t = await getTranslations("WorkPage");

  let work;

  try {
    work = await getWorkBySlug(appLocale, slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  const jsonLd = buildWorkJsonLd(work, appLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkDetailPage
        locale={appLocale}
        work={work}
        homeLabel={t("homeLabel")}
        backLabel={t("backToPortfolio")}
        worksLabel={t("fallbackTitle")}
      />
    </>
  );
}
