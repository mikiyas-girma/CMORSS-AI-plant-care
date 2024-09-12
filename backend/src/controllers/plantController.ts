import { Request, Response } from 'express';
import Plant from '../models/Plant.js';
import { getWeatherForLocation } from '../services/weatherService.js';
import { getCareSuggestion } from '../services/gptService.js';

// Create a new plant
export const createPlant = async (req: Request, res: Response) => {
  const { name, species, location } = req.body;

  try {
    const newPlant = new Plant({
      name,
      species,
      location,
    });

    await newPlant.save();
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plant', error });
  }
};

// Fetch care suggestions for a plant
export const getCareSuggestionForPlant = async (req: Request, res: Response) => {
  const { plantId } = req.params;

  try {
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    const weatherData = await getWeatherForLocation(plant.location);
    const careSuggestion = await getCareSuggestion(plant.species, weatherData);

    const newSuggestion = {
      date: new Date(),
      weatherData,
      suggestion: careSuggestion,
    };

    plant.careSuggestions.push(newSuggestion);
    await plant.save();

    res.status(200).json({
      plantName: plant.name,
      species: plant.species,
      location: plant.location,
      careSuggestions: plant.careSuggestions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching care suggestion', error });
  }
};

// Get all plants
export const getAllPlants = async (req: Request, res: Response) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plants', error });
  }
};

// Delete a plant
export const deletePlant = async (req: Request, res: Response) => {
  const { plantId } = req.params;

  try {
    const plant = await Plant.findByIdAndDelete(plantId);
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }

    res.status(200).json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plant', error });
  }
};
