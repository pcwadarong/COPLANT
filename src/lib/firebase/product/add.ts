import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { storage, firestore } from '@/lib/firebase/firebaseConfig';

import imageCompression from 'browser-image-compression';

import { ProductProperties } from '@/types';

export async function addProduct(product: ProductProperties) {
  await setDoc(doc(firestore, 'plants', product.id), product);
}

export async function uploadProductImages(productId: string, files: File[]) {
  const types = ['list', 'cover', 'detail1', 'detail2', 'detail3'];
  const urls: Record<string, string> = {};

  await Promise.all(
    files.map(async (file, index) => {
      const path = `products/${productId}/${types[index]}.jpg`;
      const fileRef = ref(storage, path);

      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      await uploadBytes(fileRef, compressed);
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
