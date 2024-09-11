# CMORSS AI-Plant-Care App

Welcome to the CMORSS AI-Plant-Care App repository! This project is a web application that leverages AI technology to provide personalized plant care solutions. It was developed as part of the ALX SE FaceOff Cup Round of 11.

## Table of Contents

- [CMORSS AI-Plant-Care App](#cmorss-ai-plant-care-app)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Team Members](#team-members)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [Contributing](#contributing)
  - [License](#license)

## Project Overview

CMORSS AI-Plant-Care App is a comprehensive solution for plant enthusiasts and gardeners. It utilizes the OpenAI API, Weather API, and Google Maps to offer tailored advice on plant care, agricultural practices, and seasonal planting. The application also features plant identification through image upload and a personal plant journal for users to record their gardening/agricultural activities.

## Team Members

- [Onyango Ondigo](https://github.com/ondi20)
- [Christadrian Madegwa](https://github.com/Prish20)
- [Houssem Eddine](https://github.com/SeM2x)
- [Mikiyas Girma](https://github.com/mikiyas-girma)
- [Stephen Omoregie](https://github.com/Cre8steveDev)
- [Rayane Toko](https://github.com/RyanTk03)

## Features

- AI-powered chat for plant care and Seasonal planting advice
- Plant identification through image upload
- Personalized plant journal
- Weather information widget
- Plant of the day feature with images and facts

- Integration with Google Maps for location-based recommendations

## Tech Stack

### Frontend

- ReactJS
- TailwindCSS
- ShadCN UI components
- Zustand for state management

### Backend

- ExpressJS
- MongoDB

### Project Structure

- Monorepo setup with separate frontend and backend directories

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- MongoDB (v4.0.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mikiyas-girma/CMORSS-AI-plant-care.git
   cd CMORSS-AI-plant-care
   ```

2. Install dependencies for both frontend and backend:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Configuration

1. Create a `.env` file in the `backend` directory with the following contents:

   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   WEATHER_API_KEY=your_weather_api_key
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

2. Create a `.env` file in the `frontend` directory with the following contents:

   ```bash
   VITE_API_URL=http://localhost:3000/api
   ```

Replace the placeholder values with your actual API keys and MongoDB connection string.

## Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run dev
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

We welcome contributions to the CMORSS AI-Plant-Care App! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for your interest in the CMORSS AI-Plant-Care App! If you have any questions or issues, please open an issue in this repository.
