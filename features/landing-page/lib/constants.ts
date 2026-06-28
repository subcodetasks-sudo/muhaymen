export const LOGO_PATH = "/landing/logo.webp";
export const ABOUT_US_IMAGE_PATH = "/landing/about-us.webp";

export const NAV_SECTION_IDS = [
  "hero",
  "services",
  "portfolio",
  "clients",
  "about",
] as const;

export const SERVICE_KEYS = [
  "content",
  "social",
  "branding",
  "ads",
  "seo",
  "video",
] as const;

export const STAT_KEYS = ["clients", "years", "campaigns", "satisfaction"] as const;

export const VALUE_KEYS = ["creativity", "data", "partnership", "results"] as const;

export const PROCESS_STEP_KEYS = ["01", "02", "03", "04", "05"] as const;

export const PROCESS_STEP_CONFIG: Record<
  (typeof PROCESS_STEP_KEYS)[number],
  { height: string; crown?: boolean }
> = {
  "01": { height: "h-[250px]" },
  "02": { height: "h-[290px]" },
  "03": { height: "h-[330px]" },
  "04": { height: "h-[380px]" },
  "05": { height: "h-[440px]", crown: true },
};

export const PORTFOLIO_KEYS = [
  "deliveryApp",
  "cafe",
  "fashion",
  "realEstate",
  "ramadan",
  "clinic",
  "logistics",
  "sports",
  "motion",
] as const;

export const PORTFOLIO_FILTER_KEYS = [
  "all",
  "social",
  "paidAds",
  "branding",
  "video",
  "content",
] as const;

export const PORTFOLIO_FILTER_BY_KEY: Record<
  (typeof PORTFOLIO_KEYS)[number],
  Exclude<(typeof PORTFOLIO_FILTER_KEYS)[number], "all">
> = {
  deliveryApp: "paidAds",
  cafe: "branding",
  fashion: "social",
  realEstate: "video",
  ramadan: "content",
  clinic: "paidAds",
  logistics: "branding",
  sports: "social",
  motion: "video",
};

export const PORTFOLIO_IMAGE_BY_KEY: Record<
  (typeof PORTFOLIO_KEYS)[number],
  string
> = {
  deliveryApp: "/landing/phone-store.webp",
  cafe: "/landing/coffee-store.webp",
  fashion: "/landing/clothing-store.webp",
  realEstate: "/landing/property.webp",
  ramadan: "/landing/restaurant.webp",
  clinic: "/landing/clinic-google-ads.webp",
  logistics: "/landing/logistics.webp",
  sports: "/landing/gym.webp",
  motion: "/landing/phone-store.webp",
};

export const CLIENT_KEYS = [
  "thooq",
  "noor",
  "lara",
  "masar",
  "reyada",
  "gulf",
] as const;

export const BLOG_KEYS = ["instagram", "ads", "branding"] as const;

export const WHATSAPP_KEYS = ["thooq", "lara", "masar"] as const;
