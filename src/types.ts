export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductImageURLs {
  list: string;
  cover: string;
  detail: string[];
}

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
  detail: string[];
}

export interface ProductProperties extends ProductPreview {
  scientificName: string;
  origin: string;
  warning?: string;
  efficacy?: string;
  humidity: string;
  light: string;
  tags: string[];
  imageUrls: ProductImageURLs;
}

export interface ProductFormState extends Omit<ProductProperties, 'imageUrls'> {
  images: {
    list?: File;
    cover?: File;
    details: File[];
  };
}