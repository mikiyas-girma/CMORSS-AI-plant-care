import { Request, Response } from "express";
import {
  createPlantService,
  getAllPlantsService,
  getPlantService,
  getUserPlantsService,
  updatePlantService,
  deletePlantService
} from "../services/plant.service.js";

export const createPlant = async (req: Request, res: Response) => {
  try {
    const plant = await createPlantService(req.body);
    res.status(201).json(plant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlant = async (req: Request, res: Response) => {
  try {
    const plant = await getPlantService(req.params.id);
    res.status(200).json(plant);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllPlants = async (req: Request, res: Response) => {
  try {
    const plants = await getAllPlantsService();
    res.status(200).json(plants);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserPlants = async (req: Request, res: Response) => {
  try {
    const plants = await getUserPlantsService(req.params.userId);
    res.status(200).json(plants);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updatePlant = async (req: Request, res: Response) => {
  try {
    const plant = await updatePlantService(req.params.id, req.body);
    res.status(200).json(plant);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deletePlant = async (req: Request, res: Response) => {
  try {
    await deletePlantService(req.params.id);
    res.status(200).json({ message: `Plant ${req.params.id} deleted` });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
