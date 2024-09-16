import { Request, response, Response } from "express";
import redisClient from "../../config/redisClient.js";
import { Plant } from "../../models/plant.model.js";
import { CareSuggestion } from "../../models/careSuggestion.model.js"; // New collection
import { getCurrentWeather } from "../../services/weatherService.js";
import { aiChatService } from "../../services/gptService.js";
import { generateUniqueId } from "../../utils/generateId.js";

/**
 * Controller function to handle POST requests for chat with AI.
 * This function remembers up to the last 4 messages in the chat history.
 */
const MAX_HISTORY = 4;

export const chatWithAI = async (req: Request, res: Response) => {
  if (req.method == "POST") {
    if (!req.body.userQuery) {
      return res.status(400).json({ error: "Missing userQuery" });
    }
    if (!req.body.userQuery.chatId) {
      try {
        const { userQuery } = req.body;

        // Ensure both `userId` and `userQuery` are provided
        if (!userQuery) {
          return res.status(400).json({ error: "Missing userQuery" });
        }

        const chatId = generateUniqueId();

        // Get the current chat history for the user, or initialize a new one
        const historyKey = `c:${chatId}`;
        let fullChatHistory = await redisClient.lRange(historyKey, 0, -1);

        // parse redis data back into json
        fullChatHistory = fullChatHistory.map((entry: string) =>
          JSON.parse(entry)
        );

        let plantDetails = "";
        
        if (userQuery.plantName && userQuery.weatherData) {
          // If the user query includes plant details, add it to the chat history
          plantDetails = `Give me a plant care advice  for a ${userQuery.plantName} plant in 
                                     ${userQuery.weatherData.temperature}°C and ${userQuery.weatherData.humidity}% humidity?
                                     The plant will receive ${userQuery.weatherData.sunlightHours} hours of sunlight per day.`;

          // push new user query to redis
          const plantCareAdvice = { role: "user", content: plantDetails };
          await redisClient.rPush(historyKey, JSON.stringify(plantCareAdvice));
        }
        const newUserMessage = { role: "user", content: userQuery.prompt };
        
        await redisClient.rPush(historyKey, JSON.stringify(newUserMessage));

        // retrieve only the last four for ai history context
        const recentChatHistory = await redisClient.lRange(
          historyKey,
          -MAX_HISTORY,
          -1
        );
        const parsedRecentHistory = recentChatHistory.map((entry: string) =>
          JSON.parse(entry)
        );

        // call ai service with the last 4 chat messages
        const updatedChatHistory = await aiChatService(
          userQuery,
          parsedRecentHistory
        );

        // store the updated chat history in redis
        const aiResponseMessage = {
          role: "assistant",
          content: updatedChatHistory[updatedChatHistory.length - 1].content,
        };

        await redisClient.rPush(historyKey, JSON.stringify(aiResponseMessage));

        // Respond with the AI's reply and the full chat history;
        const aiResponse = aiResponseMessage.content;
        res.status(200).json({
          chatId: chatId,
          response: aiResponse,
          fullChatHistory: [
            ...fullChatHistory,
            newUserMessage,
            aiResponseMessage,
          ],
        });
      } catch (error) {
        console.error("Error in chatWithAI controller:", error);
        res
          .status(500)
          .json({ error: "Failed to process the AI chat request" });
      }
    } 
    else if (req.body.userQuery.chatId) {
      const { userQuery } = req.body;
      const chatId  = userQuery.chatId;
      const historyKey = `c:${chatId}`;
      let fullChatHistory = await redisClient.lRange(historyKey, 0, -1);

      // parse redis data back into json
      fullChatHistory = fullChatHistory.map((entry: string) =>
        JSON.parse(entry)
      );


      // retrieve only the last four for ai history context
      const recentChatHistory = await redisClient.lRange(
        historyKey,
        -MAX_HISTORY,
        -1
      );
      const parsedRecentHistory = recentChatHistory.map((entry: string) =>
        JSON.parse(entry)
      );

      // call ai service with the last 4 chat messages
      const updatedChatHistory = await aiChatService(
        userQuery,
        parsedRecentHistory
      );

      // store the updated chat history in redis
      const aiResponseMessage = {
        role: "assistant",
        content: updatedChatHistory[updatedChatHistory.length - 1].content,
      };

      
      const newUserMessage = { role: "user", content: userQuery.prompt };
      await redisClient.rPush(historyKey, JSON.stringify(newUserMessage));
      
      await redisClient.rPush(historyKey, JSON.stringify(aiResponseMessage));


      // Respond with the AI's reply and the full chat history;
      const aiResponse = aiResponseMessage.content;
      res.status(200).json({
        chatId: chatId,
        response: aiResponse,
        fullChatHistory: [
          ...fullChatHistory,
          { role: "user", content: userQuery.prompt },
          aiResponseMessage,
        ],
      });
    }
  } else if (req.method == "GET") {
    const { chatId } = req.params;
    const historyKey = `c:${chatId}`;
    const fullChatHistory = await redisClient.lRange(historyKey, 0, -1);
    const parsedChatHistory = fullChatHistory.map((entry: string) =>
      JSON.parse(entry)
    );
    res.status(200).json({ fullChatHistory: parsedChatHistory });
  }
};
