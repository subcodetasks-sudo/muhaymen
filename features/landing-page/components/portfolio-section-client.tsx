"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { Button } from "@/components/ui/button";
import { getDirection } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  getFeaturedWorks,
  getFilteredWorks,
  getWorksFilterOptions,
  type WorksFilter,
} from "../utils/portfolio-utils";
import type { AppLocale, WorksContent } from "../types";

type PortfolioSectionClientProps = {
  locale: AppLocale;
  content: WorksContent;
  featuredLimit?: number;
};

export function PortfolioSectionClient({
  locale,
  content,
  featuredLimit,
}: PortfolioSectionClientProps) {
  const t = useTranslations("LandingPage.portfolio");
  const isFeaturedMode = featuredLimit !== undefined;
  const filterOptions = useMemo(
    () => getWorksFilterOptions(content),
    [content],
  );
  const [activeFilter, setActiveFilter] = useState<WorksFilter>("all");
  const isRtl = getDirection(locale) === "rtl";
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight;

  const filteredWorks = useMemo(() => {
    if (isFeaturedMode) {
      return getFeaturedWorks(content, featuredLimit);
    }

    return getFilteredWorks(content, activeFilter);
  }, [activeFilter, content, featuredLimit, isFeaturedMode]);

  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
            <div>
              <h2
                className="mb-4 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              <div
                className="mx-auto max-w-2xl text-lg text-muted-foreground md:mx-0 [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.description }}
              />
            </div>
            <Button
              variant="outline"
              className="shrink-0 rounded-full font-bold"
              asChild
            >
              <Link href="/works">
                {t("cta")}
                <CtaArrow className="ms-2" size={16} />
              </Link>
            </Button>
          </div>
        </ScrollAnimationWrapper>

        {!isFeaturedMode && filterOptions.length > 1 ? (
          <ScrollAnimationWrapper type="fade-up" delay={0.1} threshold={0.2}>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {filterOptions.map((filterKey) => (
                <button
                  key={filterKey}
                  type="button"
                  onClick={() => setActiveFilter(filterKey)}
                  className={cn(
                    "rounded-full px-5 py-2.5 text-sm font-bold transition-all",
                    activeFilter === filterKey
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                  )}
                >
                  {filterKey === "all" ? t("filters.all") : filterKey}
                </button>
              ))}
            </div>
          </ScrollAnimationWrapper>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorks.map((work, index) => (
            <ScrollAnimationWrapper
              key={work.slug}
              type="blur-fade"
              delay={index * 0.08}
              threshold={0.1}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <Link
                  href={`/works/${work.slug}`}
                  className="flex h-full flex-col"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    {work.image.url ? (
                    <Image
                      src={work.image.url}
                      alt={work.image.text || work.title}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      draggable={false}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-muted p-6 text-center">
                      <span className="text-lg font-black text-primary">
                        {work.image.text}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {work.categoryTitle}
                  </span>
                  <h3
                    className="mb-3 text-xl font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
                    dangerouslySetInnerHTML={{ __html: work.title }}
                  />
                  <div
                    className="mt-auto text-sm leading-relaxed text-muted-foreground [&_p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: work.description }}
                  />
                </div>
                </Link>
              </article>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
