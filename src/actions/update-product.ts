'use server';

import { revalidatePath } from 'next/cache';

import { getProductDetail } from '@/lib/firebase/product/get';
import {
  updateProduct,
  uploadProductImagesForUpdate,
} from '@/lib/firebase/product/update';
import { serverProductFields } from '@/lib/validation/product-schema';
import { ProductProperties } from '@/types';

export default async function updateProductAction(
  _: unknown,
  formData: FormData,
) {
  const id = (formData.get('id') ?? '') as string;
  const name = (formData.get('name') ?? '') as string;
  const scientificName = (formData.get('scientificName') ?? '') as string;
  const price = Number(formData.get('price') ?? 0);
  const description = (formData.get('description') ?? '') as string;
  const efficacy = (formData.get('efficacy') ?? '') as string;
  const warning = (formData.get('warning') ?? '') as string;
  const humidity = (formData.get('humidity') ?? '') as string;
  const light = (formData.get('light') ?? '') as string;
  const origin = (formData.get('origin') ?? '') as string;
  const temperature = (formData.get('temperature') ?? '') as string;
  const watering = (formData.get('watering') ?? '') as string;
  const tags = formData.getAll('tags') as string[];

  const difficulty = (formData.get('filterDifficulty') ?? '') as string;
  const filterWater = (formData.get('filterWater') ?? '') as string;
  const filterLight = formData.getAll('filterLight') as string[];
  const size = formData.getAll('filterSize') as string[];
  const feature = formData.getAll('filterFeature') as string[];
  const filterEfficacy = formData.getAll('filterEfficacy') as string[];

  const rawList = formData.get('image-list');
  const rawCover = formData.get('image-cover');
  const rawDetails = formData.getAll('image-details');

  const list =
    rawList instanceof File && rawList.size > 0 ? rawList : undefined;
  const cover =
    rawCover instanceof File && rawCover.size > 0 ? rawCover : undefined;
  const details =
    rawDetails.length > 0 &&
    rawDetails[0] instanceof File &&
    rawDetails[0].size > 0
      ? (rawDetails as File[])
      : [];

  const prevProduct = await getProductDetail(id);
  if (!prevProduct)
    return {
      status: false,
      error: '기존 상품 정보를 불러올 수 없습니다.',
    };

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
    watering,
    temperature,
    light,
    tags,
    filters: {
      difficulty,
      water: filterWater,
      light: filterLight,
      size,
      feature,
      efficacy: filterEfficacy,
    },
  };

  const parsed = serverProductFields.safeParse(baseData);

  if (!parsed.success)
    return {
      status: false,
      error: parsed.error.issues[0]?.message ?? '유효성 검사 실패',
    };

  try {
    type ParsedData = typeof parsed.data;
    type Keys = keyof ParsedData;

    const changedFields: Partial<ProductProperties> = {};

    (Object.keys(parsed.data) as Keys[]).forEach((key) => {
      const parsedValue = parsed.data[key];
      const prevValue = prevProduct[key as keyof ProductProperties];

      if (JSON.stringify(parsedValue) !== JSON.stringify(prevValue))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        changedFields[key as keyof ProductProperties] = parsedValue as any;
    });

    const hasNewImages = !!list || !!cover || !!details;

    if (hasNewImages) {
      const imageUrls = await uploadProductImagesForUpdate(scientificName, {
        list,
        cover,
        details,
      });

      changedFields.imageUrls = {
        ...prevProduct.imageUrls,
        ...imageUrls,
      };
    }

    if (Object.keys(changedFields).length > 0)
      await updateProduct({
        ...changedFields,
        id: parsed.data.id,
      });

    revalidatePath('/admin', 'layout');
    revalidatePath(`/product/${id}`, 'page');
    revalidatePath('/product', 'page');

    return { status: true, error: '' };
  } catch (err) {
    console.error('Update product failed:', err);
    return {
      status: false,
      error: (err as Error).message,
    };
  }
}
