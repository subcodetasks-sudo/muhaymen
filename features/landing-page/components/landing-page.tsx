import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getLocale } from "next-intl/server";
import { getDirection } from "@/i18n/locale";
import { getQueryClient } from "@/lib/get-query-client";
import {
  getAboutContent,
  getClientsContent,
  getHeroContent,
  getMethodologyContent,
  getServicesContent,
} from "../lib/cms";
import { landingCmsKeys } from "../lib/query-keys";
import { AboutSection } from "./about";
import { BlogSection } from "./articles";
import { ClientsSection } from "./clients";
import { ContactSection } from "./contact";
import { Footer } from "./layout";
import { HeroSection } from "./hero";
import { PortfolioSection } from "./portfolio";
import { ProcessSection } from "./process";
import { ServicesSection } from "./our-services";
import { StatsSection } from "./stats";
import { WhatsAppSection } from "./whatsapp";
import type { AppLocale } from "../types";

export async function LandingPage() {
  const locale = (await getLocale()) as AppLocale;
  const direction = getDirection(locale);
  const localeProps = { locale, direction };
  const queryClient = getQueryClient();

  const [aboutContent, clientsContent, methodologyContent] = await Promise.all([
    getAboutContent(locale),
    getClientsContent(locale),
    getMethodologyContent(locale),
    queryClient.prefetchQuery({
      queryKey: landingCmsKeys.hero(locale),
      queryFn: () => getHeroContent(locale),
    }),
    queryClient.prefetchQuery({
      queryKey: landingCmsKeys.services(locale),
      queryFn: () => getServicesContent(locale),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="landing-page min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
        <HeroSection {...localeProps} />
        <WhatsAppSection locale={locale} />
        <AboutSection {...localeProps} content={aboutContent} />
        <ServicesSection locale={locale} />
        <PortfolioSection {...localeProps} />
        <ClientsSection content={clientsContent} locale={locale} />
        <StatsSection />
        <ProcessSection content={methodologyContent} />
        <BlogSection {...localeProps} />
        <ContactSection />
        <Footer />
      </div>
    </HydrationBoundary>
  );
}
