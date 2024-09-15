import { Router } from "express";
import { getCareSuggestionForPlant, chatWithAI } from "../controllers/careSuggestion/careSuggestionController.js";

const router = Router();

// Add a care suggestion to a plant
// router.post("/plants/:plantId/", addCareSuggestion);

// Get care suggestions for a specific plant
router.get("/plants/:plantId/", getCareSuggestionForPlant);

// Follow up with the AI
router.post('/chat', chatWithAI);


export default router;
