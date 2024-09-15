import { Document } from "mongoose";
import { Schema } from "mongoose";

export interface ICareSuggestion extends Document {
  plantId: Schema.Types.ObjectId;
  care: [
    {
    date: Date;
    weatherData: {
      temperature: number;
      humidity: number;
      sunlightHours: number;
    };
    suggestions: string;
  }
]
}
