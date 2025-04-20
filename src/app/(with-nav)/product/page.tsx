import { Suspense } from 'react';

import SearchBar from '@/components/common/searchbar';
import { ListItem } from './list-item';
import Filter from './filter';

import { getActiveFilters, getFilteredList } from '@/lib/utils/filters';
import { getProductList } from '@/lib/firebase/product/get';
import { ProductPreview } from '@/types';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; [key: string]: string | undefined }>;
}) {
  try {
    const rawList: ProductPreview[] = await getProductList();
    const resolvedParams = await searchParams;
    const { q = '' } = resolvedParams;
    const activeFilters = getActiveFilters(resolvedParams);
    const filteredList = getFilteredList(rawList, q, activeFilters);
    return (
      <>
        <SearchBar />
        <main className="min-h-screen p-6 flex mb-6">
          <aside className="w-fit pr-10">
            <h2 className="font-english font-bold text-3xl">Filter</h2>
            <Filter />
          </aside>
          <section
            aria-labelledby="result-heading"
            className="flex flex-1 justify-center"
          >
            <h1 id="result-heading" className="sr-only">
              검색 결과
            </h1>
            <Suspense fallback={<div role="status">로딩 중...</div>}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16">
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
