import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ArticleWithCategory } from "../types";

const cardStyles = [
  {
    accentBg: "from-pink-400/20 to-pink-400/5",
    tagColor: "bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400",
  },
  {
    accentBg: "from-blue-400/20 to-blue-400/5",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  },
  {
    accentBg: "from-amber-400/20 to-amber-400/5",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  },
] as const;

type ArticleCardProps = {
  article: ArticleWithCategory;
  index: number;
};

export function ArticleCard({ article, index }: ArticleCardProps) {
  const style = cardStyles[index % cardStyles.length];

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-xl"
    >
      <div
        className={`relative flex h-44 items-end bg-linear-to-br p-5 ${style.accentBg}`}
      >
        {article.image.url ? (
          <Image
            src={article.image.url}
            alt={article.image.text || article.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            draggable={false}
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm font-black text-primary/80">
            {article.image.text}
          </span>
        )}
        <span
          className={`relative z-10 rounded-full px-3 py-1.5 text-xs font-bold ${style.tagColor}`}
        >
          {article.categoryTitle}
        </span>
      </div>
      <div className="flex grow flex-col p-6">
        <h3
          className="mb-3 text-lg font-black leading-snug transition-colors group-hover:text-primary [&_p]:contents"
          dangerouslySetInnerHTML={{ __html: article.title }}
        />
        <div
          className="grow text-sm leading-relaxed text-muted-foreground [&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
      </div>
    </Link>
  );
}
