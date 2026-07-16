import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import {
  buildArticlesListPageJsonLd,
  getArticlesContent,
} from "../../lib/cms";
import { getAllArticlesWithCategory } from "../../utils/articles-utils";
import type { AppLocale } from "../../types";
import { ArticleCard } from "./article-card";
import { Footer } from "../layout/footer";

type ArticlesPageProps = {
  locale: AppLocale;
};

export async function ArticlesPage({ locale }: ArticlesPageProps) {
  const [content, t] = await Promise.all([
    getArticlesContent(locale),
    getTranslations("ArticlesPage"),
  ]);
  const jsonLd = buildArticlesListPageJsonLd(content, locale);
  const articles = getAllArticlesWithCategory(content);
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
        <main className="px-6 pb-24 pt-28">
          <div className="container mx-auto max-w-6xl">
            <Button
              variant="ghost"
              className="mb-8 rounded-full font-bold"
              asChild
            >
              <Link href={{ pathname: "/", hash: "blog" }}>
                <BackArrow className="me-2" size={16} />
                {t("backToBlog")}
              </Link>
            </Button>

            <div className="mb-14">
              <h1
                className="mb-4 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
              <div
                className="max-w-2xl text-lg text-muted-foreground [&_p]:contents"
                dangerouslySetInnerHTML={{ __html: content.description }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <ArticleCard key={article.slug} article={article} index={index} />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
