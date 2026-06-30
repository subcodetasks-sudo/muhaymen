export type SectionId =
  | "hero"
  | "services"
  | "portfolio"
  | "clients"
  | "about"
  | "contact";

export type NavItem = {
  label: string;
  id: SectionId;
};

export type Service = {
  title: string;
  description: string;
  tag: string;
};

export type PortfolioItem = {
  title: string;
  category: string;
  result: string;
};

export type ClientStory = {
  name: string;
  sector: string;
  highlight: string;
  detail: string;
};

export type StatItem = {
  label: string;
  value: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  mobileDescription: string;
};

export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
};

export type ChatMessage = {
  sender: "client" | "agency";
  text: string;
};

export type WhatsAppConversation = {
  clientName: string;
  messages: ChatMessage[];
};

export type AppLocale = "ar" | "en";

export type TextDirection = "rtl" | "ltr";

export type LocaleProps = {
  locale: AppLocale;
  direction: TextDirection;
};

export type CmsImage = {
  url: string | null;
  alt: string;
};

export type CmsSeo = {
  title: string;
  description: string;
};

export type HeroWhatsAppSection = {
  title: string;
  description: string;
  content: string;
  images: CmsImage[];
};

export type HeroContent = {
  id: number;
  title: string;
  description: string;
  content: string;
  seo: CmsSeo;
  image: CmsImage;
  section: HeroWhatsAppSection;
  sortOrder: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type HeroContentResponse = ApiResponse<HeroContent>;
