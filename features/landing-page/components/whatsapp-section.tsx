import { getTranslations } from "next-intl/server";
import { WHATSAPP_KEYS } from "../lib/constants";
import type { WhatsAppConversation } from "../types";
import { ScrollAnimationWrapper } from "@/components/scroll-animation-wrapper";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-green-600"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export async function WhatsAppSection() {
  const t = await getTranslations("LandingPage.whatsapp");

  const conversations = WHATSAPP_KEYS.map(
    (key) => t.raw(`conversations.${key}`) as WhatsAppConversation,
  );

  return (
    <section className="px-6 py-24">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimationWrapper type="fade-up" threshold={0.2}>
          <div className="mb-16 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
              <WhatsAppIcon />
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

        <div className="grid gap-8 md:grid-cols-3">
          {conversations.map((conversation, index) => (
            <ScrollAnimationWrapper
              key={conversation.clientName}
              type="fade-up"
              delay={index * 0.1}
              threshold={0.15}
            >
              <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-lg">
                <div className="flex items-center gap-3 bg-[#075E54] px-5 py-4 text-white">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {conversation.clientName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{conversation.clientName}</div>
                    <div className="text-xs text-green-200">{t("online")}</div>
                  </div>
                </div>

                <div className="space-y-3 bg-[#ECE5DD] p-4">
                  {conversation.messages.map((message, idx) => (
                    <div
                      key={`${conversation.clientName}-${idx}`}
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        message.sender === "client"
                          ? "ms-auto rounded-te-sm bg-white text-foreground shadow-sm"
                          : "rounded-ts-sm bg-[#DCF8C6] text-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 border-t border-border bg-white px-4 py-3">
                  <div className="flex-1 rounded-full bg-muted px-4 py-2 text-sm text-muted-foreground">
                    {t("inputPlaceholder")}
                  </div>
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}

