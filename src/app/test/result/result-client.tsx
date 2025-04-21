'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBestMatchedProduct } from '@/lib/utils/get-matched-product';
import { ProductPreview } from '@/types';
import ResultProduct from './product';

export default function TestResultClient({ data }: { data: ProductPreview[] }) {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ProductPreview | null>(null);

  useEffect(() => {
    const encoded = searchParams.get('answers');
    if (!encoded) return;

    try {
      const answers = JSON.parse(decodeURIComponent(encoded));
      const matched = getBestMatchedProduct(data, answers);
      setResult(matched);
    } catch (e) {
      console.error('파싱 실패:', e);
    }
  }, [searchParams, data]);

  if (!result) {
    return (
      <div>
        <h1>이런! 맞는 상품이 없습니다. 다시 시도해보세요.</h1>
        <button onClick={() => (location.href = '/test')}>재시도하기</button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <ResultProduct {...result} />
    </div>
  );
}
          