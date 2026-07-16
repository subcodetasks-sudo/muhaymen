"use client";

import Image from "next/image";
import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";
import type { CmsImage, TextDirection } from "../../types";

const COLUMN_DURATIONS = ["42s", "48s", "54s"] as const;
const ROW_DURATIONS = ["28s", "34s"] as const;
const DESKTOP_COLUMN_COUNT = 3;
const MOBILE_ROW_COUNT = 2;
const MIN_ITEMS_PER_TRACK = 4;

const FADE_MASK_VERTICAL =
  "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)";
const FADE_MASK_HORIZONTAL =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

function getUsableImages(images: CmsImage[]) {
  return images.filter((image) => Boolean(image.url));
}

function splitIntoTracks(images: CmsImage[], tracks: number): CmsImage[][] {
  const result: CmsImage[][] = Array.from({ length: tracks }, () => []);
  const usable = getUsableImages(images);

  if (usable.length === 0) return result;

  usable.forEach((image, index) => {
    result[index % tracks].push(image);
  });

  return result.map((track, trackIndex) => {
    const seed =
      track.length > 0 ? track : [usable[trackIndex % usable.length]];
    const filled = [...seed];

    while (filled.length < MIN_ITEMS_PER_TRACK) {
      filled.push(...seed);
    }

    return filled;
  });
}

function HeroMarqueeCard({
  image,
  priority,
  className,
}: {
  image: CmsImage;
  priority?: boolean;
  className?: string;
}) {
  if (!image.url) return null;

  return (
    <figure
      className={cn(
        "relative aspect-9/16 shrink-0 overflow-hidden rounded-2xl border border-primary/15 bg-transparent shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]",
        className,
      )}
    >
      <Image
        src={image.url}
        alt={image.alt || ""}
        width={360}
        height={640}
        priority={priority}
        unoptimized
        className="h-full w-full object-cover object-top"
      />
    </figure>
  );
}

type HeroMarqueeProps = {
  images: CmsImage[];
  direction?: TextDirection;
  className?: string;
};

export function HeroMarquee({
  images,
  direction = "ltr",
  className,
}: HeroMarqueeProps) {
  const usableImages = getUsableImages(images);
  const mobileRows = splitIntoTracks(images, MOBILE_ROW_COUNT);
  const desktopColumns = splitIntoTracks(images, DESKTOP_COLUMN_COUNT);
  const hasImages = usableImages.length > 0;
  const isRtl = direction === "rtl";

  if (!hasImages) return null;

  return (
    <>
      {/* Small screens: 2 horizontal rows */}
      <div
        aria-hidden
        className={cn(
          "relative w-full overflow-hidden lg:hidden",
          className,
        )}
        style={{
          maskImage: FADE_MASK_HORIZONTAL,
          WebkitMaskImage: FADE_MASK_HORIZONTAL,
        }}
      >
        <div className="flex w-full flex-col gap-2">
          {mobileRows.map((rowImages, rowIndex) => (
            <Marquee
              key={rowIndex}
              reverse={rowIndex % 2 === 1}
              pauseOnHover
              repeat={4}
              className="w-full p-0 [--gap:0.4rem]"
              style={{ ["--duration" as string]: ROW_DURATIONS[rowIndex] }}
            >
              {rowImages.map((image, imageIndex) => (
                <HeroMarqueeCard
                  key={`h-${image.url}-${rowIndex}-${imageIndex}`}
                  image={image}
                  priority={rowIndex === 0 && imageIndex === 0}
                  className="h-56 w-auto sm:h-64"
                />
              ))}
            </Marquee>
          ))}
        </div>
      </div>

      {/* Large screens: 3 vertical columns */}
      <div
        aria-hidden
        className={cn(
          "relative mx-auto hidden h-136 w-full max-w-lg lg:block",
          className,
        )}
      >
        <div
          className={cn(
            "flex h-full w-full origin-center gap-3",
            isRtl ? "-rotate-3" : "rotate-3",
          )}
          style={{
            maskImage: FADE_MASK_VERTICAL,
            WebkitMaskImage: FADE_MASK_VERTICAL,
          }}
        >
          {desktopColumns.map((columnImages, columnIndex) => (
            <Marquee
              key={columnIndex}
              vertical
              reverse={columnIndex % 2 === 1}
              pauseOnHover
              repeat={4}
              className="h-full flex-1 overflow-hidden p-0 [--gap:0.85rem]"
              style={{
                ["--duration" as string]: COLUMN_DURATIONS[columnIndex],
              }}
            >
              {columnImages.map((image, imageIndex) => (
                <HeroMarqueeCard
                  key={`v-${image.url}-${columnIndex}-${imageIndex}`}
                  image={image}
                  priority={columnIndex === 0 && imageIndex === 0}
                  className="w-full"
                />
              ))}
            </Marquee>
          ))}
        </div>
      </div>
    </>
  );
}
