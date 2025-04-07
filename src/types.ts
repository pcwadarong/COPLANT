export type ActionState = {
  status: boolean;
  error?: string;
};

export interface ProductProperties {
  name: string;
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
  tags: string[];
}