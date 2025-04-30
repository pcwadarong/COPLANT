import { Suspense } from 'react';

import { getProductDetail } from '@/lib/firebase/product/get';
import { ProductProperties } from '@/types';

import EditProductPage from './edit-form';

export default async function EditProduct({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data: ProductProperties = await getProductDetail(id);

    return (
      <Suspense fallback={<div role="status">로딩 중...</div>}>
        <EditProductPage product={data} />
      </Suspense>
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

    return (
      <div className="p-10 text-red-600" role="alert">
        상품 정보를 불러오지 못했습니다: {message}
      </div>
    );
  }
}
