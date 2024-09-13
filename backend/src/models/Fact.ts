import mongoose, { Schema } from 'mongoose';
import { FactType } from '../types/models/fact.types';

const FactSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Fact = mongoose.model<FactType>('Fact', FactSchema);
export default Fact;
