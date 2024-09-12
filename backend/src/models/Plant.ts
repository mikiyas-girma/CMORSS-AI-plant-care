import mongoose, { Schema } from "mongoose";
import { PlantDoc } from "../types/models/plant.types";


const PlantSchema: Schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    species: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });


const plant = mongoose.model<PlantDoc>("Plant", PlantSchema);
export default plant;
