import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { BLOG_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import type { LocaleProps } from "../types";

const blogStyles: Record<
  string,
  { accentBg: string; tagColor: string; readTimeAr: string; readTimeEn: string }
> = {
  instagram: {
    accentBg: "from-pink-400/20 to-pink-400/5",
    tagColor: "bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400",
    readTimeAr: "5 دقائق",
    readTimeEn: "5 min",
  },
  ads: {
    accentBg: "from-blue-400/20 to-blue-400/5",
    tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    readTimeAr: "7 دقائق",
    readTimeEn: "7 min",
  },
  branding: {
    accentBg: "from-amber-400/20 to-amber-400/5",
    tagColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    readTimeAr: "6 دقائق",
    readTimeEn: "6 min",
  },
};

export async function BlogSection({ direction }: LocaleProps) {
  const t = await getTranslations("LandingPage.blog");
  const isRtl = direction === "rtl";
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-muted/30 dark:bg-muted/10 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-14 flex flex-col items-end justify-between gap-6 md:flex-row">
            <div>
              <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
                {t("badge")}
              </span>
              <h2 className="text-4xl font-black text-foreground">
                {t("title")}
              </h2>
            </div>
            <Button variant="outline" className="shrink-0 rounded-full font-bold">
              {t("cta")}
              <CtaArrow className="ms-2" size={16} />
            </Button>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid gap-8 md:grid-cols-3">
          {BLOG_KEYS.map((key, index) => {
            const style = blogStyles[key] || {
              accentBg: "from-primary/20 to-primary/5",
              tagColor: "bg-primary/10 text-primary",
              readTimeAr: "5 دقائق",
              readTimeEn: "5 min",
            };
            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-up"
                delay={index * 0.1}
                duration={0.5}
                threshold={0.15}
              >
                <article
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col"
                  data-testid={`article-card-${index}`}
                >
                  <div className={`h-44 bg-gradient-to-br ${style.accentBg} flex items-end p-5`}>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${style.tagColor}`}>
                      {t(`posts.${key}.category`)}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-black mb-3 leading-snug group-hover:text-primary transition-colors">
                      {t(`posts.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow">
                      {t(`posts.${key}.excerpt`)}
                    </p>
                    <div className="flex justify-between items-center text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                      <span>{t(`posts.${key}.date`)}</span>
                      <span>
                        {isRtl ? `${style.readTimeAr} قراءة` : `${style.readTimeEn} read`}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

