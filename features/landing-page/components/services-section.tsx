"use client";

import {
  BarChart3,
  Camera,
  Megaphone,
  Palette,
  PenLine,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useServicesContent } from "../hooks/use-services-content";
import type { AppLocale } from "../types";

const serviceIcons = [PenLine, Share2, Palette, Megaphone, BarChart3, Camera];

type ServicesSectionProps = {
  locale: AppLocale;
};

export function ServicesSection({ locale }: ServicesSectionProps) {
  const { data: content } = useServicesContent(locale);

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
              <Skeleton key={index} className="h-64 rounded-[1.5rem]" />
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
          <div className="mb-16 text-center">
            <h2
              className="mb-4 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
            <div
              className="mx-auto max-w-2xl text-lg text-muted-foreground [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </div>
        </ScrollAnimationWrapper>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => {
            const Icon = serviceIcons[index] ?? PenLine;
            return (
              <ScrollAnimationWrapper
                key={`${service.title}-${index}`}
                type="fade-up"
                delay={index * 0.1}
                threshold={0.15}
              >
                <div className="group h-full rounded-[1.5rem] border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    {service.image?.url ? (
                      <Image
                        src={service.image.url}
                        alt={service.image.alt || service.title}
                        width={28}
                        height={28}
                        unoptimized
                        className="h-7 w-7 object-contain"
                        draggable={false}
                      />
                    ) : (
                      <Icon size={24} />
                    )}
                  </div>
                  <h3
                    className="mb-3 text-xl font-black text-card-foreground [&_p]:contents"
                    dangerouslySetInnerHTML={{ __html: service.title }}
                  />
                  <div
                    className="leading-relaxed text-muted-foreground [&_p]:mb-0"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
