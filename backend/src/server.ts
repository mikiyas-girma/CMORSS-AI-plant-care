import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import { getWeatherData } from './controllers/dashboard/getWeatherInformation';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

app.get('/', (req, res) => {
  res.send('Root endpoint check ');
});

// Implement dashboard route for needed data fetching
app.get('/dashboard/weather-data', getWeatherData);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
