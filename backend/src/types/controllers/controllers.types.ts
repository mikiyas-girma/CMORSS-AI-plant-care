import { Request } from 'openai/_shims';
import { IUser } from '../../interfaces/IUser';

export type ImageUploadBody = {
  image: string;
  fileName: string;
  username: string;
};

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
