import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { WorkWithCategory } from "../../types";

type WorkCardProps = {
  work: WorkWithCategory;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function WorkCard({ work }: WorkCardProps) {
  const imageUrl = work.image.url;
  const imageAlt = work.image.text || stripHtml(work.title);
  const href = `/works/${work.slug}`;

  return (
    <article className="group rounded-3xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/10">
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

      <div className="flex items-end justify-between gap-4 px-4 pb-4 pt-2">
        <Link href={href} className="min-w-0 flex-1">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {work.categoryTitle}
            </span>
            <h3
              className="text-lg font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: work.title }}
            />
            <div
              className="line-clamp-3 text-sm leading-relaxed text-muted-foreground [&_p]:inline [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: work.description }}
            />
          </div>
        </Link>

        <Link
          href={href}
          className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-label={stripHtml(work.title)}
        >
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}
