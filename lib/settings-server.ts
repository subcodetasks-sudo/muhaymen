import { fetchApi } from "@/lib/api";
import { parseAppSettings, type SettingsResponse } from "@/lib/settings";

export async function getAppSettings() {

  const response = await fetchApi<SettingsResponse>("/auth/settings");

  return parseAppSettings(response.data);
}
