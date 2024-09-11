import express, { Application } from 'express';
import connectDB from './config/db.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

// routes

// connect to database
connectDB();

export default app;
