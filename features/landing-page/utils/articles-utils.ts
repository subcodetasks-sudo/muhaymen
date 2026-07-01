import type { ArticlesContent, ArticleWithCategory } from "../types";

export function getAllArticlesWithCategory(
  content: ArticlesContent,
): ArticleWithCategory[] {
  return content.categories.flatMap((category) =>
    category.articles.map((article) => ({
      ...article,
      categoryTitle: category.title,
    })),
  );
}

export function getFeaturedArticles(
  content: ArticlesContent,
  limit = 3,
): ArticleWithCategory[] {
  return getAllArticlesWithCategory(content).slice(0, limit);
}
