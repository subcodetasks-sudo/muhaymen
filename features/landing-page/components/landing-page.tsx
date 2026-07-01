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
import { AboutSection } from "./about-section";
import { BlogSection } from "./blog-section";
import { ClientsSection } from "./clients-section";
import { ContactSection } from "./contact-section";
import { CustomCursor } from "./custom-cursor";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { PortfolioSection } from "./portfolio-section";
import { ProcessSection } from "./process-section";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { WhatsAppSection } from "./whatsapp-section";
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
        <CustomCursor />
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

