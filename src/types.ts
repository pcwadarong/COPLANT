export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductProperties {
  id?: string;
  description: string;
  efficacy: string;
  filters: {
    difficulty: number;
    efficacy: string;
    feature: string;
    light: string;
    size: string;
    water: string;
  };
  humidity: string;
  light: string;
  name: string;
  origin: string;
  price: number;
  scientificName: string;
}

export interface FilterState {
  difficulty: string[];
  light: string[];
  water: string[];
  size: string[];
  efficacy: string[];
  feature: string[];
}
