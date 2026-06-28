import { getLocale } from "next-intl/server";
import { getDirection } from "@/i18n/locale";
import { AboutSection } from "./about-section";
import { BlogSection } from "./blog-section";
import { ClientsSection } from "./clients-section";
import { ContactSection } from "./contact-section";
import { CustomCursor } from "./custom-cursor";
import { Footer } from "./footer";
import { HeroSection } from "./hero-section";
import { Navbar } from "./navbar";
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
  const fontClass =
    locale === "ar"
      ? "font-[family-name:var(--font-tajawal)]"
      : "font-[family-name:var(--font-geist-sans)]";

  return (
    <div
      className={`landing-page min-h-screen overflow-hidden bg-background ${fontClass} text-foreground selection:bg-primary selection:text-primary-foreground`}
    >
      <CustomCursor />
      <Navbar />

      <HeroSection {...localeProps} />
      <WhatsAppSection />
      <AboutSection {...localeProps} />
      <ServicesSection />
      <PortfolioSection {...localeProps} />
      <ClientsSection />
      <StatsSection />
      <ProcessSection />
      <BlogSection {...localeProps} />
      <ContactSection />

      <Footer />
    </div>
  );
}

