import axios from 'axios';

export const getCurrentWeather = async (location: string) => {
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
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    
    const diff = sunset.getTime() - sunrise.getTime();
    return diff / 36e5;
};
