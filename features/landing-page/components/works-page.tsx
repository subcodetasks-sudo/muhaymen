import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import { buildWorksJsonLd, getWorksContent } from "../lib/cms";
import type { AppLocale } from "../types";
import { getAllWorksWithCategory } from "../utils/portfolio-utils";
import { Footer } from "./footer";

type WorksPageProps = {
  locale: AppLocale;
};

export async function WorksPage({ locale }: WorksPageProps) {
  const [content, t] = await Promise.all([
    getWorksContent(locale),
    getTranslations("WorksPage"),
  ]);
  const jsonLd = buildWorksJsonLd(content, locale);
  const works = getAllWorksWithCategory(content);
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
              <Link href={{ pathname: "/", hash: "portfolio" }}>
                <BackArrow className="me-2" size={16} />
                {t("backToPortfolio")}
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
              {works.map((work) => (
                <article
                  key={work.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10"
                >
                  <Link
                    href={`/works/${work.slug}`}
                    className="flex h-full flex-col"
                  >
                    <div className="relative aspect-4/3 overflow-hidden">
                      {work.image.url ? (
                        <Image
                          src={work.image.url}
                          alt={work.image.text || work.title}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          draggable={false}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-br from-primary/20 via-primary/10 to-muted p-6 text-center">
                          <span className="text-lg font-black text-primary">
                            {work.image.text}
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-3 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {work.categoryTitle}
                      </span>
                      <h2
                        className="mb-3 text-xl font-black leading-snug text-card-foreground transition-colors group-hover:text-primary [&_p]:contents"
                        dangerouslySetInnerHTML={{ __html: work.title }}
                      />
                      <div
                        className="mt-auto text-sm leading-relaxed text-muted-foreground [&_p]:mb-0"
                        dangerouslySetInnerHTML={{ __html: work.description }}
                      />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
