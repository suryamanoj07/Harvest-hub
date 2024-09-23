import express from 'express';
import { getUserProfile, profileImage, updateUserProfile, ping } from '../controllers/user.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// Define routes
router.get("/ping", ping);
router.post("/get-user-profile", upload.none(), getUserProfile);
router.post("/profile-image", upload.none(), profileImage);
router.post("/update-profile", upload.none(), updateUserProfile);

export default router;
