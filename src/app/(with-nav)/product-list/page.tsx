import { Suspense } from 'react';
import Filter from '@/components/filter';
import SearchBar from '@/components/searchBar';
import plantData from './../../../../plant.json';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  //const rawList = await getProductList();
  const rawList = plantData;

  const activeFilters: Record<string, string[]> = {};
  Object.entries(searchParams).forEach(([key, value]) => {
    if (key !== 'q' && value) {
      activeFilters[key] = value.split(',');
    }
  });

  const filteredList = rawList.filter((item) => {
    // 1. 검색어 필터
    const matchSearch = q
      ? item.name?.toLowerCase().includes(q.toLowerCase()) ||
        item.description?.toLowerCase().includes(q.toLowerCase())
      : true;

    // 2. 필터 조건
    const matchFilters = Object.entries(activeFilters).every(
      ([key, values]) => {
        const typedKey = key as keyof typeof item.filters;

        const itemValue = item.filters?.[typedKey];
        if (!itemValue) return false;

        const itemValueList = String(itemValue)
          .split(',')
          .map((v) => v.trim());
        return values.some((v) => itemValueList.includes(v));
      },
    );
    return matchSearch && matchFilters;
  });

  return (
    <>
      <SearchBar />
      <main className="min-h-screen p-6 flex">
        <aside className="w-fit pr-10">
          <h1 className="font-english font-bold text-3xl">Filter</h1>
          <Filter />
        </aside>
        <section>
          <Suspense fallback={<div>loading..</div>}>
            {filteredList.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </Suspense>
        </section>
      </main>
    </>
  );
}
