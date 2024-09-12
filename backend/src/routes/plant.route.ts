import express, { Request, Response } from "express";
import { identifyPlant } from "../controllers/plant.controller.js";

const router = express.Router();

router.post("/identify", identifyPlant);

export default router;
