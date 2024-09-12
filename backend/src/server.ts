import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

// import { formatWeatherURL } from './utils/formatWeatherURL';
// import { getWeatherData } from './controllers/dashboard/getWeatherInformation';
import { plantFactData } from './seedDatabase';

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

// WHAT IS GOING ON: IMPORTS ARE NOT WORKING ON MY END
app.get('/dashboard/daily-fact', async (req, res) => {
  return res.status(200).json({
    name: 'Maize (Corn)',
    timestamp: '2024-09-12T07:28:30.874Z',
    image:
      'https://plantura.garden/uk/wp-content/uploads/sites/2/2022/04/corn-cob.jpg',
    description:
      'Staple food crop in many African countries, known for its versatility in cooking and high yield potential.',
  });
});

//
//
// Fetch Weather based on user's location (from navigator)
app.get('/dashboard/weather-data', async (req: Request, res: Response) => {
  const key = process.env.OPEN_WEATHER_API_KEY;
  const date = Date.now();
  const { longitude, latitude } = req.query as {
    longitude: string;
    latitude: string;
  };
  const URL = formatWeatherURL({ API_KEY: key!, longitude, latitude, date });

  try {
    const response = await axios.get(URL);
    const data = response.data;

    return res.status(200).json({ data, message: 'Weather data retrieved.' });
  } catch (error) {
    return res.status(400).json({
      data: null,
      message: 'There was an error retrieving weather data.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Anything imported outside the file says not found
// That's why i'm defining them here.
// Backend guys refactor accordingly.
type TWeatherURL = {
  API_KEY: string;
  longitude: string;
  latitude: string;
  date: number;
};

export const formatWeatherURL = ({
  API_KEY,
  longitude,
  latitude,
  date,
}: TWeatherURL) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&dt=${date}&appid=${API_KEY}`;
};
