import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/react-bits/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import { getServicesContent, getServicesSeoText } from "../../lib/cms";
import { getServiceSlug } from "../../lib/service-cms";
import type { AppLocale } from "../../types";
import { Footer } from "../layout/footer";
import { ServiceCard } from "./service-card";

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
  const ForwardArrow = isRtl ? ArrowLeft : ArrowRight;
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
              <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-stretch">
                <div className="flex flex-col gap-6">
                  <article className="overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/10 via-card to-card">
                    <div className="grid gap-6 p-7 lg:grid-cols-[auto_minmax(0,1fr)] lg:gap-8 lg:p-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] border border-primary/15 bg-background text-xl font-black text-primary shadow-sm">
                        {fallbackIcons[0]}
                      </div>

                      <div>
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-sm font-bold text-primary">
                          <CheckCircle2 size={16} />
                          {t("featuredLabel")}
                        </div>
                        <h2
                          className="text-2xl font-black leading-tight text-card-foreground md:text-3xl [&_p]:contents"
                          dangerouslySetInnerHTML={{ __html: firstService.title }}
                        />
                        <div
                          className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base [&_p]:mb-3 [&_p:last-child]:mb-0"
                          dangerouslySetInnerHTML={{ __html: firstService.description }}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-5 rounded-full font-bold"
                          asChild
                        >
                          <Link href={`/services/${getServiceSlug(firstService.title)}`}>
                            {t("featuredExplore")}
                            <ForwardArrow className="ms-2" size={14} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </article>

                  <aside className="relative flex min-h-0 flex-1 flex-col justify-between overflow-hidden rounded-[2rem] border border-border bg-foreground p-7 text-background lg:p-8">
                    <div className="pointer-events-none absolute -inset-e-16 -top-16 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
                    <div className="pointer-events-none absolute -inset-s-10 -bottom-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />

                    <div className="relative">
                      <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">
                        {t("featuredAsideLabel")}
                      </p>
                      <h3 className="mt-3 text-2xl font-black leading-tight md:text-3xl">
                        {t("featuredAsideTitle")}
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-background/70 md:text-base">
                        {t("featuredAsideDescription")}
                      </p>
                    </div>

                    <div className="relative mt-8 flex flex-wrap gap-3">
                      <Button size="lg" className="rounded-full font-bold" asChild>
                        <Link href={{ pathname: "/", hash: "contact" }}>
                          {t("startProject")}
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-background/25 bg-transparent font-bold text-background hover:bg-background/10 hover:text-background"
                        asChild
                      >
                        <Link href="/works">{t("seeWork")}</Link>
                      </Button>
                    </div>
                  </aside>
                </div>

                <div className="grid gap-6">
                  {content.services.slice(0, 3).map((service, index) => (
                    <ServiceCard
                      key={`${service.title}-${index}`}
                      service={service}
                      index={index}
                      href={`/services/${getServiceSlug(service.title)}`}
                    />
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

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remainingServices.map((service, index) => (
                  <ServiceCard
                    key={`${service.title}-${index + 1}`}
                    service={service}
                    index={index + 1}
                    href={`/services/${getServiceSlug(service.title)}`}
                  />
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
