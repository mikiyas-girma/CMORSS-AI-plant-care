import express, { Application } from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import plantRoutes from './routes/plant.route.js';
import cors from 'cors';
import 'dotenv/config';

import { getWeatherData } from './controllers/dashboard/getWeatherInformation.js';
import { globalErrorMiddleware } from './utils/errorMiddleware.js';
import getDailyPlantFact from './controllers/dashboard/getDailyPlantFact.js';

import createNewJournal from './controllers/user/createNewJournal.js';
import cookieParser from 'cookie-parser';

import { uploadImageController } from './controllers/user/uploadController.js';
import getAllJournals from './controllers/user/getAllJournals.js';
import getSingleJournal from './controllers/user/getSingleJournal.js';
import addNoteToPlantJournal from './controllers/user/addNoteToJournal.js';

const app: Application = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);

// Routes
app.get('/', (req, res) => {
  res.send('Root endpoint check ');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);

// Implement dashboard route for needed data fetching
app.get('/api/dashboard/weather-data', getWeatherData);
app.get('/api/dashboard/daily-fact', getDailyPlantFact);

// User related actions
app.post('/api/user/journal/create', createNewJournal);
app.get('/api/user/journal/get-all', getAllJournals);
app.get('/api/user/journal', getSingleJournal);
app.post('/api/user/journal/add-note', addNoteToPlantJournal);

// Image Upload
app.post('/api/user/image-upload', uploadImageController);

app.use(globalErrorMiddleware);

// Connect to database
connectDB();

export default app;
