import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("LandingPage.footer");

  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="container mx-auto max-w-6xl text-center">
        <p className="text-sm text-muted-foreground">{t("copyright")}</p>
      </div>
    </footer>
  );
}
