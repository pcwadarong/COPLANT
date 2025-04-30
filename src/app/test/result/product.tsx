'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import CustomButton from '@/components/common/button';
import { ProductPreview } from '@/types';

export default function ResultProduct(result: ProductPreview) {
  const router = useRouter();

  return (
    <div className="relative z-10 w-full h-ful flex flex-col justify-center items-center">
      <Image
        src="/test-main.svg"
        alt="green shape"
        aria-hidden="true"
        width={600}
        height={600}
        className="-z-10 absolute"
      />
      <div className="relative flex flex-col items-center justify-center h-[500px] mt-38">
        <h1 className="text-2xl font-bold absolute top-0">{result.name}</h1>
        <Image
          src={result.imageUrls.cover}
          alt={result.name}
          width={200}
          height={200}
          priority
        />
      </div>

      <div className="mt-8 space-x-4">
        <CustomButton
          onClick={() => router.push('/')}
          className="text-sm xs:text-base bg-apricot-100 whitespace-nowrap"
          aria-label="메인 홈으로 돌아가기"
        >
          돌아가기
        </CustomButton>
        <CustomButton
          className="text-sm xs:text-base bg-apricot-100 whitespace-nowrap"
          onClick={() => router.push(`/product/${result.id}`)}
          aria-label="선택한 반려식물 제품 보러 가기"
        >
          제품보기
        </CustomButton>
      </div>
    </div>
  );
}
