import { getTranslations } from "next-intl/server";
import { STAT_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

export async function StatsSection() {
  const t = await getTranslations("LandingPage.stats");

  return (
    <section className="-mt-12 bg-white px-6 pb-24 dark:bg-background">
      <div className="container mx-auto max-w-6xl border-t-2 border-primary/20 pt-12">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STAT_KEYS.map((key, index) => (
            <ScrollAnimationWrapper
              key={key}
              type="fade-up"
              delay={index * 0.1}
              duration={0.4}
              threshold={0.15}
              className="text-center"
            >
              <div className="text-4xl font-black text-primary mb-1">
                {t(`${key}.value`)}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {t(`${key}.label`)}
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
