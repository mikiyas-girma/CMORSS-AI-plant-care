declare module "**/*.png";
declare module "**/*.jpg";
declare module "**/*.jpeg";
declare module "**/*.gif";

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type PlantFact = {
  name: string;
  timestamp: string;
  image: string;
  description: string;
};

export type Plant = {
  _id: string;
  userId: string;
  plantName: string;
  plantImages?: string[];
  geoLocation: string;
  details?: PlantDetails;
  createdAt: string;
};
export type PlantDetails = {
  name: string;
  common_names: string[];
  description: string;
  best_light_condition: string;
  best_soil_type: string;
  best_watering: string;
  common_uses: string;
  cultural_significance: string;
  toxicity: string;
  url: string;
};

export type PlantJournalType = {
  name: string;
  title: string;
  species: string;
  dateAcquired: Date;
  location: "Indoor" | "Outdoor" | "Greenhouse" | "Farmland";
  health: "Excellent" | "Good" | "Fair" | "Poor";
  notes: { date: Date; content: string; type: "image" | "text" }[];
  images: { url: string; date: Date }[];
  careHistory: {
    action:
      | "Watered"
      | "Fertilized"
      | "Pruned"
      | "Repotted"
      | "Treated for Pests";
  }[];
  updatedAt: Date;
  _id: string;
};

export type JournalCardType = {
  _id: string;
  title: string;
  messageCount: number;
  lastUpdate: Date;
};
