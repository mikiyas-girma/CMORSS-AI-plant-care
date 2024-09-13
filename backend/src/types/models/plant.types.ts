import { Document } from "mongoose";

interface ICareSuggestion {
  date: Date;
  weatherData: {
    temperature: number;
    humidity: number;
    sunlightHours: number;
  };
  suggestion: string;
}

export interface PlantDoc extends Document {
  name: string;
  species: string;
  location: string;
  careSuggestions: ICareSuggestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlantDetails {
  name: string;
  images: string[];
  common_names: string[];
  description: string;
  edible_parts: string[];
  best_light_condition: string;
  best_soil_type: string;
  common_uses: string;
  cultural_significance: string;
  toxicity: string;
  best_watering: string;
  url: string;
}
