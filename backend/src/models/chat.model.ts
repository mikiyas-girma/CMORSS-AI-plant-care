import mongoose, { Schema } from 'mongoose';
import { IChat } from '../interfaces/IChat.js';

const chatSchema: Schema<IChat> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ["User", "Assistant"],
        required: true,
      },
      message: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model<IChat>('Chat', chatSchema);
export default Chat;
