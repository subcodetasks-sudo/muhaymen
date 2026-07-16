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
  images: CmsImage[];
  section: HeroWhatsAppSection;
  sortOrder: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type HeroContentResponse = ApiResponse<HeroContent>;

export type AboutImage = {
  url: string | null;
  text: string;
};

export type AboutItem = {
  text: string;
};

export type AboutContent = {
  id: number;
  title: string;
  description: string;
  content: string;
  seo: CmsSeo;
  image: AboutImage;
  items: AboutItem[];
  sortOrder: number;
};

export type AboutContentResponse = ApiResponse<AboutContent>;

export type CmsServiceItem = {
  image: CmsImage | null;
  title: string;
  description: string;
  meta_title: string;
  meta_description: string;
};

export type ServicesContent = {
  id: number;
  title: string;
  description: string;
  seo: CmsSeo;
  services: CmsServiceItem[];
  sortOrder: number;
};

export type ServicesContentResponse = ApiResponse<ServicesContent>;

export type WorkImage = {
  url: string | null;
  text: string;
};

export type WorkItem = {
  slug: string;
  title: string;
  description: string;
  image: WorkImage;
};

export type WorkCategory = {
  title: string;
  works: WorkItem[];
};

export type WorksContent = {
  id: number;
  title: string;
  description: string;
  seo: CmsSeo;
  categories: WorkCategory[];
  sortOrder: number;
};

export type WorksContentResponse = ApiResponse<WorksContent>;

export type WorkWithCategory = WorkItem & {
  categoryTitle: string;
};

export type WorkDetailCategory = {
  title: string;
};

export type WorkDetail = {
  slug: string;
  title: string;
  description: string;
  image: WorkImage;
  category: WorkDetailCategory;
  seo: CmsSeo;
};

export type WorkDetailResponse = ApiResponse<WorkDetail>;

export type CmsClientItem = {
  image: CmsImage | null;
  title: string;
  description: string;
  content: string;
};

export type CmsStatItem = {
  value: string;
  label: string;
};

export type ClientsContent = {
  id: number;
  title: string;
  description: string;
  content: string;
  seo: CmsSeo;
  clients: CmsClientItem[];
  stats: CmsStatItem[];
  sortOrder: number;
};

export type ClientsContentResponse = ApiResponse<ClientsContent>;

export type CmsMethodologyStep = {
  name: string;
  title: string;
  description: string;
};

export type MethodologyContent = {
  id: number;
  title: string;
  description: string;
  content: string;
  seo: CmsSeo;
  steps: CmsMethodologyStep[];
  sortOrder: number;
};

export type MethodologyContentResponse = ApiResponse<MethodologyContent>;

export type ArticleImage = {
  url: string | null;
  text: string;
};

export type ArticleItem = {
  slug: string;
  title: string;
  description: string;
  image: ArticleImage;
};

export type ArticleCategory = {
  title: string;
  articles: ArticleItem[];
};

export type ArticlesContent = {
  id: number;
  title: string;
  description: string;
  seo: CmsSeo;
  categories: ArticleCategory[];
  sortOrder: number;
};

export type ArticlesContentResponse = ApiResponse<ArticlesContent>;

export type ArticleWithCategory = ArticleItem & {
  categoryTitle: string;
};

export type ArticleDetailCategory = {
  title: string;
};

export type ArticleDetail = {
  slug: string;
  title: string;
  description: string;
  image: ArticleImage;
  category: ArticleDetailCategory;
  seo: CmsSeo;
};

export type ArticleDetailResponse = ApiResponse<ArticleDetail>;

export type FooterPlatform = {
  name: string;
  url: string;
};

export type FooterContent = {
  id: number;
  title: string;
  description: string;
  companyEmail: string;
  platforms: FooterPlatform[];
  sortOrder: number;
};

export type FooterContentResponse = ApiResponse<FooterContent>;

