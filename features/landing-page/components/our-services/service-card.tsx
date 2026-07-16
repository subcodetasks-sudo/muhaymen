"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { BorderGlow } from "@/components/react-bits/border-glow";
import { cn } from "@/lib/utils";
import type { CmsServiceItem } from "../../types";
import { getServiceFavoriteKeys } from "../../lib/favorites-ids";
import { FavoriteButton } from "../favorites/favorite-button";

type ServiceCardProps = {
  service: CmsServiceItem;
  href: string;
  /** Index in the full services list (locale-stable). */
  index: number;
  /** Other-locale slug alias for legacy favorites. */
  legacySlug?: string;
  className?: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ServiceCard({
  service,
  href,
  index,
  legacySlug,
  className,
}: ServiceCardProps) {
  const imageUrl = service.image?.url;
  const imageAlt = service.image?.alt || stripHtml(service.title);
  const titleText = stripHtml(service.title);
  const { id: favoriteId, aliases } = getServiceFavoriteKeys(
    service,
    index,
    [legacySlug],
  );

  return (
    <BorderGlow
      className={cn("group h-full", className)}
      edgeSensitivity={30}
      glowColor="48 85 70"
      backgroundColor="var(--card)"
      borderRadius={24}
      glowRadius={52}
      glowIntensity={1.4}
      coneSpread={28}
      animated={false}
      fillOpacity={0.35}
      colors={["#E8C547", "#F5D76E", "#D4A84B"]}
    >
      <article className="relative">
        <Link href={href} className="block" aria-label={titleText}>
          <div className="p-1">
            <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-border/70 bg-muted">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  draggable={false}
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/15 via-muted to-muted p-6 text-center text-sm font-bold text-primary/80">
                  {imageAlt}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-2">
            <h3
              className="min-w-0 flex-1 text-lg font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: service.title }}
            />

            <span className="flex h-11 w-11 shrink-0 items-center justify-center text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>

        <FavoriteButton
          type="service"
          id={favoriteId}
          aliases={aliases}
          variant="overlay"
        />
      </article>
    </BorderGlow>
  );
}
