import { getProductList } from '@/lib/firebase/product/get';
import AdminProductListItem from './admin-product';

import { ProductLightProperties } from '@/types';

export default async function AdminProductListPage() {
  try {
    const list: ProductLightProperties[] = await getProductList();

    return (
      <section
        className="sm:h-screen flex flex-col max-w-3xl mx-auto mb-10 px-4 sm:px-0"
        aria-labelledby="admin-product-list-heading"
      >
        <h2
          id="admin-product-list-heading"
          className="font-bold text-2xl mt-10 mb-4 flex-shrink-0"
        >
          등록된 상품 목록
        </h2>

        <ul className="overflow-y-auto border divide-y">
          <li className="flex bg-apricot-300 font-semibold text-sm">
            <span className="flex-8 p-3">상품명</span>
            <span className="flex-1 p-3 text-center border-l">가격</span>
            <span className="flex-1 p-3 text-center border-l">관리</span>
          </li>
          {list.map((item) => (
            <AdminProductListItem key={item.id} {...item} />
          ))}
        </ul>
      </section>
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
