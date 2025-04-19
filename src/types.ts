export type ActionState = {
  status: boolean;
  error?: string;
};

export type MultiSelectFilter = {
  light: string[];
  size: string[];
  efficacy: string[];
  feature: string[];
};

export type SingleSelectFilter = {
  difficulty: string;
  water: string;
};

export type FilterState = MultiSelectFilter & SingleSelectFilter;

export interface ProductName {
  id: string;
  name: string;
}

export interface ProductPreview extends ProductName {
  price?: number;
  description?: string;
  filters?: FilterState;
}

export interface ProductImageURLs {
  list: string;
  cover: string;
  details: string[];
}

export interface PartialProductImageURLs {
  list?: string;
  cover?: string;
  details?: string[];
}

export interface PartialProductImageFiles {
  list?: File;
  cover?: File;
  details: File[];
}

export interface ProductProperties extends ProductPreview {
  scientificName: string;
  efficacy?: string;
  warning?: string;
  humidity: string;
  light: string;
  origin: string;
  temperature: string;
  watering: string;
  tags: string[];
  imageUrls: ProductImageURLs;
}

export interface ProductFormState extends Omit<ProductProperties, 'imageUrls'> {
  images: PartialProductImageFiles;
}
