import axios from 'axios';

export const getWeatherForLocation = async (location: string) => {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    const { temp, humidity } = response.data.main;
    const sunlightHours = calculateSunlightHours(response.data);

    return { temperature: temp, humidity, sunlightHours };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

const calculateSunlightHours = (data: any): number => {
  // Placeholder for actual sunlight hours calculation logic
  return 6; // Replace with actual logic
};
