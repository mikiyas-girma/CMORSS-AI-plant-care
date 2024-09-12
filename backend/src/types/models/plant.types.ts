import { Document } from "mongoose";

interface ICareSuggestion {
  date: Date;
  weatherData: {
    temperature: number;
    humidity: number;
    sunlightHours: number;
  };
  suggestion: {
    waterFrequency: string;
    sunlightHours: string;
    additionalTips: string;
  };
}

export interface PlantDoc extends Document {
  name: string;
  species: string;
  location: string;
  careSuggestions: ICareSuggestion[];
  createdAt: Date;
  updatedAt: Date;
}
