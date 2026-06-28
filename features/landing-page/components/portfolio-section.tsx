"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  PORTFOLIO_FILTER_BY_KEY,
  PORTFOLIO_FILTER_KEYS,
  PORTFOLIO_IMAGE_BY_KEY,
  PORTFOLIO_KEYS,
} from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { cn } from "@/lib/utils";
import type { LocaleProps } from "../types";

type PortfolioFilterKey = (typeof PORTFOLIO_FILTER_KEYS)[number];

export function PortfolioSection(_props: LocaleProps) {
  const t = useTranslations("LandingPage.portfolio");
  const [activeFilter, setActiveFilter] = useState<PortfolioFilterKey>("all");

  const filteredKeys =
    activeFilter === "all"
      ? PORTFOLIO_KEYS
      : PORTFOLIO_KEYS.filter(
          (key) => PORTFOLIO_FILTER_BY_KEY[key] === activeFilter,
        );

  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <ScrollAnimationWrapper type="fade-up" delay={0.1} threshold={0.2}>
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {PORTFOLIO_FILTER_KEYS.map((filterKey) => (
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
                {t(`filters.${filterKey}`)}
              </button>
            ))}
          </div>
        </ScrollAnimationWrapper>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredKeys.map((key, index) => (
            <ScrollAnimationWrapper
              key={key}
              type="blur-fade"
              delay={index * 0.08}
              threshold={0.1}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={PORTFOLIO_IMAGE_BY_KEY[key]}
                    alt={t(`items.${key}.title`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    {t(`items.${key}.category`)}
                  </span>
                  <h3 className="mb-3 text-xl font-black leading-snug text-card-foreground transition-colors group-hover:text-primary">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-auto text-sm leading-relaxed text-muted-foreground">
                    {t(`items.${key}.result`)}
                  </p>
                </div>
              </article>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
