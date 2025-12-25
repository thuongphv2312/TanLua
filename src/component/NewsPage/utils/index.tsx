import type { NewsItem } from "../type";

export const filterByCategory = (
  list: NewsItem[],
  categoryId: number | null
) => {
  if (!categoryId) return list;
  return list.filter((news) =>
    news.categories.includes(categoryId)
  );
};
