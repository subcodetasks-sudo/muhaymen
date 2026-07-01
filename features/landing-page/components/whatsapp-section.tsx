"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useHeroContent } from "../hooks/use-hero-content";
import type { AppLocale, CmsImage } from "../types";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-green-600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function parseClientName(alt: string): string {
  const separator = alt.includes("|") ? "|" : "—";
  const parts = alt.split(separator).map((part) => part.trim());
  return parts[parts.length - 1] || alt;
}

const carouselRowClassName =
  "-mx-6 flex gap-8 overflow-x-auto pb-2 px-6 max-md:snap-x max-md:snap-mandatory max-md:scroll-smooth max-md:px-[calc(50vw-min(42.5vw,160px))] overflow-y-hidden";

const carouselItemClassName =
  "w-[min(85vw,320px)] shrink-0 max-md:snap-center";

function WhatsAppChatCard({
  image,
  onlineLabel,
}: {
  image: CmsImage;
  onlineLabel: string;
}) {
  const clientName = parseClientName(image.alt);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
      <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4 text-white">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
          {clientName.charAt(0)}
        </div>
        <div className="min-w-0">
          <div className="truncate font-bold">{clientName}</div>
          <div className="text-xs text-green-200">{onlineLabel}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col bg-[#ECE5DD]">
        {image.url ? (
          <Image
            src={image.url}
            alt={image.alt}
            width={400}
            height={700}
            unoptimized
            className="h-auto w-full object-cover object-top"
          />
        ) : (
          <div className="flex aspect-9/16 flex-1 flex-col items-center justify-center gap-3 bg-[#ECE5DD] p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 shadow-sm">
              <ImageIcon className="h-8 w-8 text-muted-foreground" aria-hidden />
            </div>
            <p className="text-sm text-muted-foreground">{image.alt}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function WhatsAppSectionSkeleton() {
  return (
    <section className="px-6 py-24" aria-busy>
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center gap-4">
          <Skeleton className="h-9 w-52 rounded-full" />
          <Skeleton className="h-12 w-full max-w-lg rounded-2xl" />
          <Skeleton className="h-6 w-full max-w-2xl rounded-xl" />
        </div>

        <div className={carouselRowClassName}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg ${carouselItemClassName}`}
            >
              <Skeleton className="h-18 w-full rounded-none" />
              <Skeleton className="aspect-9/16 w-full rounded-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type WhatsAppSectionProps = {
  locale: AppLocale;
};

export function WhatsAppSection({ locale }: WhatsAppSectionProps) {
  const t = useTranslations("LandingPage.whatsapp");
  const { data: content, isPending } = useHeroContent(locale);
  const section = content?.section;

  if (isPending || !section) {
    return <WhatsAppSectionSkeleton />;
  }

  return (
    <section className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-16 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              <WhatsAppIcon />
              <span
                className="[&_p]:inline"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </span>
            <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
              {section.title}
            </h2>
            <div
              className="mx-auto max-w-2xl text-lg text-muted-foreground [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: section.description }}
            />
          </div>
        </ScrollAnimationWrapper>

        <div className={carouselRowClassName}>
          {section.images.map((image, index) => (
            <ScrollAnimationWrapper
              key={image.alt}
              type="fade-up"
              delay={index * 0.1}
              threshold={0.15}
              className={carouselItemClassName}
            >
              <WhatsAppChatCard image={image} onlineLabel={t("online")} />
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
