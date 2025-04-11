'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import deleteProduct from '@/lib/firebase/product/delete';

import { ProductLightProperties } from '@/types';

export default function AdminProductListItem({
  id,
  name,
}: ProductLightProperties) {
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
    <li className="mb-4 flex justify-between">
      <h3 className="text-lg font-semibold">{name}</h3>
      <div className="mt-2 flex gap-2">
        <button
          type="button"
          onClick={() => router.push(`/admin/products/${id}/edit`)}
          aria-label={`${name} 수정`}
        >
          수정
        </button>
        <button
          type="button"
          onClick={handleDeleteClick}
          disabled={deleting}
          aria-label={`${name} 삭제`}
        >
          {deleting ? '삭제 중...' : '삭제'}
        </button>
      </div>
    </li>
  );
}
