export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductLightProperties {
  name: string;
  tags: string[];
}

export interface ProductProperties extends ProductLightProperties {
  scientific: string;
  price: number;
  difficulty: number;
  description: string;
  Origin: string;
  Temperature: string;
  Watering: string;
  Light: string;
  Humidity: string;
  Efficacy: string;
}

export interface FilterState {
  difficulty: string[];
  light: string[];
  water: string[];
  size: string[];
  efficacy: string[];
  feature: string[];
};