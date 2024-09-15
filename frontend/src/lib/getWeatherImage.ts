import {
  SunnyDay,
  BrightMoon,
  MoonCloudMidRain,
  MoonCloudWind,
  SunCloudMidRain,
  SunCloudRain,
  TornadoWind,
} from '@/assets';

export const getWeatherImage = (icon: string) => {
  switch (icon) {
    case '01d':
      return SunnyDay;
      break;
    case '01n':
      return BrightMoon;
      break;
    case '03d':
    case '03n':
      return SunnyDay;
      break;
    case '04d':
      return SunCloudMidRain;
      break;
    case '04n':
      return MoonCloudWind;
      break;
    case '09d':
      return SunCloudMidRain;
      break;
    case '09n':
      return MoonCloudMidRain;
      break;
    case '10d':
      return SunCloudRain;
      break;
    case '10n':
      return MoonCloudMidRain;
      break;
    case '50d':
      return TornadoWind;
      break;
    case '50n':
      return TornadoWind;
      break;
    default:
      return MoonCloudMidRain;
      break;
  }
};
