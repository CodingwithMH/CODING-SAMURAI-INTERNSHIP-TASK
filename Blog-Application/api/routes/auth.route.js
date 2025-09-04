import express from 'express';
import { getCurrentUser, google, signin, signup } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);
router.post('/me', verifyToken,getCurrentUser)
router.post('/google', google)

export default router;