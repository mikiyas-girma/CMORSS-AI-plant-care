export class CustomError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500; // Default to 500 if no status code is provided
  }
}

export const errorHandler = (statusCode: number, message: string) => {
  return new CustomError(message, statusCode);
}
