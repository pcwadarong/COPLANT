import { ProductFormState, FilterState } from '@/types';

export const defaultFilters: FilterState = {
  difficulty: '',
  water: '',
  light: [],
  size: [],
  efficacy: [],
  feature: [],
};

export const initialProductFormState: ProductFormState = {
  id: '',
  name: '',
  price: 0,
  description: '',
  scientificName: '',
  origin: '',
  warning: '',
  efficacy: '',
  humidity: '',
  temperature: '',
  watering: '',
  light: '',
  images: {
    list: undefined,
    cover: undefined,
    details: [],
  },
  filters: defaultFilters,
  tags: [],
};
