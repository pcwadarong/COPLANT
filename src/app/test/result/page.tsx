import { Suspense } from 'react';

import Image from 'next/image';

import { getProductList } from '@/lib/firebase/product/get';
import { ProductPreview } from '@/types';

import TestResultClient from './result-client';

export default async function TestResultPage() {
  const data: ProductPreview[] = await getProductList();

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <Image
        src="/test-result.svg"
        alt="background image"
        aria-hidden="true"
        fill
        className="object-cover z-0"
        priority
      />
      <Suspense fallback={<div>로딩 중...</div>}>
        <TestResultClient data={data} />
      </Suspense>
    </div>
  );
}
