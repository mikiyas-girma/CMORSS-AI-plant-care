import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser.js';

// User Schema Definition
const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: function () { return !this.fullName; },
    },
    lastName: {
      type: String,
      trim: true,
      required: function () { return !this.fullName; },
    },
    fullName: {
      type: String,
      trim: true,
      required: function () { return !this.firstName || !this.lastName; },
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      minlength: 8,
    },
    googleID: {
      type: String,
    },
    chats: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    }],
    journals: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Journal',
    }],
  },
  {
    timestamps: true,
  }
);

// Exporting the User Model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
