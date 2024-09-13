import express, { Application } from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import plantRoutes from "./routes/plant.route.js";
import cors from "cors";
import "dotenv/config";

import { getWeatherData } from "./controllers/dashboard/getWeatherInformation.js";
import { globalErrorMiddleware } from "./utils/errorMiddleware.js";
import getDailyPlantFact from './controllers/dashboard/getDailyPlantFact.js';
import createNewJournal from './controllers/user/createNewJournal.js';


const app: Application = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Root endpoint check ');
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);

// Implement dashboard route for needed data fetching
app.get('/dashboard/weather-data', getWeatherData);
app.get('/dashboard/daily-fact', getDailyPlantFact);

// User related actions
app.post('/user/journal/create', createNewJournal);

app.use(globalErrorMiddleware);

// Connect to database
connectDB();

export default app;
