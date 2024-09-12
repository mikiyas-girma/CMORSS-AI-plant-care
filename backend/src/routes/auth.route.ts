import express from 'express';
import { signin, signup, checkAuth, logout } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/check", checkAuth);
router.post("/logout", logout);

export default router;
