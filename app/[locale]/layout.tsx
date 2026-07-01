import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import Providers from "@/app/providers";
import { LocaleDirectionSync } from "@/components/locale-direction-sync";
import { DirectionProvider } from "@/components/ui/direction";
import { Navbar } from "@/features/landing-page/components/navbar";
import { getDirection } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { fontClassName } from "@/lib/fonts";
import { getQueryClient } from "@/lib/get-query-client";
import { settingsKeys } from "@/features/landing-page/lib/query-keys";
import { getAppSettings } from "@/lib/settings-server";

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
  const queryClient = getQueryClient();
  const settings = await getAppSettings();

  queryClient.setQueryData(settingsKeys.all, settings);

  return (
    <html lang={locale} dir={direction} className={fontClassName}>
      <body className="flex min-h-full flex-col">
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <DirectionProvider dir={direction} key={locale}>
                <LocaleDirectionSync />
                <Navbar />
                {children}
              </DirectionProvider>
            </NextIntlClientProvider>
          </HydrationBoundary>
        </Providers>
        <Toaster theme="light" position="top-center" richColors />
      </body>
    </html>
  );
}
