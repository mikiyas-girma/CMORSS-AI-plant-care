import { Request, Response } from "express";
import { Plant } from "../../models/plant.model.js";
import { CareSuggestion } from "../../models/careSuggestion.model.js"; // New collection
import { getCurrentWeather } from "../../services/weatherService.js";
import { getCareSuggestion } from "../../services/gptService.js";

export const getCareSuggestionForPlant = async (req: Request, res: Response) => {
  const { plantId } = req.params;

  try {
    // Find the plant by its ID
    const plant = await Plant.findById(plantId);
    if (!plant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Get current weather data based on the plant's geoLocation
    const weatherData = await getCurrentWeather(plant.geoLocation);

    // Get care suggestion from the AI service based on plant name and weather data
    const careSuggestion = await getCareSuggestion(plant.plantName, weatherData);

    if (!careSuggestion) {
        return res.status(500).json({ message: "Failed to get care suggestion from AI" });
        }

    // Find the existing CareSuggestion document for this plant
    let careSuggestionDoc = await CareSuggestion.findOne({ plantId });

    if (!careSuggestionDoc) {
      // If no existing document, create a new one
      careSuggestionDoc = new CareSuggestion({
        plantId: plant._id,
        care: {
          date: new Date(),
          weatherData,
          suggestions: careSuggestion,
        },
      });
    } else {
      // If the document exists, append the new care suggestion
      careSuggestionDoc.care.push({
        date: new Date(),
        weatherData,
        suggestions: careSuggestion,
      });
    }

    // Save the care suggestion document
    await careSuggestionDoc.save();

    // Respond with the updated care suggestion
    res.status(200).json({
      message: "Care suggestion successfully saved",
      plantName: plant.plantName,
      location: plant.geoLocation,
      gptReply: careSuggestion,

    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching care suggestion", error });
  }
};
