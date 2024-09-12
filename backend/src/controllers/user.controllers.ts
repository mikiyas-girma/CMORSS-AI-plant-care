import { Request, Response } from 'express';

// Function to handle the test endpoint
export default function testEndpoint(_: Request, res: Response) {
  try {
    res.status(200).json({ message: 'API is working. You can access the test endpoint' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
