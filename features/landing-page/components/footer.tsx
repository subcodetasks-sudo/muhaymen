import { ExternalLink, Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getFooterContent } from "../lib/cms";
import type { AppLocale, FooterPlatform } from "../types";

function PlatformLink({ platform }: { platform: FooterPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
    >
      <ExternalLink size={14} className="shrink-0" aria-hidden="true" />
      <span>{platform.name}</span>
    </a>
  );
}

export async function Footer() {
  const locale = (await getLocale()) as AppLocale;
  const [content, t] = await Promise.all([
    getFooterContent(locale),
    getTranslations("LandingPage.footer"),
  ]);

  return (
    <footer className="w-full border-t border-border bg-muted/20 py-16">
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20">
        <div className="grid w-full gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h3
              className="mb-4 text-2xl font-black text-foreground [&_p]:contents"
              dangerouslySetInnerHTML={{ __html: content.title }}
            />
            <div
              className="max-w-xl text-sm leading-relaxed text-muted-foreground [&_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: content.description }}
            />
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-foreground">
              {t("contactLabel")}
            </p>
            <a
              href={`mailto:${content.companyEmail}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail size={16} className="shrink-0 text-primary" />
              <span>{content.companyEmail}</span>
            </a>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold text-foreground">
              {t("platformsLabel")}
            </p>
            <div className="flex flex-wrap gap-3">
              {content.platforms.map((platform) => (
                <PlatformLink key={platform.url} platform={platform} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 w-full border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t("copyright", {
              appName: content.title.replace(/<[^>]*>/g, "").trim(),
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}
