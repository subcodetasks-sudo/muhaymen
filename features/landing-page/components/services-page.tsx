import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import { getServicesContent, getServicesSeoText } from "../lib/cms";
import type { AppLocale } from "../types";
import { Footer } from "./footer";

type ServicesPageProps = {
  locale: AppLocale;
};

const fallbackIcons = ["01", "02", "03", "04", "05", "06"];

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function ServicesPage({ locale }: ServicesPageProps) {
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const [content, t] = await Promise.all([
    getServicesContent(locale),
    getTranslations("ServicesPage"),
  ]);

  const { title, description } = getServicesSeoText(content);
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://muhaymin.com").replace(
    /\/$/,
    "",
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: title,
        description,
        inLanguage: locale,
        url: `${siteUrl}/${locale}/services`,
      },
      {
        "@type": "ItemList",
        name: stripHtml(content.title),
        itemListElement: content.services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: stripHtml(service.title),
            description: stripHtml(service.description),
          },
        })),
      },
    ],
  };

  const firstService = content.services[0];
  const remainingServices = content.services.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
        <main className="px-6 pb-24 pt-28">
          <div className="container mx-auto max-w-6xl">
            <Button
              variant="ghost"
              className="mb-8 rounded-full font-bold"
              asChild
            >
              <Link href="/">
                <BackArrow className="me-2" size={16} />
                {t("backToHome")}
              </Link>
            </Button>

            <section className="relative isolate overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-10 shadow-sm sm:px-8 lg:px-10 lg:py-12">
              <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-r from-primary/15 via-primary/5 to-transparent blur-3xl" />
              <div className="absolute bottom-0 -inset-e-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                    <Sparkles size={16} />
                    {t("eyebrow")}
                  </div>
                  <h1
                    className="max-w-3xl text-4xl font-black leading-tight text-foreground md:text-5xl lg:text-6xl [&_p]:contents"
                    dangerouslySetInnerHTML={{ __html: content.title }}
                  />
                  <div
                    className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: content.description }}
                  />

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button size="lg" className="rounded-full font-bold" asChild>
                      <Link href={{ pathname: "/", hash: "contact" }}>
                        {t("startProject")}
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full font-bold"
                      asChild
                    >
                      <Link href="/works">{t("seeWork")}</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-primary/15 bg-background/80 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("servicesCountLabel")}
                    </p>
                    <p className="mt-2 text-3xl font-black text-primary">
                      {content.services.length.toString().padStart(2, "0")}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border bg-background/80 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("deliveryLabel")}
                    </p>
                    <p className="mt-2 text-3xl font-black text-foreground">
                      {t("deliveryValue")}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border bg-background/80 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("focusLabel")}
                    </p>
                    <p className="mt-2 text-lg font-black text-foreground">
                      {t("focusValue")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {firstService ? (
              <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
                <article className="overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/10 via-card to-card">
                  <div className="grid h-full gap-8 p-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:p-10">
                    <div className="flex h-18 w-18 items-center justify-center rounded-[1.5rem] border border-primary/15 bg-background text-2xl font-black text-primary shadow-sm">
                      {fallbackIcons[0]}
                    </div>

                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm font-bold text-primary">
                        <CheckCircle2 size={16} />
                        {t("featuredLabel")}
                      </div>
                      <h2
                        className="text-3xl font-black leading-tight text-card-foreground md:text-4xl [&_p]:contents"
                        dangerouslySetInnerHTML={{ __html: firstService.title }}
                      />
                      <div
                        className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                        dangerouslySetInnerHTML={{ __html: firstService.description }}
                      />
                    </div>
                  </div>
                </article>

                <div className="grid gap-6">
                  {content.services.slice(0, 3).map((service, index) => (
                    <div
                      key={`${service.title}-${index}`}
                      className="flex items-start gap-4 rounded-[1.5rem] border border-border bg-card p-6 shadow-sm"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-sm font-black text-primary">
                        {service.image?.url ? (
                          <Image
                            src={service.image.url}
                            alt={service.image.alt || stripHtml(service.title)}
                            width={28}
                            height={28}
                            unoptimized
                            className="h-7 w-7 object-contain"
                            draggable={false}
                          />
                        ) : (
                          fallbackIcons[index]
                        )}
                      </div>
                      <div>
                        <h3
                          className="text-lg font-black text-card-foreground [&_p]:contents"
                          dangerouslySetInnerHTML={{ __html: service.title }}
                        />
                        <div
                          className="mt-2 text-sm leading-relaxed text-muted-foreground [&_p]:mb-0"
                          dangerouslySetInnerHTML={{ __html: service.description }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <section className="mt-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary/80">
                    {t("capabilitiesLabel")}
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-foreground md:text-3xl">
                    {t("capabilitiesTitle")}
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {remainingServices.map((service, index) => (
                  <article
                    key={`${service.title}-${index + 1}`}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent opacity-70" />
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-sm font-black text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        {service.image?.url ? (
                          <Image
                            src={service.image.url}
                            alt={service.image.alt || stripHtml(service.title)}
                            width={28}
                            height={28}
                            unoptimized
                            className="h-7 w-7 object-contain"
                            draggable={false}
                          />
                        ) : (
                          fallbackIcons[(index + 1) % fallbackIcons.length]
                        )}
                      </div>
                      <ArrowUpRight className="text-primary/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <h3
                      className="text-2xl font-black leading-snug text-card-foreground [&_p]:contents"
                      dangerouslySetInnerHTML={{ __html: service.title }}
                    />
                    <div
                      className="mt-3 text-base leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-[2rem] border border-border bg-muted/30 p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary/80">
                    {t("ctaLabel")}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-foreground md:text-4xl">
                    {t("ctaTitle")}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {t("ctaDescription")}
                  </p>
                </div>

                <Button size="lg" className="rounded-full font-bold" asChild>
                  <Link href={{ pathname: "/", hash: "contact" }}>
                    {t("ctaAction")}
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
