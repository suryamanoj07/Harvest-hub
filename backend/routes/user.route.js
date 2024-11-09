import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.js';

const router = express.Router();

router.post('/get-user-profile', getUserProfile);
router.post('/update-profile', updateUserProfile);

export default router;