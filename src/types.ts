export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductImageURLs {
  list: string;
  cover: string;
  detail: string[];
}

type MultiSelectFilter = {
  light: string[];
  size: string[];
  efficacy: string[];
  feature: string[];
};

type SingleSelectFilter = {
  difficulty: string;
  water: string;
};

export type FilterState = MultiSelectFilter & SingleSelectFilter;

export interface ProductPreview {
  id: string;
  name: string;
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
