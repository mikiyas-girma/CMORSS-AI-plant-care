import { Schema, model, Document } from "mongoose";
import { IPlant } from "../interfaces/IPlant";

const plantSchema = new Schema<IPlant>({
  plantName: { type: String, required: false },
  plantImages: { type: [String], required: true },
  details: {
    name: { type: String, required: true },
    common_names: { type: [String], required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    edible_parts: { type: [String], required: true },
    best_light_condition: { type: String, required: true },
    best_soil_type: { type: String, required: true },
    common_uses: { type: String, required: true },
    cultural_significance: { type: String, required: true },
    toxicity: { type: String, required: true },
    best_watering: { type: String, required: true },
    url: { type: String, required: true },
  },
});

export const Plant = model<IPlant>("Plant", plantSchema);
