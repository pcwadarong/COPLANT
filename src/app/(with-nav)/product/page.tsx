import { Suspense } from 'react';

import SearchBar from '@/components/common/searchBar';
import { ListItem } from './list-item';
import Filter from './filter';

// import plantData from './../../../../plant.json';
import { getActiveFilters, getFilteredList } from '@/lib/utils/filters';
import { getProductList } from '@/lib/firebase/product/get';
import { ProductPreview } from '@/types';

export const dynamic = 'force-static';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; [key: string]: string | undefined }>;
}) {
  // const rawList = plantData;
  try {
    const rawList: ProductPreview[] = await getProductList();
    const resolvedParams = await searchParams;
    const { q = '' } = resolvedParams;
    const activeFilters = getActiveFilters(resolvedParams);

    const filteredList = getFilteredList(rawList, q, activeFilters);

    return (
      <>
        <SearchBar />
        <main className="min-h-screen p-6 flex">
          <aside className="w-fit pr-10">
            <h2 className="font-english font-bold text-3xl">Filter</h2>
            <Filter />
          </aside>
          <section aria-labelledby="result-heading">
            <h1 id="result-heading" className="sr-only">
              검색 결과
            </h1>
            <Suspense fallback={<div role="status">로딩 중...</div>}>
              <ul>
                {filteredList.map((item) => (
                  <ListItem key={item.id} {...item} />
                ))}
              </ul>
            </Suspense>
          </section>
        </main>
      </>
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

    return (
      <div className="p-10 text-red-600" role="alert">
        오류 발생: {message}
      </div>
    );
  }
}
