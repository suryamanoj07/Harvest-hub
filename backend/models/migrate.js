import mongoose from 'mongoose'
import productModel from './ProductModel.js';

mongoose.connect('mongodb+srv://manojsurya463:BjxbMbniGwKlMbmT@cluster0.tjaza.mongodb.net/MERN-farmers', { useNewUrlParser: true, useUnifiedTopology: true });

async function migrateProducts() {
  try {
    // Set default values for new fields
    await productModel.updateMany({}, {
      $set: {
        stockQuantity: 50,
        status: 'On Sale',
        ratings: 0,
        reviews: [],
        discount: 0,
        seller: null,
      }
    });
    
    console.log('Products updated successfully!');
  } catch (error) {
    console.error('Error updating products:', error);
  } finally {
    mongoose.connection.close();
  }
}

async function addCreatedAtToExistingDocuments() {
    try {
      // Update documents that have `updatedAt` but are missing `createdAt`
      await productModel.updateMany(
        { createdAt: { $exists: false } },
        { $set: { createdAt: new Date() } } // Set to the current date or any specific date you prefer
      );
  
      console.log('createdAt field added to existing documents!');
    } catch (error) {
      console.error('Error adding createdAt field:', error);
    } finally {
      mongoose.connection.close();
    }
  }

// migrateProducts();
addCreatedAtToExistingDocuments();
