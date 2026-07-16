import { ExternalLink, Mail } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { getFooterContent } from "../../lib/cms";
import type { AppLocale, FooterPlatform } from "../../types";

type SocialIconProps = {
  className?: string;
};

function InstagramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
    </svg>
  );
}

function XIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.77 7.74L23 22h-6.2l-4.86-6.35L6.38 22H3.26l7.24-8.28L1 2h6.36l4.4 5.8L18.9 2Zm-1.08 18h1.72L6.43 3.9H4.58Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4.98 3.5A1.48 1.48 0 1 1 3.5 4.98 1.48 1.48 0 0 1 4.98 3.5ZM3.75 8.25h2.46v12H3.75Zm5.25 0h2.36v1.64h.03c.33-.62 1.14-1.27 2.34-1.27 2.5 0 2.96 1.64 2.96 3.77v7.86h-2.46v-6.97c0-1.66-.03-3.8-2.31-3.8-2.32 0-2.67 1.81-2.67 3.68v7.09H9Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.76 4.87-1.28A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.08-1.12l-.29-.17-2.88.75.77-2.8-.19-.29A8 8 0 1 1 12 20Zm4.4-5.52c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06a6.57 6.57 0 0 1-1.93-1.19 7.27 7.27 0 0 1-1.34-1.67c-.14-.24-.02-.36.1-.48.1-.1.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46a.88.88 0 0 0-.64.3 2.68 2.68 0 0 0-.84 1.98c0 1.16.84 2.28.96 2.44.12.16 1.66 2.54 4.02 3.56.56.24 1 .38 1.34.48.56.18 1.08.15 1.48.09.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.05-.1-.21-.16-.45-.28Z" />
    </svg>
  );
}

function FacebookIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.25-1.46 1.5-1.46H16.7V5.06c-.3-.04-1.31-.11-2.5-.11-2.47 0-4.16 1.5-4.16 4.28V11H7.3v3h2.74v8Z" />
    </svg>
  );
}

function YouTubeIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.58 7.19a2.98 2.98 0 0 0-2.1-2.1C17.62 4.6 12 4.6 12 4.6s-5.62 0-7.48.49a2.98 2.98 0 0 0-2.1 2.1C1.93 9.05 1.93 12 1.93 12s0 2.95.49 4.81a2.98 2.98 0 0 0 2.1 2.1c1.86.49 7.48.49 7.48.49s5.62 0 7.48-.49a2.98 2.98 0 0 0 2.1-2.1c.49-1.86.49-4.81.49-4.81s0-2.95-.49-4.81ZM10.2 14.98V9.02L15.4 12Z" />
    </svg>
  );
}

function TikTokIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M14.53 3c.2 1.7 1.16 3.1 2.74 3.97.95.52 2 .79 3.1.8v2.57a8.6 8.6 0 0 1-3.34-.66v5.19a6.87 6.87 0 1 1-6.88-6.87c.38 0 .76.03 1.13.1v2.66a4.16 4.16 0 1 0 3.25 4.04V3Z" />
    </svg>
  );
}

function TelegramIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.94 4.62c.2-.8-.58-1.46-1.31-1.12L2.9 11.06c-.8.34-.74 1.49.1 1.74l4.08 1.25 1.57 5.1c.22.7 1.12.92 1.64.4l2.28-2.22 4.47 3.3c.67.49 1.62.12 1.8-.72ZM8.52 13.51l8.95-5.65-6.85 6.61-.27 2.88Z" />
    </svg>
  );
}

function SnapchatIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.5c2.75 0 4.98 2.13 4.98 4.76v2.24c0 .42.2.8.55 1.03.35.22.78.38 1.3.48.53.1.72.76.27 1.12-.74.6-1.44.93-2.11 1a5.2 5.2 0 0 1-3.76 3.1l-.22 1.12.98.4c.4.16.68.53.73.96l.02.19h-5.48l.02-.19c.05-.43.34-.8.73-.96l.98-.4-.22-1.12a5.2 5.2 0 0 1-3.76-3.1c-.67-.07-1.37-.4-2.11-1-.45-.36-.26-1.02.27-1.12.52-.1.95-.26 1.3-.48.35-.23.55-.61.55-1.03V7.26C7.02 4.63 9.25 2.5 12 2.5Z" />
    </svg>
  );
}

function DiscordIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.54 5.17A16.8 16.8 0 0 0 15.4 4l-.2.4a11 11 0 0 1 3.15 1.2 12.14 12.14 0 0 0-6.35-1.6 12.14 12.14 0 0 0-6.35 1.6A11 11 0 0 1 8.8 4.4L8.6 4a16.8 16.8 0 0 0-4.14 1.17C1.84 9.07 1.1 12.83 1.47 16.55A16.98 16.98 0 0 0 6.55 19l1.1-1.8c-.62-.23-1.2-.52-1.73-.88.15.11.3.22.46.32 1.57.96 3.4 1.46 5.62 1.46s4.05-.5 5.62-1.46c.16-.1.31-.2.46-.32-.53.36-1.11.65-1.73.88l1.1 1.8a16.98 16.98 0 0 0 5.08-2.45c.43-4.32-.73-8.04-2.99-11.38ZM9.55 14.42c-.72 0-1.3-.66-1.3-1.47 0-.81.57-1.47 1.3-1.47.73 0 1.31.66 1.3 1.47 0 .81-.57 1.47-1.3 1.47Zm4.9 0c-.72 0-1.3-.66-1.3-1.47 0-.81.57-1.47 1.3-1.47.73 0 1.31.66 1.3 1.47 0 .81-.57 1.47-1.3 1.47Z" />
    </svg>
  );
}

function GithubIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.21.68-.48v-1.68c-2.77.6-3.35-1.17-3.35-1.17-.46-1.15-1.11-1.45-1.11-1.45-.9-.62.07-.61.07-.61 1 .07 1.52 1.03 1.52 1.03.89 1.52 2.33 1.08 2.9.82.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.95 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03a9.44 9.44 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.39.2 2.42.1 2.67.64.7 1.03 1.6 1.03 2.7 0 3.85-2.33 4.7-4.56 4.95.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function BehanceIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M4 6h6.1c2.47 0 4.06 1.26 4.06 3.3 0 1.41-.7 2.4-1.93 2.82 1.64.33 2.58 1.58 2.58 3.42 0 2.38-1.88 3.96-4.73 3.96H4Zm3 4.77h2.5c1.02 0 1.64-.53 1.64-1.4 0-.85-.62-1.35-1.64-1.35H7Zm0 5.03h2.93c1.16 0 1.82-.56 1.82-1.57 0-.98-.66-1.54-1.82-1.54H7ZM16.4 7.4h4.9v1.4h-4.9Zm5.16 7.15c-.17 2.78-2.05 4.53-4.96 4.53-3.08 0-5.05-1.97-5.05-5.1 0-3.08 2-5.18 4.95-5.18 2.88 0 4.8 1.94 4.8 4.88v.87h-6.75c.06 1.34.83 2.16 2.02 2.16.93 0 1.55-.42 1.78-1.16Zm-4.99-3.44c-1.01 0-1.73.72-1.92 1.93h3.78c-.12-1.2-.8-1.93-1.86-1.93Z" />
    </svg>
  );
}

function DribbbleIcon({ className }: SocialIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm6.67 4.42a8.02 8.02 0 0 1 1.67 4.9c-1.44-.28-2.9-.43-4.37-.44a18.08 18.08 0 0 0-1-2.1 20.11 20.11 0 0 0 3.7-2.36ZM12 3.67a8.3 8.3 0 0 1 5.3 1.9 18.44 18.44 0 0 1-3.18 2.01A41.2 41.2 0 0 0 10.89 4a8.16 8.16 0 0 1 1.11-.33Zm-3.02.91c1.18 1.42 2.2 2.9 3.05 4.45-3 .82-6 1.24-9.11 1.26A8.35 8.35 0 0 1 8.98 4.58ZM3.67 12v-.05c3.47-.03 6.84-.53 10.15-1.48.19.37.37.74.54 1.12l-.26.07c-5 1.54-7.64 4.64-8.5 5.79A8.28 8.28 0 0 1 3.67 12Zm3.12 6.64c.66-.93 2.98-3.65 7.1-5.04.07-.02.13-.04.2-.05.5 1.44.88 2.91 1.12 4.4A8.3 8.3 0 0 1 6.79 18.64Zm10.03-1.83a24.25 24.25 0 0 0-1.03-4.01c1.22-.14 2.44-.1 3.65.11a8.36 8.36 0 0 1-2.62 3.9Z" />
    </svg>
  );
}

const SOCIAL_ICONS = {
  instagram: InstagramIcon,
  x: XIcon,
  twitter: XIcon,
  linkedin: LinkedInIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  tiktok: TikTokIcon,
  telegram: TelegramIcon,
  snapchat: SnapchatIcon,
  discord: DiscordIcon,
  github: GithubIcon,
  behance: BehanceIcon,
  dribbble: DribbbleIcon,
} as const;

function normalizePlatformKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function renderPlatformIcon(platform: FooterPlatform) {
  const normalizedName = normalizePlatformKey(platform.name);

  if (normalizedName in SOCIAL_ICONS) {
    const Icon = SOCIAL_ICONS[normalizedName as keyof typeof SOCIAL_ICONS];
    return <Icon className="size-4 shrink-0" aria-hidden="true" />;
  }

  try {
    const hostname = new URL(platform.url).hostname.toLowerCase().replace(/^www\./, "");

    if (hostname.includes("instagram")) {
      return <InstagramIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("x.com") || hostname.includes("twitter")) {
      return <XIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("linkedin")) {
      return <LinkedInIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("wa.me") || hostname.includes("whatsapp")) {
      return <WhatsAppIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("facebook") || hostname.includes("fb.")) {
      return <FacebookIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("youtu")) {
      return <YouTubeIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("tiktok")) {
      return <TikTokIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("telegram") || hostname.includes("t.me")) {
      return <TelegramIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("snapchat")) {
      return <SnapchatIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("discord")) {
      return <DiscordIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("github")) {
      return <GithubIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("behance")) {
      return <BehanceIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
    if (hostname.includes("dribbble")) {
      return <DribbbleIcon className="size-4 shrink-0" aria-hidden="true" />;
    }
  } catch {
    return <ExternalLink size={14} className="size-4 shrink-0" aria-hidden="true" />;
  }

  return <ExternalLink size={14} className="size-4 shrink-0" aria-hidden="true" />;
}

function PlatformLink({ platform }: { platform: FooterPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={platform.name}
      title={platform.name}
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
    >
      {renderPlatformIcon(platform)}
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
