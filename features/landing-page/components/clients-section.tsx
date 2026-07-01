import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import type { AppLocale, ClientsContent } from "../types";
import { buildClientsJsonLd } from "../lib/cms";

interface ClientsSectionProps {
  content: ClientsContent;
  locale: AppLocale;
}

export function ClientsSection({ content, locale }: ClientsSectionProps) {
  if (!content) return null;

  const jsonLd = buildClientsJsonLd(content, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section id="clients" className="bg-white px-6 py-24 dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ScrollAnimationWrapper
             type="fade-up"
             threshold={0.2}
             className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <div className="flex h-full flex-col justify-center rounded-2xl border-2 border-border bg-muted/30 p-8 lg:min-h-[420px]">
              <span className="mb-5 inline-block w-fit rounded-full bg-primary/15 px-5 py-2 text-sm font-black tracking-wider text-primary" dangerouslySetInnerHTML={{ __html: content.title }} />
              <h2 className="mb-4 text-4xl font-black text-foreground" dangerouslySetInnerHTML={{ __html: content.description }} />
              <div className="mt-4 text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: content.content }} />
            </div>
          </ScrollAnimationWrapper>

          {content.clients.map((client, index) => {
            return (
              <ScrollAnimationWrapper
                key={index}
                type="fade-up"
                delay={index * 0.08}
                threshold={0.15}
              >
                <div className="group relative flex min-h-[280px] cursor-default flex-col justify-end overflow-hidden rounded-2xl border-2 border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_12px_32px_rgba(245,168,0,0.12)] md:min-h-[320px]">
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                  <div className="relative z-10 flex flex-col p-6 text-white">
                    <h3 className="mb-1 text-xl font-black" dangerouslySetInnerHTML={{ __html: client.title }} />
                    <div className="mb-4 text-sm text-white/75" dangerouslySetInnerHTML={{ __html: client.description }} />
                    <div className="flex flex-col gap-2">
                      <div className="text-xs leading-relaxed text-white/70" dangerouslySetInnerHTML={{ __html: client.content }} />
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
    </>
  );
}

