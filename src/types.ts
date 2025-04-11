export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductImageURLs {
  list: string;
  cover: string;
  detail: string[];
}

export interface ProductLightProperties {
  id?: string;
  name: string;
  price?: number;
  description?: string;
  filters?: {
    difficulty: number;
    efficacy: string;
    feature: string;
    light: string;
    size: string;
    water: string;
  };
  
}

export interface ProductProperties extends ProductLightProperties{
  scientificName: string;
  origin: string;
  efficacy: string;
  humidity: string;
  light: string;
}

export interface FilterState {
  difficulty: string[];
  light: string[];
  water: string[];
  size: string[];
  efficacy: string[];
  feature: string[];
}
