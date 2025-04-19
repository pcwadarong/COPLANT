import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebaseConfig';
import { adminFirestore } from '../firebaseAdminConfig';

import { ProductProperties } from '@/types';

export async function addProduct(product: ProductProperties) {
  await adminFirestore.collection('plants').doc(product.id).set(product);
}

export async function uploadProductImages(productId: string, files: File[]) {
  const types = ['list', 'cover', 'detail1', 'detail2', 'detail3'];
  const urls: Record<string, string> = {};

  await Promise.all(
    files.map(async (file, index) => {
      const path = `products/${productId}/${types[index]}.jpg`;
      const fileRef = ref(storage, path);

      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls[types[index]] = url;
    }),
  );

  return {
    list: urls.list,
    cover: urls.cover,
    detail: [urls.detail1, urls.detail2, urls.detail3],
  };
}
