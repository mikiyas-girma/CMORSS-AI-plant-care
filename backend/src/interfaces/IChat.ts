import { Document } from 'mongoose';
import { ObjectId } from 'mongoose';

export interface IChat extends Document {
  userId: ObjectId;
  messages: {
    role: "User" | "Assistant";
    message: string;
    timestamp: Date;
  }[];
}
