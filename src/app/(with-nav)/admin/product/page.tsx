import { getProductList } from '@/lib/firebase/product/get';
import AdminProductListItem from './admin-product';

import { ProductLightProperties } from '@/types';

export default async function AdminProductListPage() {
  try {
    const list: ProductLightProperties[] = await getProductList();

    return (
      <section className="p-4 max-w-3xl m-auto" aria-labelledby="admin-product-list-heading">
        <h2 id="admin-product-list-heading" className='font-bold text-2xl'>
          등록된 상품 목록
        </h2>
        <ul className='border p-4 mt-8'>
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
