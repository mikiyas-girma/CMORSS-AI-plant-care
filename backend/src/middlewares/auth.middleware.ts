import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (!req.path.includes('/api/auth')) {
		console.log(req.path)
		const token = req.cookies?.access_token;
		console.log(req.cookies)

		if (!token) {
			console.error('Authentification error: token missing');
			return next(errorHandler(401, 'Unauthentified user'));
		}
			
		return jwt.verify(
			token,
			process.env.JWT_SECRET_KEY!,
			async (err: any, decoded: any) => {
				if (err) {
					console.error('Authentification error: unknow error');
					return next(errorHandler(401, 'Cannot authentify user'));
				}
				try {
					const user = await User.findOne({ email: decoded.email });
					if (!user) {
						console.error('Authentification error: user not found');
						return next(errorHandler(401, 'Unknow user or invalid auth token'));
					}
					console.log('authentified');
					return next();
				} catch (error) {
					console.error('Authentification error:', error);
					return next(errorHandler(401, 'Cannot authentify user'));
				}
			}
		);
	}
	return next();
}