import type { ArticleItem, CmsServiceItem } from "../types";

export function getServiceFavoriteId(
  service: Pick<CmsServiceItem, "image">,
  index: number,
): string {
  const url = service.image?.url?.trim();
  if (url) return `s:img:${url}`;
  return `s:idx:${index}`;
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

export function isStableFavoriteId(value: string): boolean {
  return /^(s|a):(img|idx|slug):/.test(value);
}
