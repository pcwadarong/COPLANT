'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import deleteProduct from '@/lib/firebase/product/delete';

import { ProductPreview } from '@/types';

export default function AdminProductListItem({
  id,
  name,
  price,
}: ProductPreview) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteClick = async () => {
    if (!id || !confirm('정말 삭제할까요?')) return;

    setDeleting(true);
    try {
      await deleteProduct(id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('삭제 실패');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <li className="flex text-sm items-center">
      <span className="flex-8 p-3">{name}</span>
      <span className="flex-1 p-3 text-center border-x">
        {price!.toLocaleString('ko-KR')}
      </span>
      <div className="flex-1 flex justify-center gap-2 p-3">
        <button
          type="button"
          onClick={() => router.push(`/admin/product/${id}/edit`)}
          className="text-green-900 hover:underline"
          aria-label={`${name} 수정`}
        >
          수정
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={deleting}
          className="text-apricot-600 hover:underline"
          aria-label={`${name} 삭제`}
        >
          {deleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </li>
  );
}
