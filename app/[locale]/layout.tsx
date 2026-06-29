import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { LocaleDirectionSync } from "@/components/locale-direction-sync";
import { DirectionProvider } from "@/components/ui/direction";
import { Navbar } from "@/features/landing-page/components/navbar";
import { getDirection } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <DirectionProvider dir={direction} key={locale}>
        <LocaleDirectionSync />
        <Navbar />
        {children}
      </DirectionProvider>
    </NextIntlClientProvider>
  );
}
