import { cacheLife, cacheTag } from "next/cache";
import { fetchApi } from "@/lib/api";
import { parseAppSettings, type SettingsResponse } from "@/lib/settings";

export async function getAppSettings() {
  "use cache";
  cacheLife("minutes");
  cacheTag("app-settings");

  const response = await fetchApi<SettingsResponse>("/auth/settings");

  return parseAppSettings(response.data);
}
