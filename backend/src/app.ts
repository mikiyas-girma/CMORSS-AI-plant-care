import express, { Application } from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import "dotenv/config";

import { getWeatherData } from "./controllers/dashboard/getWeatherInformation.js";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Root endpoint check ");
});

// Implement dashboard route for needed data fetching
app.get("/dashboard/weather-data", getWeatherData);

// connect to database
connectDB();

export default app;
