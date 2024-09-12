import { Document } from "mongoose";


export interface PlantDoc extends Document {
  name: string;
  type: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}
