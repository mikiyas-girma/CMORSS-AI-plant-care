import { Document } from "mongoose";

export interface PlantDoc extends Document {
  name: string;
  type: string;
  location: string;
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
