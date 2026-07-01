import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import {
  buildArticlesJsonLd,
  getArticlesContent,
} from "../lib/cms";
import { getFeaturedArticles } from "../utils/articles-utils";
import type { LocaleProps } from "../types";
import { ArticleCard } from "./article-card";

const FEATURED_ARTICLES_LIMIT = 3;

export async function BlogSection({ locale, direction }: LocaleProps) {
  const [content, t] = await Promise.all([
    getArticlesContent(locale),
    getTranslations("LandingPage.blog"),
  ]);
  const jsonLd = buildArticlesJsonLd(content, locale);
  const articles = getFeaturedArticles(content, FEATURED_ARTICLES_LIMIT);
  const isRtl = direction === "rtl";
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section id="blog" className="bg-muted/30 px-6 py-24 dark:bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
            <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
              <div>
                <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                  {t("badge")}
                </span>
                <h2
                  className="text-4xl font-black text-foreground [&_p]:contents"
                  dangerouslySetInnerHTML={{ __html: content.title }}
                />
              </div>
              <Button
                variant="outline"
                className="shrink-0 rounded-full font-bold"
                asChild
              >
                <Link href="/articles">
                  {t("cta")}
                  <CtaArrow className="ms-2" size={16} />
                </Link>
              </Button>
            </div>
          </ScrollAnimationWrapper>

          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((article, index) => (
              <ScrollAnimationWrapper
                key={article.slug}
                type="fade-up"
                delay={index * 0.1}
                duration={0.5}
                threshold={0.15}
              >
                <ArticleCard article={article} index={index} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
