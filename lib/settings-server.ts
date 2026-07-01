import type { AppSettings } from "@/lib/settings";

// Temporary: skip API fetch to isolate settings-related errors.
const DEFAULT_APP_SETTINGS: AppSettings = {
  app_name: "مهيمين",
  app_name_en: "Muhaymin",
  contact_email: "info@muhaymin.com",
  contact_phone: "+966500000000",
  default_locale: "ar",
  default_currency: "SAR",
  maintenance_mode: false,
  supported_currencies: ["SAR"],
  logo: null,
};

export async function getAppSettings() {
  return DEFAULT_APP_SETTINGS;
}