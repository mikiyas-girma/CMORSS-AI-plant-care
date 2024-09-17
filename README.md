# CMORSS Agricare App

Welcome to the CMORSS Agricare App repository! This project is a fullstack web application that leverages AI technology to provide personalized plant care solutions. It was developed as part of the ALX SE FaceOff Cup Round of 11.

## Table of Contents

- [CMORSS Agricare App](#cmorss-agricare-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Team Members](#team-members)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [APIs and Libraries](#apis-and-libraries)
    - [Frontend Libraries/API](#frontend-librariesapi)
    - [Backend Libraries/API](#backend-librariesapi)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

CMORSS Agricare App is a comprehensive solution for plant enthusiasts and gardeners. It utilizes various APIs to offer tailored advice on plant care, agricultural practices, and seasonal planting. The application features plant identification through image upload, a personal plant journal, and integration with weather and Google Maps services for location-based recommendations.

## Team Members

- [Onyango Ondigo](https://github.com/ondi20)
- [Christadrian Madegwa](https://github.com/Prish20)
- [Houssem Eddine](https://github.com/SeM2x)
- [Mikiyas Girma](https://github.com/mikiyas-girma)
- [Stephen Omoregie](https://github.com/Cre8steveDev)
- [Rayane Toko](https://github.com/RyanTk03)

## Features

- AI-powered chat for plant care and seasonal planting advice
- Plant identification through image upload
- Personalized plant journal
- Weather information widget
- Plant of the day feature with images and facts
- Google Maps integration for location-based visualization

## Tech Stack

### Frontend

- ReactJS with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Redux for state management
- Google Maps JavaScript API for mapping features

### Backend

- ExpressJS with TypeScript
- MongoDB for database
- Redis for caching

## APIs and Libraries

### Frontend Libraries/API

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) and [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api) for mapping features
- [Firebase](https://firebase.google.com/docs/reference) for authentication
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Zod](https://zod.dev/) for schema validation
- [Axios](https://axios-http.com/docs/intro) for HTTP requests
- [date-fns](https://date-fns.org/) for date manipulation
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications

### Backend Libraries/API

- [OpenAI API](https://openai.com/index/openai-api/) for AI-powered chat functionality and plant identification
- [Google Cloud Generative AI (Gemini)](https://ai.google.dev/gemini-api/docs) for additional AI features
- [plant.id API](https://www.kindwise.com/plant-id) for optional plant identification
- [Cloudinary](https://cloudinary.com/) for image storage and manipulation
- [OpenWeather API](https://openweathermap.org/api) for weather information
- [TMDB API](https://developer.themoviedb.org/reference/intro/getting-started) for trending movies - All plants and no movies makes a ....
- [JWT](https://jwt.io/) for authentication
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for password hashing
- [Redis](https://redis.io/) for caching
## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)
- Redis

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/CMORSS-Agricare.git
   cd CMORSS-Agricare
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

## Configuration

1. Create a `.env` file in the `frontend` directory with:

   ```bash
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

2. Create a `.env` file in the `backend` directory with:

   ```bash
   MONGO_URI=your_mongodb_uri
   JWT_SECRET_KEY=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   OPEN_WEATHER_API_KEY=your_openweather_api_key
   OPENAI_API_KEY=your_openai_api_key
   TMDB_API_KEY=your_tmdb_api_key
   REDIS_HOST=your_redis_host
   REDIS_PASSWORD=your_redis_password
   REDIS_PORT=your_redis_port
   GOOGLE_API_KEY=your_google_api_key
   PLANT_ID_API_KEY=your_plant_id_api_key (optional)
   ```

## Running the Application

1. Start the backend server:

   ```bash
   cd backend && npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd frontend && npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

We welcome contributions to the CMORSS Agricare App! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for your interest in the CMORSS Agricare App! If you have any questions or issues, please open an issue in this repository.
