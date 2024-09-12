import { Request, Response } from 'express';
import { formatWeatherURL } from '../../utils/formatWeatherURL';
import axios from 'axios';

export const getWeatherData = async (req: Request, res: Response) => {
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
};
