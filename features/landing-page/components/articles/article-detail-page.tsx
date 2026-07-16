import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/react-bits/ui/breadcrumb";
import { Button } from "@/components/react-bits/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import { getArticleFavoriteKeys } from "../../lib/favorites-ids";
import type { AppLocale, ArticleDetail } from "../../types";
import { FavoriteButton } from "../favorites/favorite-button";
import { Footer } from "../layout/footer";

type ArticleDetailPageProps = {
  locale: AppLocale;
  article: ArticleDetail;
  articleIndex?: number;
  legacySlug?: string;
  homeLabel: string;
  backLabel: string;
  articlesLabel: string;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function ArticleDetailPage({
  locale,
  article,
  articleIndex = -1,
  legacySlug,
  homeLabel,
  backLabel,
  articlesLabel,
}: ArticleDetailPageProps) {
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;
  const PathSeparator = isRtl ? ChevronLeft : ChevronRight;
  const articleTitle = stripHtml(article.title);
  const { id: favoriteId, aliases } = getArticleFavoriteKeys(
    article,
    articleIndex,
    [legacySlug],
  );

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="px-6 pb-24 pt-28">
        <div className="container mx-auto max-w-6xl">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="font-medium">
                    {homeLabel}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <PathSeparator />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/articles" className="font-medium">
                    {articlesLabel}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <PathSeparator />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-[min(100%,28rem)] truncate font-medium">
                  {articleTitle}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Button
            variant="ghost"
            className="mb-8 rounded-full font-bold"
            asChild
          >
            <Link href={{ pathname: "/", hash: "blog" }}>
              <BackArrow className="me-2" size={16} />
              {backLabel}
            </Link>
          </Button>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-xl">
                {article.image.url ? (
                  <Image
                    src={article.image.url}
                    alt={article.image.text || article.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    draggable={false}
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-muted p-8 text-center">
                    <span
                      className="text-2xl font-black text-primary"
                      dangerouslySetInnerHTML={{ __html: article.image.text }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <span
                className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                dangerouslySetInnerHTML={{ __html: article.category.title }}
              />
              <div className="mb-6 flex items-start gap-3">
                <h1
                  className="min-w-0 flex-1 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
                  dangerouslySetInnerHTML={{ __html: article.title }}
                />
                <FavoriteButton
                  type="article"
                  id={favoriteId}
                  aliases={aliases}
                  variant="inline"
                  className="mt-1"
                />
              </div>
              <div
                className="text-lg leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: article.description }}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
