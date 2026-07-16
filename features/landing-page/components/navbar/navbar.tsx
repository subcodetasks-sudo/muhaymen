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
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAppSettings } from "@/hooks/use-app-settings";
import { getDirection } from "@/i18n/locale";
import { Link, usePathname } from "@/i18n/navigation";
import { getAppName } from "@/lib/settings";
import { useServicesContent } from "../../hooks/use-services-content";
import { getServiceSlug } from "../../lib/service-cms";
import type { AppLocale } from "../../types";
import { LanguageToggle } from "./language-toggle";
import { LOGO_PATH, NAV_SECTION_IDS } from "../../lib/constants";
import { scrollToSection } from "../../lib/scroll-to-section";

const NAV_HEIGHT_EXPANDED = 80;
const NAV_HEIGHT_COLLAPSED = 56;
const LOGO_HEIGHT_EXPANDED = 48;
const LOGO_HEIGHT_COLLAPSED = 34;
const SCROLL_RANGE = 120;

const getMobileMenuVariants = (isRtl: boolean) =>
  ({
    closed: {
      opacity: 0,
      x: isRtl ? "100%" : "-100%",
      transition: {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.24,
        ease: [0.32, 0.72, 0, 1],
      },
    },
  }) as const;

const getMobileMenuItemVariants = (isRtl: boolean) =>
  ({
    closed: {
      opacity: 0,
      x: isRtl ? -10 : 10,
      transition: { duration: 0.14 },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.18, ease: [0.32, 0.72, 0, 1] },
    },
  }) as const;

const mobileMenuContentVariants = {
  closed: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.06,
    },
  },
} as const;

export function Navbar() {
  const t = useTranslations("LandingPage.nav");
  const locale = useLocale() as AppLocale;
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const { data: settings } = useAppSettings();
  const { data: servicesContent } = useServicesContent(locale);
  const logoAlt = settings
    ? `${getAppName(settings, locale)} Logo`
    : "Muhaymin Logo";
  const logoSrc = settings?.logo || LOGO_PATH;
  const isRemoteLogo = logoSrc.startsWith("http");
  const pathname = usePathname();
  const isHome = pathname === "/";
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
  const mobileMenuVariants = getMobileMenuVariants(isRtl);
  const mobileMenuItemVariants = getMobileMenuItemVariants(isRtl);

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  const navLinkClassName =
    "cursor-pointer whitespace-nowrap text-sm font-bold transition-colors hover:text-primary";
  const mobileNavLinkClassName =
    `block w-full cursor-pointer border-b border-border/50 py-3 text-lg font-semibold transition-colors hover:text-primary ${
      isRtl ? "text-right" : "text-left"
    }`;

  const renderServicesDesktopItem = () => {
    const label = t("services");

    if (!servicesContent?.services.length) {
      return (
        <Link key="services" href="/services" className={navLinkClassName}>
          {label}
        </Link>
      );
    }

    return (
      <NavigationMenu key="services" viewport={false} className="z-50 flex-none">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="h-auto bg-transparent px-0 py-0 text-sm font-bold hover:bg-transparent focus:bg-transparent data-open:bg-transparent data-open:hover:bg-transparent data-[state=open]:text-primary">
              {label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="min-w-72 p-2">
              <div className="grid gap-1">
                <NavigationMenuLink asChild>
                  <Link
                    href="/services"
                    className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    {label}
                  </Link>
                </NavigationMenuLink>
                {servicesContent.services.map((service) => {
                  const slug = getServiceSlug(service.title);
                  return (
                    <NavigationMenuLink key={slug} asChild>
                      <Link
                        href={`/services/${slug}`}
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        <span
                          className="[&_p]:contents"
                          dangerouslySetInnerHTML={{ __html: service.title }}
                        />
                      </Link>
                    </NavigationMenuLink>
                  );
                })}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  };

  const renderNavItem = (id: string, className: string, mobile = false) => {
    const label = t(id);
    const href =
      id === "portfolio"
        ? "/works"
        : id === "about"
          ? "/about-us"
        : id === "services"
          ? "/services"
          : (`/#${id}` as const);

    if (isHome) {
      if (id === "services" && !mobile) {
        return renderServicesDesktopItem();
      }

      if (id === "portfolio" || id === "services" || id === "about") {
        const Component = mobile ? motion.div : "div";

        return (
          <Component
            key={id}
            {...(mobile ? { variants: mobileMenuItemVariants } : {})}
          >
            <Link href={href} onClick={mobile ? closeMenu : undefined} className={className}>
              {label}
            </Link>
          </Component>
        );
      }

      const Component = mobile ? motion.button : "button";
      return (
        <Component
          key={id}
          type="button"
          {...(mobile ? { variants: mobileMenuItemVariants } : {})}
          onClick={() => handleNavigate(id)}
          className={className}
        >
          {label}
        </Component>
      );
    }

    if (mobile) {
      return (
        <motion.div key={id} variants={mobileMenuItemVariants}>
          <Link href={href} onClick={closeMenu} className={className}>
            {label}
          </Link>
        </motion.div>
      );
    }

    if (id === "services") {
      return renderServicesDesktopItem();
    }

    return (
      <Link key={id} href={href} className={className}>
        {label}
      </Link>
    );
  };

  const renderContactCta = (className: string, mobile = false) => {
    const label = t("contactCta");
    const href = "/#contact" as const;

    if (isHome) {
      return (
        <Button onClick={() => handleNavigate("contact")} className={className}>
          {label}
        </Button>
      );
    }

    if (mobile) {
      return (
        <Button asChild className={className}>
          <Link href={href} onClick={closeMenu}>
            {label}
          </Link>
        </Button>
      );
    }

    return (
      <Button asChild className={className}>
        <Link href={href}>{label}</Link>
      </Button>
    );
  };

  return (
    <motion.nav
      style={{ height: navHeight, boxShadow }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white/80 backdrop-blur-md"
        style={{ opacity: bgOpacity }}
      />
      <motion.div
        style={{ height: navHeight, paddingInline: navPaddingX }}
        className="relative container mx-auto grid grid-cols-3 items-center"
      >
        {isHome ? (
          <button
            type="button"
            className="flex cursor-pointer items-center justify-start"
            onClick={() => handleNavigate("hero")}
          >
            <motion.div style={{ height: logoHeight }} className="relative w-auto">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={48}
                className="h-full w-auto"
                unoptimized={isRemoteLogo}
                priority
              />
            </motion.div>
          </button>
        ) : (
          <Link
            href="/"
            className="flex cursor-pointer items-center justify-start"
            onClick={closeMenu}
          >
            <motion.div style={{ height: logoHeight }} className="relative w-auto">
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={120}
                height={48}
                className="h-full w-auto"
                unoptimized={isRemoteLogo}
                priority
              />
            </motion.div>
          </Link>
        )}

        <div className="hidden items-center justify-center gap-7 lg:flex">
          {NAV_SECTION_IDS.map((id) => renderNavItem(id, navLinkClassName))}
        </div>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <LanguageToggle />
          {renderContactCta(
            "rounded-full bg-primary px-6 font-bold text-primary-foreground hover:bg-primary/90",
          )}
        </div>

        <div className="col-span-2 flex items-center justify-end lg:hidden">
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
          <>
            <motion.button
              key="mobile-menu-backdrop"
              type="button"
              aria-label={t("closeMenu")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={closeMenu}
            />
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              dir={direction}
              className={`fixed inset-y-0 z-50 flex w-[min(85vw,22rem)] flex-col overflow-hidden bg-background shadow-2xl lg:hidden ${
                isRtl
                  ? "right-0 border-l border-border/50"
                  : "left-0 border-r border-border/50"
              }`}
            >
              <div
                className="flex items-center justify-between border-b border-border/50 px-5"
                style={{ minHeight: NAV_HEIGHT_COLLAPSED }}
              >
                <div
                  className={`flex-1 text-sm font-semibold text-muted-foreground ${
                    isRtl ? "text-right" : "text-left"
                  }`}
                >
                  {t("openMenu")}
                </div>
                <button
                  type="button"
                  className="inline-flex cursor-pointer text-foreground"
                  onClick={closeMenu}
                  aria-label={t("closeMenu")}
                >
                  <X size={24} />
                </button>
              </div>
              <motion.div
                variants={mobileMenuContentVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-1 flex-col gap-5 overflow-y-auto p-5"
              >
                {NAV_SECTION_IDS.map((id) =>
                  renderNavItem(id, mobileNavLinkClassName, true),
                )}
                <motion.div variants={mobileMenuItemVariants} className="pt-2">
                  {renderContactCta(
                    "w-full rounded-full bg-primary py-3 text-base font-bold text-primary-foreground hover:bg-primary/90",
                    true,
                  )}
                </motion.div>
                <motion.div
                  variants={mobileMenuItemVariants}
                  className={`flex ${isRtl ? "justify-start" : "justify-end"}`}
                >
                  <LanguageToggle />
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
