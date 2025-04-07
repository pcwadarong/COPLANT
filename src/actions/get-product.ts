import { adminFirestore } from '@/lib/firebase-admin';
import { FirebaseError } from 'firebase/app';
import { ProductProperties } from '@/types';

export async function getProductList(): Promise<ProductProperties[]> {
  try {
    const snap = await adminFirestore.collection('plants').get();

    if (snap.empty) {
      return [];
    }

    const plants = snap.docs.map((doc) => {
      const data = doc.data() as ProductProperties;
      return {
        id: doc.id,
        ...data,
      };
    });

    return plants;
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw new Error(`Firebase loading failed: ${(err as Error).message}`);
  }
}
