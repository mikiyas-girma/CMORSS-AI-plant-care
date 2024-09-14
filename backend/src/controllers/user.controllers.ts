import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler';
import User from '../models/user.model';
import uploadImage from "../utils/uploadImage";

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, firstName, lastName, email, photo } = req.body;

    if (![id, firstName, lastName, email, photo].every((field) => field && field.trim())) {
      return next(errorHandler(400, "Please fill in all the required fields"));
    }
  
    const user = await User.findOne({_id: id});
    if (!user) {
      return next(errorHandler(404, "User not found"));
    };
    const { uploadResult, imageUrl } = await uploadImage(
      photo,
      `${Date.now()}`,
      `upload/photos/${id}/`
    );
    user.$set({email, firstName, lastName, imageUrl});
    await user.save();

    return res.status(204).send({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo
    });
  } catch (error) {
    console.error('Cannot update user password', error);
    return res.status(500).send({error})
  }
}

const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, confirmedPassword } = req.body;

    if (![email, password, confirmedPassword].every((field) => field && field.trim())) {
      return next(errorHandler(400, "Please fill in all the required fields"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.findOne({email});
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    user.password = hashedPassword;
    user.save();
    return res.status(204).send({message: 'Password updated with success'});
  } catch (error) {
    console.error('Cannot update user password', error);
    return res.status(500).send({error})
  }
}

export { updateProfile, updatePassword }