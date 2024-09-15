import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IJournal extends Document {
  userId: ObjectId;
  entries: {
    message: string;
    timestamp: Date;
    type: "photo" | "text";
  }[];
}
