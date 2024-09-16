import express from "express";
import {
  createChat,
  getChatById,
  getAllChats,
  getChatsByUserId,
  updateChat,
  deleteChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", createChat); // Create a new chat
router.get("/single/:id", getChatById); // Get a single chat by ID
router.get("/", getAllChats); // Get all chats
router.get("/:userId", getChatsByUserId); // Get all chats of a user
router.put("/:id", updateChat); // Update a chat
router.delete("/:id", deleteChat); // Delete a chat

export default router;
