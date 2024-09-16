import { Router } from "express";
import { chatWithAI } from "../controllers/careSuggestion/careSuggestionController.js";

const router = Router();


// start chat with ai
router.post('/', chatWithAI);

// continue with stored chat
router.get('/:chatId', chatWithAI);


export default router;
