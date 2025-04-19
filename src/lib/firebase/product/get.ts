import { adminFirestore } from '@/lib/firebase/firebaseAdminConfig';
import { FirebaseError } from 'firebase/app';
import { ProductPreview, ProductProperties } from '@/types';

export async function getProductList(): Promise<ProductPreview[]> {
  try {
    const snap = await adminFirestore.collection('plants').get();

    if (snap.empty) {
      return [];
    }

    const plants = snap.docs.map((doc) => {
      const data = doc.data() as ProductPreview;
      return {
        id: doc.id,
        name: data.name,
        filters: data.filters,
        description: data.description,
        price: data.price,
        imageUrls: data.imageUrls,
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

export async function getProductName() {
  try {
    const snap = await adminFirestore.collection('plants').get();

    if (snap.empty) {
      return [];
    }

    const plants = snap.docs.map((doc) => {
      const data = doc.data() as ProductPreview;
      return {
        id: doc.id,
        name: data.name,
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

export async function getProductDetail(id: string): Promise<ProductProperties> {
  try {
    const docRef = adminFirestore.collection('plants').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      throw new Error(`상품이 존재하지 않습니다.`);
    }

    const data = docSnap.data() as ProductProperties;

    return {
      ...data,
      id: docSnap.id,
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      throw new Error(`Firebase loading error: ${err.code}`);
    }
    throw new Error(`Firebase loading failed: ${(err as Error).message}`);
  }
}
