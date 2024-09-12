/**
 * Format Weather API Url for current time stamp weather
 * condition for the user's current location
 */

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
