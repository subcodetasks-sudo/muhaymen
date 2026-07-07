import type { WorksContent, WorkWithCategory } from "../types";

const ALL_WORKS_FILTER = "all" as const;

export type WorksFilter = typeof ALL_WORKS_FILTER | string;

export function getWorksFilterOptions(content: WorksContent): WorksFilter[] {
  return [
    ALL_WORKS_FILTER,
    ...content.categories.map((category) => category.title),
  ];
}

export function getAllWorksWithCategory(
  content: WorksContent,
): WorkWithCategory[] {
  return content.categories.flatMap((category) =>
    category.works.map((work) => ({
      ...work,
      categoryTitle: category.title,
    })),
  );
}

export function getFeaturedWorks(
  content: WorksContent,
  limit: number,
): WorkWithCategory[] {
  return getAllWorksWithCategory(content).slice(0, limit);
}

export function getFilteredWorks(
  content: WorksContent,
  activeFilter: WorksFilter,
): WorkWithCategory[] {
  if (activeFilter === ALL_WORKS_FILTER) {
    return getAllWorksWithCategory(content);
  }

  const category = content.categories.find(
    (item) => item.title === activeFilter,
  );

  if (!category) {
    return [];
  }

  return category.works.map((work) => ({
    ...work,
    categoryTitle: category.title,
  }));
}
