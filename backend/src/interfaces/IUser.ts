import { Document } from 'mongoose';
import { IChat } from './IChat.js';
import { IJournal } from './IJournal.js';

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  photo: string;
  password?: string;
  googleID?: string;
  chats: IChat[];
  journals: IJournal[];
  createdAt: Date;
  updatedAt: Date;
}
