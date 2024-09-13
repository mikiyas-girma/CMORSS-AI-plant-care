import { Request, Response, NextFunction } from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

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
    return next(error);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (![email, password].every((field) => field && field.trim())) {
    return next(errorHandler(400, "Please fill in all the required fields"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password!);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid email or password. Please try again"));
    }
    const token = jwt.sign({ email: validUser.email }, process.env.JWT_SECRET_KEY!);
    const { password: pass, ...user } = validUser.toObject();
    return res.status(200).cookie("access_token", token, {
      httpOnly: true,
    }).json(user);
  } catch (error) {
    next(error);
  }
};


