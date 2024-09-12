import mongoose, { Schema } from 'mongoose';
import { IJournal } from '../interfaces/IJournal.js';

const journalSchema: Schema<IJournal> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  entries: [
    {
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      type: {
        type: String,
        enum: ["photo", "text"],
        required: true,
      },
    },
  ],
});

const Journal = mongoose.model<IJournal>('Journal', journalSchema);
export default Journal;
