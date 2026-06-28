"use client";

import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

export function ContactSection() {
  const t = useTranslations("LandingPage.contact");
  const site = useTranslations("LandingPage.site");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    toast.success(t("successTitle"), {
      description: t("successDescription"),
    });

    event.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative overflow-hidden px-6 py-24">
      <div className="absolute start-0 top-0 -z-10 h-1/2 w-full bg-primary/5" />

      <div className="container relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] border border-border bg-card p-8 shadow-2xl md:p-16">
        <div className="absolute -end-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-[50px]" />

        <div className="relative z-10 grid gap-16 md:grid-cols-2">
          <ScrollAnimationWrapper type="fade-up" threshold={0.15}>
            <div>
              <h2 className="mb-6 text-4xl font-black text-card-foreground md:text-5xl">
                {t("title")}
              </h2>
              <p className="mb-8 text-xl text-muted-foreground">{t("subtitle")}</p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">
                      {t("emailLabel")}
                    </div>
                    <div className="font-bold text-card-foreground">{site("email")}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-muted-foreground">
                      {t("phoneLabel")}
                    </div>
                    <div className="font-bold text-card-foreground" dir="ltr">
                      {site("phone")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper type="fade-up" threshold={0.15} delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-card-foreground">
                  {t("nameLabel")}
                </label>
                <Input
                  name="name"
                  required
                  placeholder={t("namePlaceholder")}
                  className="h-12 rounded-xl bg-background px-4"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-card-foreground">
                  {t("emailLabel")}
                </label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder={t("emailPlaceholder")}
                  className="h-12 rounded-xl bg-background px-4"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-card-foreground">
                  {t("messageLabel")}
                </label>
                <Textarea
                  name="message"
                  required
                  placeholder={t("messagePlaceholder")}
                  className="min-h-32 rounded-xl bg-background px-4 py-3"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-14 w-full rounded-full bg-primary text-lg font-bold text-primary-foreground hover:bg-primary/90"
              >
                {t("submitLabel")}
              </Button>
            </form>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </section>
  );
}

