import { Request, Response } from "express";
import Chat from "../models/chat.model.js";

// Create a new chat
export const createChat = async (req: Request, res: Response) => {
  try {
    const newChat = new Chat(req.body);
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single chat by ID
export const getChatById = async (req: Request, res: Response) => {
  try {
    const chat = await Chat.findById(req.params.id).populate("userId");
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all chats
export const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().populate("userId");
    res.json(chats);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all chats of a user
export const getChatsByUserId = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find({ userId: req.params.userId }).populate(
      "userId"
    );
    res.json(chats);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Update a chat
export const updateChat = async (req: Request, res: Response) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedChat) return res.status(404).json({ error: "Chat not found" });
    res.json(updatedChat);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a chat
export const deleteChat = async (req: Request, res: Response) => {
  try {
    const deletedChat = await Chat.findByIdAndDelete(req.params.id);
    if (!deletedChat) return res.status(404).json({ error: "Chat not found" });
    res.status(204).send(); // No content to send on successful deletion
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
