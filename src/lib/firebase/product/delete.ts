import { FirebaseError } from 'firebase/app';
import { deleteDoc, doc } from 'firebase/firestore';

import { firestore } from '@/lib/firebase/firebaseConfig';

export default async function deleteProduct(id: string) {
  if (!id)
    return {
      status: false,
      error: '삭제할 상품이 없습니다.',
    };

  try {
    await deleteDoc(doc(firestore, 'plants', id));

    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.NEXT_PUBLIC_REVALIDATE_SECRET,
        paths: ['/(with-nav)'],
      }),
    });

    return {
      status: true,
      error: '',
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw new Error(`Firebase loading failed: ${(err as Error).message}`);
  }
}
