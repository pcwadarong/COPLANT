import { Suspense } from 'react';

import type { Metadata } from 'next';

import { getProductDetail } from '@/lib/firebase/product/get';

import FloatingImage from './floating-image';
import ProductMainSection from './main-section';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = await getProductDetail(id);

  if (!data) {
    throw new Error('정보를 불러오지 못했습니다.');
  }

  const { name, description, imageUrls } = data;

  return {
    title: `${name} : 한입 북스`,
    description,
    openGraph: {
      title: `${name} : 한입 북스`,
      description,
      images: [imageUrls.details[0]],
    },
  };
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getProductDetail(id);

  if (!data) {
    return (
      <div className="p-10 text-red-600" role="alert">
        상품 정보를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div role="status" aria-live="polite">
          로딩 중...
        </div>
      }
    >
      <main className="relative bg-green-200">
        <FloatingImage />
        <ProductMainSection data={data} />
      </main>
    </Suspense>
  );
}
