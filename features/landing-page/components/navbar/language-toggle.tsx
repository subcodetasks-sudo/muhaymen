"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/react-bits/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_ABBREVIATIONS: Record<string, string> = {
  en: "EN",
  ar: "عربي",
};

export function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LandingPage.nav");

  const otherLocale = routing.locales.find((l) => l !== locale) ?? "en";
  const abbreviation = LOCALE_ABBREVIATIONS[otherLocale] ?? otherLocale.toUpperCase();

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full border-border/60 px-3 font-bold"
      asChild
    >
      <Link
        href={pathname}
        locale={otherLocale}
        aria-label={
          otherLocale === "en" ? t("switchToEnglish") : t("switchToArabic")
        }
      >
        <Globe className="size-4" aria-hidden />
        {abbreviation}
      </Link>
    </Button>
  );
}
