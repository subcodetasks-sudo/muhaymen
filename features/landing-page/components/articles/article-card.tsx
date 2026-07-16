"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { BorderGlow } from "@/components/react-bits/border-glow";
import type { ArticleWithCategory } from "../../types";
import { getArticleFavoriteKeys } from "../../lib/favorites-ids";
import { FavoriteButton } from "../favorites/favorite-button";

type ArticleCardProps = {
  article: ArticleWithCategory;
  index: number;
  /** Other-locale slug alias for legacy favorites. */
  legacySlug?: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ArticleCard({
  article,
  index,
  legacySlug,
}: ArticleCardProps) {
  const imageUrl = article.image?.url;
  const imageAlt = article.image?.text || stripHtml(article.title);
  const href = `/articles/${article.slug}`;
  const titleText = stripHtml(article.title);
  const { id: favoriteId, aliases } = getArticleFavoriteKeys(
    article,
    index,
    [legacySlug],
  );

  return (
    <BorderGlow
      className="group h-full"
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

          <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-2">
            <div className="min-w-0 flex-1 space-y-2">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                {article.categoryTitle}
              </span>
              <h3
                className="text-lg font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: article.title }}
              />
              <div
                className="line-clamp-3 text-sm leading-relaxed text-muted-foreground [&_p]:inline [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
            </div>

            <span className="flex h-11 w-11 shrink-0 items-center justify-center text-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </Link>

        <FavoriteButton
          type="article"
          id={favoriteId}
          aliases={aliases}
          variant="overlay"
        />
      </article>
    </BorderGlow>
  );
}
