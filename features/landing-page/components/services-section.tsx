import {
  BarChart3,
  Camera,
  Megaphone,
  Palette,
  PenLine,
  Share2,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SERVICE_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

const serviceIcons = [PenLine, Share2, Palette, Megaphone, BarChart3, Camera];

export async function ServicesSection() {
  const t = await getTranslations("LandingPage.services");

  return (
    <section id="services" className="bg-muted/40 px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-16 text-center">
            <span className="mb-5 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              {t("badge")}
            </span>
            <h2 className="mb-4 text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_KEYS.map((key, index) => {
            const Icon = serviceIcons[index] ?? PenLine;
            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-up"
                delay={index * 0.1}
                threshold={0.15}
              >
                <div className="group h-full rounded-[1.5rem] border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={24} />
                  </div>
                  <span className="mb-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
                    {t(`items.${key}.tag`)}
                  </span>
                  <h3 className="mb-3 text-xl font-black text-card-foreground">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

