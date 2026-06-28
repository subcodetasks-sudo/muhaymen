import { getTranslations } from "next-intl/server";
import { CLIENT_KEYS } from "../lib/constants";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

const clientStyles: Record<
  string,
  { icon: string; bg: string; border: string; badge: string }
> = {
  thooq: {
    icon: "🍽",
    bg: "bg-orange-50/70 dark:bg-orange-950/10",
    border: "border-orange-200 dark:border-orange-900/30",
    badge: "bg-primary text-white",
  },
  noor: {
    icon: "🏥",
    bg: "bg-yellow-50/70 dark:bg-yellow-950/10",
    border: "border-yellow-200 dark:border-yellow-900/30",
    badge: "bg-primary text-white",
  },
  lara: {
    icon: "👗",
    bg: "bg-amber-50/70 dark:bg-amber-950/10",
    border: "border-amber-200 dark:border-amber-900/30",
    badge: "bg-primary text-white",
  },
  masar: {
    icon: "🚛",
    bg: "bg-yellow-50/70 dark:bg-yellow-950/10",
    border: "border-yellow-200 dark:border-yellow-900/30",
    badge: "bg-foreground text-background",
  },
  reyada: {
    icon: "🎓",
    bg: "bg-orange-50/70 dark:bg-orange-950/10",
    border: "border-orange-200 dark:border-orange-900/30",
    badge: "bg-foreground text-background",
  },
  gulf: {
    icon: "🏙",
    bg: "bg-amber-50/70 dark:bg-amber-950/10",
    border: "border-amber-200 dark:border-amber-900/30",
    badge: "bg-foreground text-background",
  },
};

export async function ClientsSection() {
  const t = await getTranslations("LandingPage.clients");

  return (
    <section id="clients" className="py-24 px-6 bg-white dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/15 text-primary font-black text-sm px-5 py-2 rounded-full mb-5 tracking-wider">
              {t("badge")}
            </span>
            <h2 className="text-4xl font-black text-foreground mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </ScrollAnimationWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CLIENT_KEYS.map((key, index) => {
            const style = clientStyles[key] || {
              icon: "💼",
              bg: "bg-muted/50",
              border: "border-border",
              badge: "bg-primary text-white",
            };
            return (
              <ScrollAnimationWrapper
                key={key}
                type="fade-up"
                delay={index * 0.08}
                threshold={0.15}
              >
                <div className={`${style.bg} border-2 ${style.border} rounded-2xl p-7 cursor-default hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(245,168,0,0.12)] transition-all duration-300 flex flex-col h-full`}>
                  <div className="text-4xl mb-4">{style.icon}</div>
                  <h3 className="text-xl font-black text-foreground mb-1">
                    {t(`items.${key}.name`)}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {t(`items.${key}.sector`)}
                  </p>
                  <div className="mt-auto pt-4 flex flex-col gap-2">
                    <div className={`text-sm font-bold ${style.badge} rounded-xl px-4 py-2 inline-block w-fit`}>
                      {t(`items.${key}.highlight`)}
                    </div>
                    <p className="text-xs text-muted-foreground/80 leading-relaxed mt-1">
                      {t(`items.${key}.detail`)}
                    </p>
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


