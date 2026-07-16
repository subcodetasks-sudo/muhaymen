"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/react-bits/ui/button";
import { cn } from "@/lib/utils";
import { useHeroContent } from "../../hooks/use-hero-content";
import { scrollToSection } from "../../lib/scroll-to-section";
import type { AppLocale, TextDirection, HeroContent } from "../../types";
import { HeroMarquee } from "./hero-marquee";
import SideRays from "@/components/react-bits/SideRays";

const LANDING_PRIMARY = "#e9b10d";

type HeroSectionClientProps = {
  locale: AppLocale;
  direction: TextDirection;
  initialData?: HeroContent;
};

export function HeroSectionClient({ locale, direction, initialData }: HeroSectionClientProps) {
  const t = useTranslations("LandingPage.hero");
  const { data: content } = useHeroContent(locale, initialData);
  const isRtl = direction === "rtl";
  const CtaArrow = isRtl ? ArrowRight : ArrowLeft;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const yCTA = useTransform(scrollYProgress, [0, 1], [0, -130]);

  if (!content) {
    return (
      <section
        id="hero"
        className="relative flex min-h-dvh items-center justify-center px-6 pt-20"
      />
    );
  }

  const heroImages = (content.images ?? []).filter((image) => Boolean(image.url));
  const hasImages = heroImages.length > 0;

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-dvh items-center justify-center overflow-visible px-6 pt-20 pb-10"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute inset-0 z-0">
        <SideRays
          speed={1.5}
          rayColor1={LANDING_PRIMARY}
          rayColor2="#ffffff"
          intensity={1.5}
          spread={1.8}
          origin="top-right"
          tilt={10}
          saturation={1.2}
          blend={0.6}
          falloff={1.5}
          opacity={0.8}
        />
      </div>

      <motion.div
        style={{ opacity, scale, rotateX, transformStyle: "preserve-3d" }}
        className={cn(
          "z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:gap-12",
          hasImages && "lg:grid-cols-2",
        )}
      >
        <div
          className={cn(
            "flex flex-col",
            hasImages
              ? "items-center text-center lg:items-start lg:text-start"
              : "mx-auto max-w-3xl items-center text-center",
          )}
        >
          <motion.div
            style={{ y: yBadge }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
          >
            <Sparkles size={16} />
            <span
              className="[&_p]:inline"
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </motion.div>

          <motion.div
            style={{ y: yTitle }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="mb-5 max-w-[28ch] text-3xl font-black leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl [&_p]:contents [&_strong]:text-primary"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
          </motion.div>

          <motion.div
            style={{ y: ySubtitle }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="mb-10 max-w-2xl text-base font-medium text-muted-foreground md:text-lg [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </motion.div>

          <motion.div
            style={{ y: yCTA }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              className="h-12 w-full rounded-full bg-primary px-7 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 sm:w-auto"
              onClick={() => scrollToSection("contact")}
            >
              {t("primaryCta")}
              <CtaArrow className="ms-2" size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 w-full rounded-full border-2 px-7 text-base font-bold sm:w-auto"
              onClick={() => scrollToSection("services")}
            >
              {t("secondaryCta")}
            </Button>
          </motion.div>
        </div>

        {hasImages && (
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative w-full bg-transparent"
          >
            <HeroMarquee images={heroImages} direction={direction} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
