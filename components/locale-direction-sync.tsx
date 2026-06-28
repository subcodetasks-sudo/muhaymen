"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";
import { getDirection } from "@/i18n/locale";

export function LocaleDirectionSync() {
  const locale = useLocale();

  useEffect(() => {
    const direction = getDirection(locale);
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
