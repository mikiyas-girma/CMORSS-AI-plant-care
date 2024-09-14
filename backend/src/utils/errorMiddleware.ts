import { Request, Response, NextFunction } from 'express';
import { CustomError } from './errorHandler.js';

export const globalErrorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.log('ERROR RECEIVED: ');
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};
