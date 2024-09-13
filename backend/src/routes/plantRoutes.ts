import { Router } from 'express';
import {
  createPlant,
  getCareSuggestionForPlant,
  getAllPlants,
  deletePlant,
} from '../controllers/plantController.js';

const router = Router();

// Route to create a new plant
router.post('/plants', createPlant);

// Route to fetch care suggestion for a plant
router.get('/plants/:plantId/care-suggestion', getCareSuggestionForPlant);

// Route to get all plants
router.get('/plants', getAllPlants);

// Route to delete a plant
router.delete('/plants/:plantId', deletePlant);

export default router;
