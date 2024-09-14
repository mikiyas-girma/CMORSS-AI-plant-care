import { Schema, model } from "mongoose";
import { ICareSuggestion } from "../interfaces/ICareSuggestion";

const careSuggestionSchema = new Schema<ICareSuggestion>(
  {
    plantId: { type: Schema.Types.ObjectId, ref: "Plant", required: true },
    care: [
      {
        date: { type: Date, default: Date.now },
        weatherData: {
          temperature: { type: Number, required: true },
          humidity: { type: Number, required: true },
          sunlightHours: { type: Number, required: true },
        },
        suggestions: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const CareSuggestion = model<ICareSuggestion>(
  "CareSuggestion",
  careSuggestionSchema
);
