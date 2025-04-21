'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/common/button';
import { ProductPreview } from '@/types';

export default function ResultProduct(result: ProductPreview) {
  const router = useRouter();

  return (
    <div className="relative z-10 flex flex-col items-center gap-8">
      <Image
        src="/test-main.svg"
        alt="green shape"
        aria-hidden="true"
        width={600}
        height={600}
      />
      <h1>{result.name}</h1>
      <Image
        src={result.imageUrls.cover}
        alt="green shape"
        aria-hidden="true"
        width={600}
        height={600}
      />
      <div className="flex gap-4">
        <CustomButton
          onClick={() => router.push('/test')}
          className="bg-apricot-100"
          aria-label="반려식물 테스트하러 가기"
        >
          테스트하기
        </CustomButton>
        <CustomButton
          className="bg-apricot-100"
          onClick={() => router.push('/product')}
          aria-label="반려식물 제품 보러 가기"
        >
          제품 보기
        </CustomButton>
      </div>
    </div>
  );
}
