"use client";

import { useTranslations } from "next-intl";
import {
  PROCESS_STEP_CONFIG,
  PROCESS_STEP_KEYS,
} from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const t = useTranslations("LandingPage.process");

  return (
    <section
      className="overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(135deg, #fffbeb 0%, #fef3c7 40%, #fde68a22 100%)",
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-20 text-center">
            <span className="mb-5 inline-block rounded-full bg-primary/15 px-5 py-2 text-sm font-black tracking-wider text-primary">
              {t("badge")}
            </span>
            <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="relative mb-0 hidden items-end gap-3 md:flex">
          <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-linear-to-l from-primary/80 via-primary/40 to-primary/10" />

          {PROCESS_STEP_KEYS.map((key, index) => {
            const config = PROCESS_STEP_CONFIG[key];
            const isCrown = config.crown ?? false;

            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-up"
                delay={index * 0.1}
                duration={0.55}
                threshold={0.15}
                className={cn(
                  "group relative min-w-0 flex-1 cursor-default",
                  config.height,
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 flex flex-col justify-end rounded-t-2xl border-2 p-5 transition-all duration-300",
                    isCrown
                      ? "border-primary bg-primary shadow-2xl shadow-primary/40"
                      : "border-primary/20 bg-white group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/10 dark:bg-card",
                  )}
                >
                  {isCrown && (
                    <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-4 py-1.5 text-xs font-black text-background shadow-lg">
                      {t("summit")}
                    </div>
                  )}

                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-5 top-5 select-none text-7xl font-black leading-none",
                      isCrown ? "text-white/20" : "text-primary/8",
                    )}
                  >
                    {key}
                  </div>

                  <div className="relative z-10 min-w-0">
                    <div
                      className={cn(
                        "mb-2 inline-block rounded-full px-2 py-1 text-xs font-bold",
                        isCrown
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary",
                      )}
                    >
                      {t("stepLabel", { num: key })}
                    </div>
                    <h3
                      className={cn(
                        "mb-2 wrap-break-word text-base font-black leading-snug",
                        isCrown ? "text-white" : "text-foreground",
                      )}
                    >
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p
                      className={cn(
                        "wrap-break-word text-xs leading-relaxed",
                        isCrown ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {t(`steps.${key}.description`)}
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>

        <div className="space-y-4 md:hidden">
          {PROCESS_STEP_KEYS.map((key, index) => {
            const config = PROCESS_STEP_CONFIG[key];
            const isCrown = config.crown ?? false;

            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-left"
                delay={index * 0.08}
                duration={0.45}
                threshold={0.15}
              >
                <div
                  className={cn(
                    "flex items-start gap-4 rounded-2xl border-2 p-6",
                    isCrown
                      ? "border-primary bg-primary"
                      : "border-primary/20 bg-white dark:bg-card",
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0 text-3xl font-black leading-none",
                      isCrown ? "text-white/30" : "text-primary/20",
                    )}
                  >
                    {key}
                  </div>
                  <div>
                    <h3
                      className={cn(
                        "mb-1 text-lg font-black",
                        isCrown ? "text-white" : "text-foreground",
                      )}
                    >
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p
                      className={cn(
                        "text-sm",
                        isCrown ? "text-white/80" : "text-muted-foreground",
                      )}
                    >
                      {t(`steps.${key}.mobileDescription`)}
                    </p>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
