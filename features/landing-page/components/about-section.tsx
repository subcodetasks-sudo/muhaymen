import { Users } from "lucide-react";
import Image from "next/image";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import type { AboutContent, LocaleProps } from "../types";
import { buildAboutJsonLd } from "../lib/cms";

type AboutSectionProps = LocaleProps & {
  content: AboutContent;
};

export function AboutSection({ content, locale }: AboutSectionProps) {
  const jsonLd = buildAboutJsonLd(content, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section id="about" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-16 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Users size={16} />
              <span
                className="[&_p]:inline"
                dangerouslySetInnerHTML={{ __html: content.title }}
              />
            </span>
            <div
              className="text-4xl font-black text-foreground md:text-5xl [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </div>
        </ScrollAnimationWrapper>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <ScrollAnimationWrapper type="fade-up" threshold={0.15}>
              <div
                className="mb-8 text-lg leading-relaxed text-muted-foreground [&_p]:mb-4 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{ __html: content.content }}
              />
            </ScrollAnimationWrapper>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {content.items.map((item, index) => (
                <ScrollAnimationWrapper
                  key={index}
                  type="fade-up"
                  delay={index * 0.1}
                  threshold={0.15}
                >
                  <div className="h-full rounded-2xl border border-border bg-card p-5">
                    <div
                      className="font-bold text-foreground [&_p]:contents"
                      dangerouslySetInnerHTML={{ __html: item.text }}
                    />
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>

          <ScrollAnimationWrapper type="blur-fade" threshold={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-xl">
                {content.image.url ? (
                  <Image
                    src={content.image.url}
                    alt={content.image.text}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-muted p-6 text-center text-muted-foreground">
                    <span
                      className="[&_p]:contents"
                      dangerouslySetInnerHTML={{ __html: content.image.text }}
                    />
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
    </>
  );
}
