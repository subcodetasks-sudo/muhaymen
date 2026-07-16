import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import {
  buildAboutJsonLd,
  getAboutContent,
  getAboutSeoText,
} from "../../lib/cms";
import type { AppLocale } from "../../types";
import { Footer } from "../layout/footer";

type AboutPageProps = {
  locale: AppLocale;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function AboutPage({ locale }: AboutPageProps) {
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const [content, t] = await Promise.all([
    getAboutContent(locale),
    getTranslations("AboutPage"),
  ]);

  const jsonLd = buildAboutJsonLd(content, locale);
  const { title, description } = getAboutSeoText(content);

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
              <div className="absolute -inset-y-10 -inset-e-16 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-end">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                    <Users size={16} />
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
                        {t("ctaPrimary")}
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full font-bold"
                      asChild
                    >
                      <Link href="/services">{t("ctaSecondary")}</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-primary/15 bg-background/80 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("valuesCountLabel")}
                    </p>
                    <p className="mt-2 text-3xl font-black text-primary">
                      {content.items.length.toString().padStart(2, "0")}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-border bg-background/80 p-5 backdrop-blur">
                    <p className="text-sm font-medium text-muted-foreground">
                      {t("approachLabel")}
                    </p>
                    <p className="mt-2 text-lg font-black text-foreground">
                      {t("approachValue")}
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

            <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
                <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-xl">
                  {content.image.url ? (
                    <Image
                      src={content.image.url}
                      alt={content.image.text || title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      draggable={false}
                      priority
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/15 via-background to-muted p-8 text-center">
                      <span
                        className="max-w-md text-lg font-bold text-primary [&_p]:contents"
                        dangerouslySetInnerHTML={{ __html: content.image.text || title }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                  <Sparkles size={16} />
                  {t("storyLabel")}
                </div>
                <h2 className="text-3xl font-black text-foreground md:text-4xl">
                  {t("storyTitle")}
                </h2>
                <div
                  className="mt-5 text-base leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
                <p className="mt-6 text-sm font-medium text-muted-foreground">
                  {description}
                </p>
              </div>
            </section>

            <section className="mt-10">
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary/80">
                  {t("principlesLabel")}
                </p>
                <h2 className="mt-2 text-2xl font-black text-foreground md:text-3xl">
                  {t("principlesTitle")}
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {content.items.map((item, index) => (
                  <article
                    key={`${stripHtml(item.text)}-${index}`}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary via-primary/60 to-transparent opacity-70" />
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <CheckCircle2 size={20} />
                      </div>
                      <span className="text-sm font-black text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className="text-xl font-black leading-relaxed text-card-foreground [&_p]:contents"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </article>
                ))}
              </div>
            </section>

            <section className="mt-10 rounded-[2rem] border border-border bg-muted/30 p-8 lg:p-10">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary/80">
                    {t("finalCtaLabel")}
                  </p>
                  <h2 className="mt-2 text-3xl font-black text-foreground md:text-4xl">
                    {t("finalCtaTitle")}
                  </h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                    {t("finalCtaDescription")}
                  </p>
                </div>

                <Button size="lg" className="rounded-full font-bold" asChild>
                  <Link href={{ pathname: "/", hash: "contact" }}>
                    {t("finalCtaAction")}
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
