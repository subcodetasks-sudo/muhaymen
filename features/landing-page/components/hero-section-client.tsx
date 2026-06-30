"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useHeroContent } from "../hooks/use-hero-content";
import { scrollToSection } from "../lib/scroll-to-section";
import type { AppLocale, TextDirection } from "../types";

type HeroSectionClientProps = {
  locale: AppLocale;
  direction: TextDirection;
};

export function HeroSectionClient({ locale, direction }: HeroSectionClientProps) {
  const t = useTranslations("LandingPage.hero");
  const { data: content } = useHeroContent(locale);
  const isRtl = direction === "rtl";
  const CtaArrow = isRtl ? ArrowRight : ArrowLeft;
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgTopY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bgTopScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const bgBottomY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgBottomScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

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

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 pt-20"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          style={{ y: bgTopY, scale: bgTopScale }}
          className="absolute -inset-e-40 -top-40 h-96 w-96 rounded-full bg-primary blur-[100px]"
        />
        <motion.div
          style={{ y: bgBottomY, scale: bgBottomScale }}
          className="absolute -inset-s-20 bottom-20 h-72 w-72 rounded-full bg-primary blur-[100px]"
        />
      </div>

      <motion.div
        style={{ opacity, scale, rotateX, transformStyle: "preserve-3d" }}
        className="z-10 mx-auto flex max-w-5xl flex-col items-center text-center"
      >
        <motion.div
          style={{ y: yBadge }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
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
            className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl [&_p]:contents [&_strong]:text-primary"
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
            className="mb-12 max-w-3xl text-lg font-medium text-muted-foreground md:text-2xl [&_p]:contents"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
        </motion.div>

        <motion.div
          style={{ y: yCTA }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row"
        >
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-primary px-8 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 sm:w-auto"
            onClick={() => scrollToSection("contact")}
          >
            {t("primaryCta")}
            <CtaArrow className="ms-2" size={20} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 w-full rounded-full border-2 px-8 text-lg font-bold sm:w-auto"
            onClick={() => scrollToSection("services")}
          >
            {t("secondaryCta")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
