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
    careSuggestions: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        weatherData: {
          temperature: {
            type: Number,
            required: true,
          },
          humidity: {
            type: Number,
            required: true,
          },
          sunlightHours: {
            type: Number,
            required: true,
          },
        },
        suggestion: [
            {
                type: String,
                required: true,
            },
        ]
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });


const Plant = mongoose.model<PlantDoc>("Plant", PlantSchema);
export default Plant;
