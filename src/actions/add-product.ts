'use server';

import { revalidatePath } from 'next/cache';
import { addProduct, uploadProductImages } from '@/lib/firebase/product/add';
import { serverProductFields } from '@/lib/validation/product-schema';

export default async function addProductAction(_: unknown, formData: FormData) {
  const id = (formData.get('id') ?? '') as string;
  const name = (formData.get('name') ?? '') as string;
  const scientificName = (formData.get('scientificName') ?? '') as string;
  const price = Number(formData.get('price') ?? 0);
  const description = (formData.get('description') ?? '') as string;
  const origin = (formData.get('origin') ?? '') as string;
  const warning = (formData.get('warning') ?? '') as string;
  const efficacy = (formData.get('efficacy') ?? '') as string;
  const humidity = (formData.get('humidity') ?? '') as string;
  const light = (formData.get('light') ?? '') as string;
  const tags = formData.getAll('tags') as string[];

  const difficulty = (formData.get('filterDifficulty') ?? '') as string;
  const water = (formData.get('filterWater') ?? '') as string;
  const filterLight = formData.getAll('filterLight') as string[];
  const size = formData.getAll('filterSize') as string[];
  const feature = formData.getAll('filterFeature') as string[];
  const filterEfficacy = formData.getAll('filterEfficacy') as string[];

  const list = formData.get('image-list') as File;
  const cover = formData.get('image-cover') as File;
  const details = formData.getAll('image-details') as File[];
  const images = [list, cover, ...details];

  const baseData = {
    id,
    name,
    scientificName,
    price,
    description,
    origin,
    warning,
    efficacy,
    humidity,
    light,
    tags,
    filters: {
      difficulty,
      water,
      light: filterLight,
      size,
      feature,
      efficacy: filterEfficacy,
    },
  };

  const parsed = serverProductFields.safeParse(baseData);
  if (!parsed.success) {
    return {
      status: false,
      error: parsed.error.issues[0]?.message ?? '유효성 검사 실패',
    };
  }

  try {
    const imageUrls = await uploadProductImages(scientificName, images);

    await addProduct({
      ...parsed.data,
      imageUrls,
    });

    revalidatePath('/(with-nav)');
    return { status: true, error: '' };
  } catch (err) {
    console.error('Add product failed:', err);
    return {
      status: false,
      error: (err as Error).message,
    };
  }
}
