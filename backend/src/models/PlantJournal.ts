import mongoose, { Schema } from 'mongoose';
import { PlantJournalType } from '../types/models/plantjournal.types';

const plantJournalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // userId: { type: Schema.Types.ObjectId, ref: 'User' },
    userId: { type: String, required: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },

    species: {
      type: String,
      trim: true,
    },

    dateAcquired: {
      type: Date,
      default: Date,
    },

    location: {
      type: String,
      enum: ['Indoor', 'Outdoor', 'Greenhouse'],
      required: true,
    },

    health: {
      type: String,
      enum: ['Excellent', 'Good', 'Fair', 'Poor'],
      default: 'Good',
    },

    notes: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
        content: {
          type: String,
          required: true,
        },
        type: { type: String, enum: ['image', 'text'], default: 'text' },
      },
    ],

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        caption: String,
      },
    ],

    careHistory: [
      {
        action: {
          type: String,
          enum: [
            'Watered',
            'Fertilized',
            'Pruned',
            'Repotted',
            'Treated for pests',
          ],
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PlantJournal = mongoose.model<PlantJournalType>(
  'PlantJournal',
  plantJournalSchema
);

export default PlantJournal;
