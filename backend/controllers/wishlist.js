// routes/wishlist.js
import express from "express"
const router = express.Router();
import Wishlist from '../models/Wishlist.js'

const addToWishlist = async (req, res) => {
    const { userid, productId } = req.body;
  
    try {
      const newWishlistItem = new Wishlist({ userid, productId });
      await newWishlistItem.save();
      res.json({success:true, message: 'Product added to wishlist!' });
    } catch (error) {
      res.json({success:false, message: 'Error adding product to wishlist', error });
    }
  };
  
  // Remove product from wishlist
  const removeFromWishlist = async (req, res) => {
    const { userid, productId } = req.body;
  
    try {
      await Wishlist.findOneAndDelete({ userid, productId });
      res.json({ success:true,message: 'Product removed from wishlist!' });
    } catch (error) {
      res.json({ success:false,message: 'Error removing product from wishlist', error });
    }
  };
  
  // Get wishlist items for a user
  const getWishlistItems = async (req, res) => {
    const { userid } = req.params;
  
    try {
      const wishlistItems = await Wishlist.find({ userid }).populate('productId');
      res.json({success:true,message:wishlistItems});
    } catch (error) {
      res.json({success:false, message: 'Error fetching wishlist items', error });
    }
  };

  export {addToWishlist,removeFromWishlist,getWishlistItems}