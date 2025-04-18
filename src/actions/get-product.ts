'use server';

import { getProductName } from '@/lib/firebase/product/get';

export async function fetchProductNamesOnServer() {
  return await getProductName();
}
