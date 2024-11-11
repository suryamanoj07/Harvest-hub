import mongoose from "mongoose";
import productModel from "./ProductModel.js";

mongoose.connect(
  "mongodb+srv://manojsurya463:BjxbMbniGwKlMbmT@cluster0.tjaza.mongodb.net/MERN-farmers",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

async function migrateProducts() {
  try {
    // Set default values for new fields
    await productModel.updateMany(
      {},
      {
        $set: {
          stockQuantity: 50,
          status: "On Sale",
          ratings: 0,
          reviews: [],
          discount: 0,
          seller: null,
        },
      }
    );

    console.log("Products updated successfully!");
  } catch (error) {
    console.error("Error updating products:", error);
  } finally {
    mongoose.connection.close();
  }
}

async function addCreatedAtToExistingDocuments() {
  try {
    const products = await productModel.find().sort({ _id: 1 }); // Sort by _id to ensure ordering
    let timestamp = new Date();
    const intervalSeconds = 30; // 2 minutes

    for (const product of products) {
      timestamp = new Date(timestamp.getTime() + intervalSeconds * 1000); 

      await productModel.findByIdAndUpdate(product._id, { createdAt: timestamp });
      console.log(
        `Updated product ${product.name} with createdAt: ${timestamp}`
      );
    }
    console.log("All products updated with createdAt timestamps");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error updating products:", error);
    mongoose.connection.close();
  }
}

// migrateProducts();
addCreatedAtToExistingDocuments();
