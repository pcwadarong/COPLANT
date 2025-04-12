'use client';

import { useRouter } from 'next/navigation';

export default function AddProductButton() {
  const router = useRouter();

  return (
    <button
      className="hover:underline text-sm"
      onClick={() => router.push('/admin/product/new')}
    >
      신제품 등록하기
    </button>
  );
}
