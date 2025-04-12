import { adminFirestore } from '@/lib/firebase/firebaseAdminConfig';
import { FirebaseError } from 'firebase/app';
import { ProductLightProperties } from '@/types';

export async function getProductList(): Promise<ProductLightProperties[]> {
  try {
    const snap = await adminFirestore.collection('plants').get();

    if (snap.empty) {
      return [];
    }

    const plants = snap.docs.map((doc) => {
      const data = doc.data() as ProductLightProperties;
      return {
        id: doc.id,
        name: data.name,
        filters: data.filters,
        description: data.description,
        price: data.price,
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
