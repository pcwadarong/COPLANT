import { Filter } from '@/components/filter';
import { ProductProperties } from '@/types';
import SearchBar from '@/components/searchBar';

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  //const { q } = await searchParams;
  const list = { name: '여인초', tags: '양지' };

  return (
    <>
      <SearchBar />
      <main className="min-h-screen p-6">
        <aside className='w-fit pr-10'>
          <h1 className="font-english font-bold text-3xl">Filter</h1>
          <Filter />
        </aside>
      </main>
    </>
  );
}

//<div>list page : {q}</div>
