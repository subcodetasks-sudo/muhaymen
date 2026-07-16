import type { ArticleItem, CmsServiceItem } from "../types";
import { getServiceSlug } from "./service-cms";

export function getServiceFavoriteId(
  service: Pick<CmsServiceItem, "image" | "title">,
  index: number,
): string {
  const url = service.image?.url?.trim();
  if (url) return `s:img:${url}`;
  if (index >= 0) return `s:idx:${index}`;
  return `s:slug:${getServiceSlug(service.title)}`;
}

export function getArticleFavoriteId(
  article: Pick<ArticleItem, "image" | "slug">,
  index = -1,
): string {
  const url = article.image?.url?.trim();
  if (url) return `a:img:${url}`;
  if (index >= 0) return `a:idx:${index}`;
  return `a:slug:${article.slug}`;
}

/** All ids that could represent this service in localStorage (current + legacy). */
export function getServiceFavoriteKeys(
  service: Pick<CmsServiceItem, "image" | "title">,
  index: number,
  extraAliases: Array<string | undefined> = [],
): { id: string; aliases: string[] } {
  const slug = getServiceSlug(service.title);
  const url = service.image?.url?.trim();
  const keys = [
    url ? `s:img:${url}` : undefined,
    index >= 0 ? `s:idx:${index}` : undefined,
    slug ? `s:slug:${slug}` : undefined,
    slug,
    ...extraAliases,
  ].filter((value): value is string => Boolean(value));

  const unique = [...new Set(keys)];
  const id = unique[0] ?? `s:idx:${Math.max(index, 0)}`;
  return { id, aliases: unique.filter((key) => key !== id) };
}

/** All ids that could represent this article in localStorage (current + legacy). */
export function getArticleFavoriteKeys(
  article: Pick<ArticleItem, "image" | "slug">,
  index = -1,
  extraAliases: Array<string | undefined> = [],
): { id: string; aliases: string[] } {
  const url = article.image?.url?.trim();
  const keys = [
    url ? `a:img:${url}` : undefined,
    index >= 0 ? `a:idx:${index}` : undefined,
    article.slug ? `a:slug:${article.slug}` : undefined,
    article.slug,
    ...extraAliases,
  ].filter((value): value is string => Boolean(value));

  const unique = [...new Set(keys)];
  const id = unique[0] ?? `a:slug:${article.slug}`;
  return { id, aliases: unique.filter((key) => key !== id) };
}

export function isStableFavoriteId(value: string): boolean {
  return /^(s|a):(img|idx|slug):/.test(value);
}
