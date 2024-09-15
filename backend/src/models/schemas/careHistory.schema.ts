// src/models/careHistory.schema.ts
import { Schema } from "mongoose";

export const careHistorySchema = new Schema({
  action: {
    type: String,
    enum: ["Watered", "Fertilized", "Pruned", "Repotted", "Treated for pests"],
    required: true,
  },
  date: { type: Date, default: Date.now },
});
