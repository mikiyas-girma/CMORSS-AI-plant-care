import express, { Application } from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import 'dotenv/config';

import { getWeatherData } from './controllers/dashboard/getWeatherInformation.js';
import getDailyPlantFact from './controllers/dashboard/getDailyPlantFact.js';
import createNewJournal from './controllers/user/createNewJournal.js';

const app: Application = express();

// Add Middle Ware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

// Define Routes + Router
app.get('/', (req, res) => {
  res.send('Root endpoint check ');
});

// Implement dashboard route for needed data fetching
app.get('/dashboard/weather-data', getWeatherData);
app.get('/dashboard/daily-fact', getDailyPlantFact);

// User related actions
app.post('/user/journal/create', createNewJournal);

// connect to database
connectDB();

export default app;
