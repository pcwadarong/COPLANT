import { addProduct, uploadProductImages } from '@/lib/firebase/product/add';

export default async function addProductAction(_: any, formData: FormData) {
  const name = formData.get('name') as string | null;
  const scientificName = formData.get('scientificName') as string | null;
  const price = Number(formData.get('price'));
  const description = formData.get('description') as string | null;
  const origin = formData.get('origin') as string | null;
  const efficacy = formData.get('efficacy') as string | null;
  const humidity = formData.get('humidity') as string | null;
  const light = formData.get('light') as string | null;

  const difficulty = Number(formData.get('difficulty'));
  const feature = formData.get('feature') as string | null;
  const size = formData.get('size') as string | null;
  const water = formData.get('water') as string | null;

  const images = formData.getAll('images') as File[];

  if (!name || !scientificName || !price || !origin || !efficacy) {
    return { status: false, error: '모든 필드를 입력해주세요.' };
  }

  try {
    await uploadProductImages(scientificName, images);
    await addProduct({
      id: scientificName,
      name,
      scientificName,
      price,
      description: description ?? '',
      origin,
      efficacy,
      humidity: humidity ?? '',
      light: light ?? '',
      filters: {
        difficulty,
        efficacy,
        feature: feature ?? '',
        size: size ?? '',
        water: water ?? '',
        light: light ?? '',
      },
    });

    return { status: true, error: '' };
  } catch (err) {
    return {
      status: false,
      error: (err as Error).message,
    };
  }
}
