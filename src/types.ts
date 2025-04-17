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

export interface ProductLightProperties {
  id: string;
  name: string;
  price?: number;
  description?: string;
  filters?: FilterState;
}

export interface ProductProperties extends ProductLightProperties{
  scientificName: string;
  origin: string;
  warning?: string;
  efficacy?: string;
  humidity: string;
  light: string;
  tags: string[];
}

