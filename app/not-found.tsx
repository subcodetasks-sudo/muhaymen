"use client";

import Error from "next/error";
import { fontClassName } from "@/lib/fonts";
import { routing } from "@/i18n/routing";
import { getDirection } from "@/i18n/locale";

export default function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction} className={fontClassName}>
      <body className="flex min-h-dvh flex-col">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
