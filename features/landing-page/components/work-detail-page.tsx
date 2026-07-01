import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { getDirection } from "@/i18n/locale";
import type { AppLocale, WorkDetail } from "../types";
import { Footer } from "./footer";

type WorkDetailPageProps = {
  locale: AppLocale;
  work: WorkDetail;
  backLabel: string;
};

export function WorkDetailPage({
  locale,
  work,
  backLabel,
}: WorkDetailPageProps) {
  const direction = getDirection(locale);
  const isRtl = direction === "rtl";
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="px-6 pb-24 pt-28">
        <div className="container mx-auto max-w-6xl">
          <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
            <Button
              variant="ghost"
              className="mb-8 rounded-full font-bold"
              asChild
            >
              <Link href={{ pathname: "/", hash: "portfolio" }}>
                <BackArrow className="me-2" size={16} />
                {backLabel}
              </Link>
            </Button>
          </ScrollAnimationWrapper>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <ScrollAnimationWrapper type="blur-fade" threshold={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
                <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-xl">
                  {work.image.url ? (
                    <Image
                      src={work.image.url}
                      alt={work.image.text || work.title}
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
                        dangerouslySetInnerHTML={{ __html: work.image.text }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimationWrapper>

            <div>
              <ScrollAnimationWrapper type="fade-up" threshold={0.15}>
                <span
                  className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                  dangerouslySetInnerHTML={{ __html: work.category.title }}
                />
                <h1
                  className="mb-6 text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
                  dangerouslySetInnerHTML={{ __html: work.title }}
                />
                <div
                  className="text-lg leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: work.description }}
                />
              </ScrollAnimationWrapper>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
