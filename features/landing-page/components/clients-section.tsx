import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CLIENT_IMAGE_BY_KEY, CLIENT_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

const clientBadgeStyles: Record<string, string> = {
  thooq: "bg-primary text-white",
  noor: "bg-primary text-white",
  lara: "bg-primary text-white",
  masar: "bg-foreground text-background",
  reyada: "bg-foreground text-background",
  gulf: "bg-foreground text-background",
};

export async function ClientsSection() {
  const t = await getTranslations("LandingPage.clients");

  return (
    <section id="clients" className="bg-white px-6 py-24 dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ScrollAnimationWrapper
            type="fade-up"
            threshold={0.2}
            className="md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <div className="flex h-full flex-col justify-center rounded-2xl border-2 border-border bg-muted/30 p-8 lg:min-h-[420px]">
              <span className="mb-5 inline-block w-fit rounded-full bg-primary/15 px-5 py-2 text-sm font-black tracking-wider text-primary">
                {t("badge")}
              </span>
              <h2 className="mb-4 text-4xl font-black text-foreground">
                {t("title")}
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("subtitle")}
              </p>
            </div>
          </ScrollAnimationWrapper>

          {CLIENT_KEYS.map((key, index) => {
            const badgeStyle =
              clientBadgeStyles[key] ?? "bg-primary text-white";

            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-up"
                delay={index * 0.08}
                threshold={0.15}
              >
                <div className="group relative flex min-h-[280px] cursor-default flex-col justify-end overflow-hidden rounded-2xl border-2 border-border transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_12px_32px_rgba(245,168,0,0.12)] md:min-h-[320px]">
                  <Image
                    src={CLIENT_IMAGE_BY_KEY[key]}
                    alt={t(`items.${key}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

                  <div className="relative z-10 flex flex-col p-6 text-white">
                    <h3 className="mb-1 text-xl font-black">
                      {t(`items.${key}.name`)}
                    </h3>
                    <p className="mb-4 text-sm text-white/75">
                      {t(`items.${key}.sector`)}
                    </p>
                    <div className="flex flex-col gap-2">
                      <div
                        className={`inline-block w-fit rounded-xl px-4 py-2 text-sm font-bold ${badgeStyle}`}
                      >
                        {t(`items.${key}.highlight`)}
                      </div>
                      <p className="text-xs leading-relaxed text-white/70">
                        {t(`items.${key}.detail`)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
