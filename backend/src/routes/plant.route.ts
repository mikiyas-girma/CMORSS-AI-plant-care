import express, { Request, Response } from 'express';
import { identifyPlant } from '../controllers/plant.image.controller.js';
import {
  createPlant,
  getPlant,
  getAllPlants,
  getUserPlants,
  updatePlant,
  deletePlant,
} from '../controllers/plant.controller.js';

const router = express.Router();

router.post('/identify', identifyPlant);
router.post('/', createPlant);
router.get('/single/:id', getPlant);
router.get('/', getAllPlants);
router.get('/:userId', getUserPlants);
router.put('/:id', updatePlant);
router.delete('/:id', deletePlant);

export default router;
