import bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from 'express';
import { errorHandler } from '../utils/errorHandler.js';
import User from '../models/user.model.js';
import uploadImage from "../utils/uploadImage.js";

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, firstName, lastName, email, photo } = req.body;

    if (!id) {
      return next(errorHandler(400, "Please provide a valid user id"));
    }
    const user = await User.findOne({_id: id});
    if (!user) {
      return next(errorHandler(404, "User not found"));
    };
    let photoUrl = null;
    if (photo) {
      const { uploadResult, imageUrl } = await uploadImage({
        image: photo,
        name: `${Date.now()}`,
        folder: `upload/photos/${id}/`
      });
      photoUrl = imageUrl;
    }
    console.log(photoUrl);
    
    user.$set({
      email: email && email !== user.email ? email : user.email,
      firstName: firstName && firstName !== user.firstName ? firstName : user.firstName,
      lastName: lastName && lastName !== user.lastName ? lastName : user.lastName,
      photo: photoUrl && photoUrl !== user.photo ? photoUrl : user.photo
    });
    await user.save();

    return res.status(204).send({
      id: user._id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      photo: photoUrl
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