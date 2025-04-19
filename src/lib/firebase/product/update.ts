import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase/firebaseConfig';
import { adminFirestore } from '../firebaseAdminConfig';

import {
  ProductProperties,
  PartialProductImageURLs,
  PartialProductImageFiles,
} from '@/types';

export async function updateProduct(updateFields: Partial<ProductProperties>) {
  const { id, ...fieldsToUpdate } = updateFields;
  if (!id) throw new Error('문서 ID(id)가 없습니다.');
  await adminFirestore.collection('plants').doc(id).update(fieldsToUpdate);
}

export async function uploadProductImagesForUpdate(
  productId: string,
  files: PartialProductImageFiles,
): Promise<PartialProductImageURLs> {
  const urls: PartialProductImageURLs = {};

  const uploadAndGetUrl = async (file: File, path: string) => {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const tasks: Promise<void>[] = [];

  if (files.list) {
    tasks.push(
      uploadAndGetUrl(files.list, `products/${productId}/list.jpg`).then(
        (url) => {
          urls.list = url;
        },
      ),
    );
  }

  if (files.cover) {
    tasks.push(
      uploadAndGetUrl(files.cover, `products/${productId}/cover.jpg`).then(
        (url) => {
          urls.cover = url;
        },
      ),
    );
  }

  if (files.details?.length) {
    const detailUploads = files.details.map((file, index) =>
      uploadAndGetUrl(file, `products/${productId}/detail${index + 1}.jpg`),
    );

    tasks.push(
      Promise.all(detailUploads).then((results) => {
        urls.details = results;
      }),
    );
  }

  await Promise.all(tasks);
  return urls;
}
