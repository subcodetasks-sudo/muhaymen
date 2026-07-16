"use client";

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
} from "../../utils/portfolio-utils";
import type { AppLocale, WorksContent } from "../../types";
import { WorkCard } from "./work-card";

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
              <WorkCard work={work} />
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
