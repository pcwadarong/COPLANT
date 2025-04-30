import { ProductFormState, ProductProperties } from '@/types';

import { useProductForm } from './useAddProductForm';

export function convertToFormState(data: ProductProperties): ProductFormState {
  return {
    id: data.id,
    name: data.name,
    scientificName: data.scientificName,
    price: data.price,
    description: data.description,
    efficacy: data.efficacy,
    warning: data.warning,
    humidity: data.humidity,
    light: data.light,
    origin: data.origin,
    temperature: data.origin,
    watering: data.watering,
    tags: data.tags,
    filters: data.filters,
    images: {
      list: undefined,
      cover: undefined,
      details: [],
    },
  };
}

export function useEditProductForm(product: ProductProperties) {
  const initialState = convertToFormState(product);
  const formTools = useProductForm(initialState);

  return formTools;
}
