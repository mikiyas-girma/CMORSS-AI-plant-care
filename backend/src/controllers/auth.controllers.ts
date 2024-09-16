import { Request, Response, NextFunction, CookieOptions } from 'express';
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, password } = req.body;

  if (
    ![firstName, lastName, email, password].every(
      (field) => field && field.trim()
    )
  ) {
    return next(errorHandler(400, 'Please fill in all the required fields'));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'Email is already in use'));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json('User created successfully');
  } catch (error) {
    return next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, remember } = req.body;

  if (![email, password].every((field) => field && field.trim())) {
    return next(errorHandler(400, 'Please fill in all the required fields'));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password!);
    if (!validPassword) {
      return next(
        errorHandler(400, 'Invalid email or password. Please try again')
      );
    }
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET_KEY!
    );
    const { password: pass, ...user } = validUser.toObject();

    const cookieOptions: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    };

    if (!remember) {
      //make the cookie invalid after 1 day
      cookieOptions.expires = new Date(Date.now() + 1000 * 60 * 60 * 24);
    }
    return res
      .status(200)
      .cookie('access_token', token, cookieOptions)
      .json(user);
  } catch (error) {
    next(error);
  }
};

export const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(401).json(null);
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY!,
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json(null);
      }
      try {
        const user = await User.findOne(
          { _id: decoded.id },
          { email: 1, lastName: 1, firstName: 1, photo: 1 }
        );
        if (!user) {
          return res.status(401).json(null);
        }

        return res.status(200).json({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          photo: user.photo
        });
      } catch (err) {
        return res.status(500).json({ error: 'SERVER ERROR' });
      }
    }
  );
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token');
  res.json({ message: 'logged out with success' });
};

export const google = async (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, email } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Missing required fields: firstName, lastName, or email' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY!);
      const { password: pass, ...user } = existingUser.toObject();
      return res.status(200).cookie("access_token", token, {
        httpOnly: true,
      }).json(user);      
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json("User created successfully");
    }
  } catch (error) {
    next(error);
  }
};

