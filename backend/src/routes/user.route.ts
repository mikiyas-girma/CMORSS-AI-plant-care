import express from 'express';
import { updateProfile, updatePassword } from '../controllers/user.controllers.js';

const router = express.Router();

router.put("/update-profile", updateProfile);
router.put("/update-password", updatePassword);

export default router;
