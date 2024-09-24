// routes/wishlist.js
import express from "express"
const router = express.Router();
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistItems
} from './../controllers/wishlist.js'
import authMiddleware from "../middleware/auth.js";

// Add product to wishlist
router.post('/add',authMiddleware, addToWishlist);

// Remove product from wishlist
router.post('/remove',authMiddleware, removeFromWishlist);

// Get wishlist items for a user
router.get('/list',authMiddleware, getWishlistItems);

export default router
