// models/Wishlist.js
import mongoose from "mongoose"

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Assuming you have a Product model
    required: true,
  },
});

const wishlist = mongoose.model('Wishlist', WishlistSchema);
export default wishlist
