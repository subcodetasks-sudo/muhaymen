"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/react-bits/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  useIsFavorite,
  useToggleFavorite,
} from "../../hooks/use-favorites";
import type { FavoriteType } from "../../lib/favorites-storage";

type FavoriteButtonProps = {
  type: FavoriteType;
  /** Locale-stable favorite id (image/index based). */
  id: string;
  /** Legacy locale slugs so older saves still match. */
  aliases?: string[];
  variant?: "overlay" | "inline";
  className?: string;
};

export function FavoriteButton({
  type,
  id,
  aliases = [],
  variant = "overlay",
  className,
}: FavoriteButtonProps) {
  const t = useTranslations("Favorites");
  const isFavorited = useIsFavorite(type, id, aliases);
  const { mutate, isPending } = useToggleFavorite();

  const label = (() => {
    if (type === "service") {
      return isFavorited ? t("removeService") : t("saveService");
    }
    return isFavorited ? t("removeArticle") : t("saveArticle");
  })();

  const button = (
    <button
      type="button"
      disabled={isPending || !id}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!id || isPending) return;
        mutate({ type, id, aliases });
      }}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full transition-colors disabled:opacity-60",
        variant === "overlay" &&
          "bg-black/40 text-white backdrop-blur-sm hover:bg-black/55",
        variant === "inline" &&
          "h-11 w-11 shrink-0 border border-border bg-background text-foreground hover:bg-muted",
        isFavorited && "text-red-500",
        className,
      )}
      aria-label={label}
      aria-pressed={isFavorited}
    >
      <Heart
        size={18}
        className={cn(isFavorited && "fill-current text-red-500")}
        aria-hidden
      />
    </button>
  );

  return (
    <div
      className={cn(
        variant === "overlay" && "absolute inset-e-3 top-3 z-10",
        variant === "inline" && "inline-flex shrink-0",
      )}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="top" sideOffset={8}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
