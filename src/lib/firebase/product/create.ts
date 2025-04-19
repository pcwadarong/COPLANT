import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebaseConfig';
import { adminFirestore } from '../firebaseAdminConfig';

import {
  ProductProperties,
  ProductImageURLs,
} from '@/types';

export async function createProduct(product: ProductProperties) {
  await adminFirestore.collection('plants').doc(product.id).set(product);
}

export async function uploadProductImagesForCreate(
  productId: string,
  files: {
    list: File;
    cover: File;
    details: [File, File, File];
  },
): Promise<ProductImageURLs> {
  const getUrl = async (path: string, file: File) => {
    const refPath = ref(storage, path);
    await uploadBytes(refPath, file);
    return await getDownloadURL(refPath);
  };

  const [list, cover, ...details] = await Promise.all([
    getUrl(`products/${productId}/list.jpg`, files.list),
    getUrl(`products/${productId}/cover.jpg`, files.cover),
    ...files.details.map((f, i) =>
      getUrl(`products/${productId}/detail${i + 1}.jpg`, f),
    ),
  ]);

  return {
    list,
    cover,
    details,
  };
}

