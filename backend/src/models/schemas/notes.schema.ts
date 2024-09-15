import { Schema } from "mongoose";

export const noteSchema = new Schema({
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
});
