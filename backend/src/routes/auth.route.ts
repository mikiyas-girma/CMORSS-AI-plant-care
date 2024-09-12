import express from 'express';
import { signin, signup, checkAuth } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/check", checkAuth);

export default router;
