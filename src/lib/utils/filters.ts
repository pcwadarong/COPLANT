import { ProductPreview } from '@/types';

export function getActiveFilters(params: Record<string, string | undefined>) {
  const filters: Record<string, string[]> = {};

  for (const [key, value] of Object.entries(params)) {
    if (key !== 'q' && value) {
      filters[key] = value.split(',').map((v) => v.trim());
    }
  }

  return filters;
}

export function getFilteredList(
  list: ProductPreview[],
  query: string,
  filters: Record<string, string[]>,
) {
  const lowerQuery = query.toLowerCase();

  return list.filter((item) => {
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(lowerQuery) ||
      item.description?.toLowerCase().includes(lowerQuery);

    const matchesFilters = Object.entries(filters).every(([key, values]) => {
      const typedKey = key as keyof typeof item.filters;
      const itemValue = item.filters?.[typedKey];
      if (!itemValue) return false;

      const itemValues = String(itemValue)
        .split(',')
        .map((v) => v.trim());
      return values.some((v) => itemValues.includes(v));
    });

    return matchesSearch && matchesFilters;
  });
}
