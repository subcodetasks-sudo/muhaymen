"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import {
  PROCESS_STEP_CONFIG,
  PROCESS_STEP_KEYS,
} from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { cn } from "@/lib/utils";

const STEP_COUNT = PROCESS_STEP_KEYS.length;
const DESKTOP_SCROLL_HEIGHT = `${STEP_COUNT * 100}vh`;
const SECTION_GRADIENT =
  "linear-gradient(135deg, #fffbeb 0%, #fef3c7 40%, #fde68a22 100%)";

function getStepVisibilityRange(index: number, stepCount: number) {
  const segment = 1 / stepCount;
  const blend = 0.18;
  const start = index * segment;
  const end = (index + 1) * segment;

  if (index === 0) {
    return {
      input: [0, end - segment * blend, end],
      output: [1, 1, 0] as [number, number, number],
    };
  }

  if (index === stepCount - 1) {
    return {
      input: [start, start + segment * blend, 1],
      output: [0, 1, 1] as [number, number, number],
    };
  }

  return {
    input: [start, start + segment * blend, end - segment * blend, end],
    output: [0, 1, 1, 0] as [number, number, number, number],
  };
}

function getBarGrowRange(index: number, stepCount: number) {
  const segment = 1 / stepCount;
  const start = index * segment;
  const growEnd = start + segment * 0.72;

  return {
    input: [start, growEnd, 1],
    output: [0, 1, 1] as [number, number, number],
  };
}

function ProcessStepSlide({
  stepKey,
  index,
  scrollYProgress,
  t,
}: {
  stepKey: (typeof PROCESS_STEP_KEYS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  t: ReturnType<typeof useTranslations>;
}) {
  const config = PROCESS_STEP_CONFIG[stepKey];
  const isCrown = config.crown ?? false;
  const { input, output } = getStepVisibilityRange(index, STEP_COUNT);

  const opacity = useTransform(scrollYProgress, input, output);
  const y = useTransform(scrollYProgress, input, output.map((v) => (1 - v) * 40));
  const scale = useTransform(scrollYProgress, input, output.map((v) => 0.94 + v * 0.06));

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-2"
      style={{ opacity, y, scale, pointerEvents: "none" }}
    >
      <div
        className={cn(
          "relative w-full max-w-3xl rounded-3xl border-2 p-8 shadow-xl md:p-10",
          isCrown
            ? "border-primary bg-primary shadow-primary/30"
            : "border-primary/20 bg-white dark:bg-card",
        )}
      >
        {isCrown && (
          <div className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-foreground px-4 py-1.5 text-xs font-black text-background shadow-lg">
            {t("summit")}
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-e-8 top-6 select-none text-8xl font-black leading-none",
            isCrown ? "text-white/15" : "text-primary/8",
          )}
        >
          {stepKey}
        </div>

        <div className="relative z-10 max-w-2xl">
          <div
            className={cn(
              "mb-4 inline-block rounded-full px-3 py-1 text-sm font-bold",
              isCrown ? "bg-white/20 text-white" : "bg-primary/10 text-primary",
            )}
          >
            {t("stepLabel", { num: stepKey })}
          </div>
          <h3
            className={cn(
              "mb-3 text-2xl font-black leading-tight md:text-3xl",
              isCrown ? "text-white" : "text-foreground",
            )}
          >
            {t(`steps.${stepKey}.title`)}
          </h3>
          <p
            className={cn(
              "text-base leading-relaxed md:text-lg",
              isCrown ? "text-white/85" : "text-muted-foreground",
            )}
          >
            {t(`steps.${stepKey}.description`)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ProcessStepDot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segment = 1 / STEP_COUNT;
  const start = index * segment;
  const end = (index + 1) * segment;
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.35]);
  const opacity = useTransform(scrollYProgress, [start, end], [0.35, 1]);

  return (
    <motion.div
      className="h-2.5 w-2.5 rounded-full bg-primary"
      style={{ scale, opacity }}
    />
  );
}

function ProcessBarColumn({
  stepKey,
  index,
  scrollYProgress,
  t,
}: {
  stepKey: (typeof PROCESS_STEP_KEYS)[number];
  index: number;
  scrollYProgress: MotionValue<number>;
  t: ReturnType<typeof useTranslations>;
}) {
  const config = PROCESS_STEP_CONFIG[stepKey];
  const isCrown = config.crown ?? false;
  const { input, output } = getBarGrowRange(index, STEP_COUNT);

  const scaleY = useTransform(scrollYProgress, input, output);

  return (
    <div
      className={cn(
        "group relative min-w-0 flex-1",
        config.height,
      )}
    >
      <motion.div
        className="h-full w-full"
        style={{ scaleY, transformOrigin: "bottom" }}
      >
        <div className="absolute inset-0 flex flex-col justify-end">
          <div
            className={cn(
              "absolute inset-0 flex flex-col justify-end rounded-t-2xl border-2 p-5 transition-colors duration-300",
              isCrown
                ? "border-primary bg-primary shadow-2xl shadow-primary/40"
                : "border-primary/20 bg-white group-hover:border-primary/60 dark:bg-card",
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
              {stepKey}
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
                {t("stepLabel", { num: stepKey })}
              </div>
              <h3
                className={cn(
                  "mb-2 wrap-break-word text-base font-black leading-snug",
                  isCrown ? "text-white" : "text-foreground",
                )}
              >
                {t(`steps.${stepKey}.title`)}
              </h3>
              <p
                className={cn(
                  "wrap-break-word text-xs leading-relaxed",
                  isCrown ? "text-white/80" : "text-muted-foreground",
                )}
              >
                {t(`steps.${stepKey}.description`)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ProcessDesktopSticky() {
  const t = useTranslations("LandingPage.process");
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressLineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative hidden md:block"
      style={{ height: DESKTOP_SCROLL_HEIGHT }}
    >
      <div
        className="sticky top-0 flex h-svh flex-col px-6"
        style={{ background: SECTION_GRADIENT }}
      >
        <div className="container mx-auto flex h-full max-w-6xl flex-col">
          <div className="shrink-0 pt-12 pb-6 text-center [@media(min-height:800px)]:pt-16 [@media(min-height:800px)]:pb-8">
            <span className="mb-4 inline-block rounded-full bg-primary/15 px-5 py-2 text-sm font-black tracking-wider text-primary">
              {t("badge")}
            </span>
            <h2 className="mb-3 text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>

          {/* Short viewport: card slides */}
          <div className="relative min-h-0 flex-1 [@media(min-height:800px)]:hidden">
            {PROCESS_STEP_KEYS.map((key, index) => (
              <ProcessStepSlide
                key={key}
                stepKey={key}
                index={index}
                scrollYProgress={scrollYProgress}
                t={t}
              />
            ))}
          </div>

          {/* Tall viewport: bar chart growing from axis */}
          <div className="hidden min-h-0 flex-1 flex-col justify-end pb-4 [@media(min-height:800px)]:flex">
            <div className="relative flex items-end gap-3">
              <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full bg-primary/10" />
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 origin-left rounded-full bg-linear-to-r from-primary/80 via-primary/60 to-primary"
                style={{ scaleX: progressLineScale }}
              />

              {PROCESS_STEP_KEYS.map((key, index) => (
                <ProcessBarColumn
                  key={key}
                  stepKey={key}
                  index={index}
                  scrollYProgress={scrollYProgress}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Short viewport footer */}
          <div className="shrink-0 pb-8 [@media(min-height:800px)]:hidden">
            <div className="relative mb-5 h-1 overflow-hidden rounded-full bg-primary/10">
              <motion.div
                className="absolute inset-0 origin-left rounded-full bg-linear-to-r from-primary/80 via-primary/60 to-primary"
                style={{ scaleX: progressLineScale }}
              />
            </div>
            <div className="flex items-center justify-center gap-3">
              {PROCESS_STEP_KEYS.map((key, index) => (
                <ProcessStepDot
                  key={key}
                  index={index}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessMobileList() {
  const t = useTranslations("LandingPage.process");

  return (
    <section
      className="px-6 py-24 md:hidden"
      style={{ background: SECTION_GRADIENT }}
    >
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-12 text-center">
            <span className="mb-5 inline-block rounded-full bg-primary/15 px-5 py-2 text-sm font-black tracking-wider text-primary">
              {t("badge")}
            </span>
            <h2 className="mb-4 text-4xl font-black text-foreground">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="space-y-4">
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

export function ProcessSection() {
  return (
    <>
      <ProcessDesktopSticky />
      <ProcessMobileList />
    </>
  );
}
