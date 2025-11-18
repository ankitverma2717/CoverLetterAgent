import express from 'express';
import { 
    initiateGoogleAuth, 
    googleAuthCallback, 
    refreshToken, 
    logout,
    getUserProfile 
} from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/google', initiateGoogleAuth);

router.get('/google/callback', googleAuthCallback);

router.post('/refresh', refreshToken);

router.post('/logout', authenticate, logout);

router.get('/profile', authenticate, getUserProfile);

export default router;
