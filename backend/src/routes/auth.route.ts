import express from 'express';

import {
  signin,
  signup,
  checkAuth, google,
  logout,
} from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post("/google", google);
router.get('/check', checkAuth);
router.post('/logout', logout);

export default router;
