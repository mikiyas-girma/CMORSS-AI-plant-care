import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  if (![firstName, lastName, email, password].every((field) => field && field.trim())) {
    return next(errorHandler(400, "Please fill in all the required fields"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "Email is already in use"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json("User created successfully");
  } catch (error) {
    return next(errorHandler(500, (error as Error).message));
  }
};
