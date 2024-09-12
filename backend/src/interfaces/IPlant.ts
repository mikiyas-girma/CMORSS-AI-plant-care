import { PlantDetails } from "../types/models/plant.types";

export interface IPlant extends Document {
  plantName: string;
  plantImages: string[];
  details: PlantDetails;
}
