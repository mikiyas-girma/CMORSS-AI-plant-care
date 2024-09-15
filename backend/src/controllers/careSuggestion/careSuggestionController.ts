import { Request, response, Response } from "express";
import redisClient from "../../config/redisClient.js";
import { Plant } from "../../models/plant.model.js";
import { CareSuggestion } from "../../models/careSuggestion.model.js"; // New collection
import { getCurrentWeather } from "../../services/weatherService.js";
import { getCareSuggestion, aiChatService } from "../../services/gptService.js";

export const getCareSuggestionForPlant = async (
  req: Request,
  res: Response
) => {
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
    const careSuggestion = await getCareSuggestion(
      plant.plantName,
      weatherData
    );

    if (!careSuggestion) {
      return res
        .status(500)
        .json({ message: "Failed to get care suggestion from AI" });
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

// In-memory storage for chat histories (You can replace this with a database for persistence)
let chatHistories: { [userId: string]: any[] } = {};

const MAX_HISTORY = 4

/**
 * Controller function to handle POST requests for chat with AI.
 * This function remembers up to the last 4 messages in the chat history.
 */
export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { userId, userQuery } = req.body;

    // Ensure both `userId` and `userQuery` are provided
    if (!userId || !userQuery) {
      return res.status(400).json({ error: "Missing userId or userQuery" });
    }

    // Get the current chat history for the user, or initialize a new one
    // const userChatHistory = chatHistories[userId] || [];
    const historyKey = `chatHistory:${userId}`;
    let fullChatHistory = await redisClient.lRange(historyKey, 0, -1);

    // parse redis data back into json
    fullChatHistory = fullChatHistory.map((entry: string) => JSON.parse(entry));

    // push new user query to redis
    const newUserMessage = { role: "user", content: userQuery };
    await redisClient.rPush(historyKey, JSON.stringify(newUserMessage));

    // retrieve only the last four for ai history context
    const recentChatHistory = await redisClient.lRange(historyKey, -MAX_HISTORY, -1);
    const parsedRecentHistory = recentChatHistory.map((entry: string) => JSON.parse(entry));

    // call ai service with the last 4 chat messages
    const updatedChatHistory = await aiChatService(userQuery, parsedRecentHistory);

    // store the updated chat history in redis
    const aiResponseMessage = {role: "assistant", content: updatedChatHistory[updatedChatHistory.length - 1].content};
    await redisClient.rPush(historyKey, JSON.stringify(aiResponseMessage));

    // Respond with the AI's reply and the full chat history;
    const aiResponse = aiResponseMessage.content;
    res.status(200)
        .json({
            response: aiResponse,
            fullChatHistory: [...fullChatHistory, newUserMessage, aiResponseMessage]
        });

  } catch (error) {
    console.error('Error in chatWithAI controller:', error);
    res.status(500).json({ error: 'Failed to process the AI chat request' });
  }
};
  
