import { Suspense } from 'react';
import Filter from '@/components/filter';
import SearchBar from '@/components/common/searchBar';
// import plantData from './../../../../plant.json';
import { getProductList } from '@/lib/firebase/product/get';
import { ProductLightProperties } from '@/types';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // const rawList = plantData;
  let rawList: ProductLightProperties[] = [];

  try {
    rawList = await getProductList();
  } catch (error) {
    return (
      <div className="p-10 text-red-600">
        오류 발생: {(error as Error).message}
      </div>
    );
  }

  const resolvedParams = await searchParams;
  const { q } = resolvedParams;

  const activeFilters: Record<string, string[]> = {};
  Object.entries(resolvedParams).forEach(([key, value]) => {
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
            <ul>
              {filteredList.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </Suspense>
        </section>
      </main>
    </>
  );
}

export const dynamic = 'force-static';
