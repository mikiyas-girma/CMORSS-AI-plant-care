import { Router } from "express";
import { getCareSuggestionForPlant } from "../controllers/careSuggestion/careSuggestionController.js";

const router = Router();

// Add a care suggestion to a plant
// router.post("/plants/:plantId/", addCareSuggestion);

// Get care suggestions for a specific plant
router.get("/plants/:plantId/", getCareSuggestionForPlant);

export default router;
