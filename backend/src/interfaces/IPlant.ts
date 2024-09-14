
import { Schema } from "mongoose";
import { PlantDetails } from "../types/models/plant.types.js";

export interface IPlant extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  plantImages: string[];
  details: PlantDetails;
  dateAcquired: Date;
  plantLocation: string;
  locationDetails: "Indoor" | "Outdoor" | "Greenhouse";
  health: "Excellent" | "Good" | "Fair" | "Poor";
  notes: { date: Date; content: string }[];
  careHistory: {
    action:
      | "Watered"
      | "Fertilized"
      | "Pruned"
      | "Repotted"
      | "Treated for pests";
    date: Date;
  }[];
}
