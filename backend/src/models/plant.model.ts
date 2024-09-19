import { Schema, model } from "mongoose";
import { IPlant } from "../interfaces/IPlant";
import { plantDetailsSchema } from "./schemas/plantDetails.schema.js";
import { noteSchema } from "./schemas/notes.schema.js";
import { careHistorySchema } from "./schemas/careHistory.schema.js";

const plantSchema = new Schema<IPlant>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantName: { type: String, required: true, trim: true},
    plantImages: { type: [String]},
    details: plantDetailsSchema,
    dateAcquired: { type: Date, default: Date.now },
    address: { type: String, required: true },
    geoLocation: { type: String, required: true },
    locationDetails: {type: String, enum: ["Indoor", "Outdoor", "Greenhouse"]},
    health: { type: String },
    notes: [noteSchema],
    careHistory: [careHistorySchema],
  },
  { timestamps: true }
);

export const Plant = model<IPlant>("Plant", plantSchema);
