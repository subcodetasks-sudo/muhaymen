"use client";

import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "../lib/scroll-to-section";
import type { LocaleProps } from "../types";

export function HeroSection({ direction }: LocaleProps) {
  const t = useTranslations("LandingPage.hero");
  const isRtl = direction === "rtl";
  const CtaArrow = isRtl ? ArrowRight : ArrowLeft;
  const ref = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background parallax and scale
  const bgTopY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const bgTopScale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const bgBottomY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgBottomScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  // Main container 3D perspective folding & fading
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 12]);

  // Staggered parallax for individual elements inside the container (moving upwards)
  const yBadge = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, -95]);
  const yCTA = useTransform(scrollYProgress, [0, 1], [0, -130]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-20"
      style={{ perspective: "1200px" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <motion.div 
          style={{ y: bgTopY, scale: bgTopScale }}
          className="absolute -end-40 -top-40 h-96 w-96 rounded-full bg-primary blur-[100px]" 
        />
        <motion.div 
          style={{ y: bgBottomY, scale: bgBottomScale }}
          className="absolute -start-20 bottom-20 h-72 w-72 rounded-full bg-primary blur-[100px]" 
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
          <span>{t("badge")}</span>
        </motion.div>

        <motion.h1
          style={{ y: yTitle }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-black leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          {t("titlePrefix")}
          <span className="relative inline-block text-primary">
            {t("titleHighlight")}
            <svg
              className="absolute -bottom-2 start-0 h-3 w-full text-primary/30"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </span>
          {t("titleSuffix")}
          <br />
          {t("titleLine2")}
        </motion.h1>

        <motion.p
          style={{ y: ySubtitle }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 max-w-3xl text-lg font-medium text-muted-foreground md:text-2xl"
        >
          {t("subtitle")}
        </motion.p>

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
