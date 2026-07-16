"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { Button } from "@/components/react-bits/ui/button";
import { Skeleton } from "@/components/react-bits/ui/skeleton";
import { getDirection } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { getServiceSlug } from "../../lib/service-cms";
import { useServicesContent } from "../../hooks/use-services-content";
import type { AppLocale, ServicesContent } from "../../types";
import { ServiceCard } from "./service-card";
import { ServiceCardSkeleton } from "./service-card-skeleton";

type ServicesSectionProps = {
  locale: AppLocale;
  initialData?: ServicesContent;
};

export function ServicesSection({ locale, initialData }: ServicesSectionProps) {
  const t = useTranslations("LandingPage.services");
  const { data: content } = useServicesContent(locale, initialData);
  const isRtl = getDirection(locale) === "rtl";
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight;
  const visibleServices = content?.services.slice(0, 3) ?? [];

  if (!content) {
    return (
      <section id="services" className="bg-muted/40 px-6 py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Skeleton className="mx-auto mb-5 h-9 w-32 rounded-full" />
            <Skeleton className="mx-auto mb-4 h-12 w-64" />
            <Skeleton className="mx-auto h-6 w-96 max-w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="bg-muted/40 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-start">
            <div>
              <h2
                className="mb-4 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              <div
                className="mx-auto max-w-2xl text-lg text-muted-foreground md:mx-0 [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.description }}
              />
            </div>
            <Button
              variant="outline"
              className="shrink-0 rounded-full font-bold"
              asChild
            >
              <Link href="/services">
                {t("cta")}
                <CtaArrow className="ms-2" size={16} />
              </Link>
            </Button>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service, index) => (
            <ScrollAnimationWrapper
              key={`${service.title}-${index}`}
              type="fade-up"
              delay={index * 0.1}
              threshold={0.15}
            >
              <ServiceCard
                service={service}
                index={index}
                href={`/services/${getServiceSlug(service.title)}`}
              />
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
