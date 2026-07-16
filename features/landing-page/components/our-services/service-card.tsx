"use client";

import { ArrowUpRight, Heart } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { CmsServiceItem } from "../../types";

type ServiceCardProps = {
  service: CmsServiceItem;
  href: string;
  className?: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ServiceCard({ service, href, className }: ServiceCardProps) {
  const imageUrl = service.image?.url;
  const imageAlt = service.image?.alt || stripHtml(service.title);

  return (
    <article
      className={cn(
        "group rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/10",
        className,
      )}
    >
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

          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            className="absolute inset-e-2 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/55"
            aria-label="Save service"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4 px-4 pb-4 pt-2">
        <Link href={href} className="min-w-0 flex-1">
          <h3
            className="text-lg font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
            dangerouslySetInnerHTML={{ __html: service.title }}
          />
        </Link>

        <Link
          href={href}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-label={stripHtml(service.title)}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
