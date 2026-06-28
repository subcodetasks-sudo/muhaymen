import { Users } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ABOUT_US_IMAGE_PATH, VALUE_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";
import type { LocaleProps } from "../types";

export async function AboutSection(_props: LocaleProps) {
  const t = await getTranslations("LandingPage.about");

  return (
    <section id="about" className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-16 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary">
              <Users size={16} />
              {t("badge")}
            </span>
            <h2 className="text-4xl font-black text-foreground md:text-5xl">
              {t("title")}
            </h2>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <ScrollAnimationWrapper type="fade-up" threshold={0.15}>
              <h3 className="mb-6 text-3xl font-black leading-tight text-foreground md:text-4xl">
                {t("headline")}{" "}
                <span className="text-primary">{t("headlineHighlight")}</span>
                {t("headlineSuffix")}
              </h3>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {t("paragraph1")}
              </p>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                {t("paragraph2")}
              </p>
            </ScrollAnimationWrapper>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {VALUE_KEYS.map((key, index) => (
                <ScrollAnimationWrapper
                  key={key}
                  type="fade-up"
                  delay={index * 0.1}
                  threshold={0.15}
                >
                  <div className="h-full rounded-2xl border border-border bg-card p-5">
                    <div className="mb-1 font-bold text-foreground">
                      {t(`values.${key}.title`)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t(`values.${key}.description`)}
                    </div>
                  </div>
                </ScrollAnimationWrapper>
              ))}
            </div>
          </div>

          <ScrollAnimationWrapper type="blur-fade" threshold={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/10 blur-2xl" />
              <div className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border shadow-xl">
                <Image
                  src={ABOUT_US_IMAGE_PATH}
                  alt={t("title")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  draggable={false}
                />
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}

