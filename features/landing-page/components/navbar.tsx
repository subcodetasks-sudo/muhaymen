"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./language-toggle";
import { LOGO_PATH, NAV_SECTION_IDS } from "../lib/constants";
import { scrollToSection } from "../lib/scroll-to-section";

const NAV_HEIGHT_EXPANDED = 80;
const NAV_HEIGHT_COLLAPSED = 56;
const LOGO_HEIGHT_EXPANDED = 48;
const LOGO_HEIGHT_COLLAPSED = 34;
const SCROLL_RANGE = 120;

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
} as const;

const mobileMenuItemVariants = {
  closed: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
} as const;

export function Navbar() {
  const t = useTranslations("LandingPage.nav");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, SCROLL_RANGE], [0, 1], {
    clamp: true,
  });
  const navHeight = useTransform(
    scrollProgress,
    [0, 1],
    [NAV_HEIGHT_EXPANDED, NAV_HEIGHT_COLLAPSED],
  );
  const logoHeight = useTransform(
    scrollProgress,
    [0, 1],
    [LOGO_HEIGHT_EXPANDED, LOGO_HEIGHT_COLLAPSED],
  );
  const navPaddingX = useTransform(scrollProgress, [0, 1], [24, 20]);
  const bgOpacity = useTransform(scrollProgress, [0, 1], [0, 1]);
  const shadowY = useTransform(scrollProgress, [0, 1], [0, 4]);
  const shadowBlur = useTransform(scrollProgress, [0, 1], [0, 12]);
  const shadowOpacity = useTransform(scrollProgress, [0, 1], [0, 0.1]);
  const boxShadow = useMotionTemplate`0 ${shadowY}px ${shadowBlur}px -2px rgb(0 0 0 / ${shadowOpacity})`;

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{ height: navHeight, boxShadow }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white"
        style={{ opacity: bgOpacity }}
      />
      <motion.div
        style={{ height: navHeight, paddingInline: navPaddingX }}
        className="relative container mx-auto grid grid-cols-3 items-center"
      >
        <button
          type="button"
          className="flex cursor-pointer items-center justify-start"
          onClick={() => handleNavigate("hero")}
        >
          <motion.div style={{ height: logoHeight }} className="relative w-auto">
            <Image
              src={LOGO_PATH}
              alt="Muhaymin Logo"
              width={120}
              height={48}
              className="h-full w-auto"
              priority
            />
          </motion.div>
        </button>

        <div className="hidden items-center justify-center gap-7 md:flex">
          {NAV_SECTION_IDS.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => handleNavigate(id)}
              className="cursor-pointer whitespace-nowrap text-sm font-bold transition-colors hover:text-primary"
            >
              {t(id)}
            </button>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-3 md:flex">
          <Button
            onClick={() => handleNavigate("contact")}
            className="rounded-full bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90"
          >
            {t("contactCta")}
          </Button>
        </div>

        <div className="col-span-2 flex items-center justify-end md:hidden">
          <button
            type="button"
            className="cursor-pointer text-foreground"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            style={{ top: navHeight }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="absolute inset-x-0 overflow-hidden border-b border-border/50 bg-background shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {NAV_SECTION_IDS.map((id) => (
                <motion.button
                  key={id}
                  type="button"
                  variants={mobileMenuItemVariants}
                  onClick={() => handleNavigate(id)}
                  className="cursor-pointer border-b border-border/50 py-2 text-end text-lg font-medium transition-colors hover:text-primary"
                >
                  {t(id)}
                </motion.button>
              ))}
              <motion.div
                variants={mobileMenuItemVariants}
                className="mt-2 flex items-center gap-3"
              >
                <LanguageToggle />
                <Button
                  onClick={() => handleNavigate("contact")}
                  className="flex-1 bg-primary font-bold text-primary-foreground hover:bg-primary/90"
                >
                  {t("contactCta")}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
