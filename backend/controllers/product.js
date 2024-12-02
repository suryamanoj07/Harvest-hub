import fs from "fs";
import productModel from "../models/ProductModel.js";
import Order from "../models/orderModel.js";


const addProduct = async(req,res)=>{

    let image_filename = `${req.file.filename}`

    const product = new productModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename,
        email: req.body.email
    })

    try{
        await product.save()
        res.json({success:true,message:"Product added successfully"})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }

}

const listProduct = async(req,res)=>{
    try{
        const products = await productModel.find({})
        res.json({success:true,message:products})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const farmerList = async (req, res) => {
    const { email } = req.body;

    // Validate email parameter
    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required." });
    }

    try {
        // Find products by farmer's email
        const products = await productModel.find({ email });

        if (products.length === 0) {
            return res.json({ success: true, message: "No products found for this farmer.", products: [] });
        }

        // Return found products
        res.json({ success: true, message: "Products retrieved successfully.", products });
    } catch (error) {
        res.status(500).json({ success: false, message: `Error fetching products: ${error.message}` });
    }
}

const farmerDelete = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await productModel.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error deleting product", error: err.message });
    }
  };

  const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, stockQuantity, status } = req.body;
  
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, {
        name,
        description,
        price,
        category,
        stockQuantity,
        status
      }, { new: true });
  
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
  
      res.status(200).json({ success: true, message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
      res.status(500).json({ success: false, message: "Error updating product", error: err.message });
    }
  };
  
  const getDateRange = (timePeriod) => {
    const now = new Date();
    switch (timePeriod) {
      case "30min":
        return new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago
      case "2hrs":
        return new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
      case "1day":
        return new Date(now.getTime() - 24 * 60 * 60 * 1000); // 1 day ago
      case "1week":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago
      default:
        return new Date(0); // All-time records
    }
  };
  
  const farmerRevenue = async (req, res) => {
    try {
      const { email, timePeriod } = req.body;
  
      // Calculate the start date for the filter
      const startDate = getDateRange(timePeriod);
  
      // Fetch orders placed within the time period
      const orders = await Order.find({
        createdAt: { $gte: startDate },
      });
  
      // Initialize total revenue and items sold
      let totalRevenue = 0;
      let totalItemsSold = 0;
      let soldProducts = [];
  
      // Loop through each order and calculate revenue and sold items for the farmer
      for (const order of orders) {
        for (const item of order.items) {
          if (item.email === email) {
            const revenue = item.price * item.quantity; // Assuming item has price and quantity fields
            totalRevenue += revenue;
            totalItemsSold += item.quantity;
            soldProducts.push(item);
          }
        }
      }
  
      res.json({
        success: true,
        soldProducts,
        revenue: totalRevenue,
        totalItemsSold: totalItemsSold,
      });
    } catch (error) {
      console.error("Error fetching sold products and revenue:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  


const searchProduct = async(req,res)=>{
    const {search} = req.params
    try{
        if(search==""){
            const products = await productModel.find({})
            return res.json({success:true,message:products})
        }
        const products = await productModel.find({name:{$regex:search,$options:"i"}})
        res.json({success:true,message:products})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const deleteProduct=async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.id)
        fs.unlink(`uploads/${product.image}`,()=>{})
        await productModel.findByIdAndDelete(req.params.id)
        res.json({success:true,message:"Product deleted successfully"})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const fastSellingItems = async (req, res) => {
    try {
      // Fetch products with stock > 0, sorted by stock quantity in ascending order (least stock first)
      const products = await productModel.find({ stockQuantity: { $gt: 0 } })
        .sort({ stockQuantity: 1 })
        .limit(10); // Limit to top 5 products
  
      res.json({ success: true, message: products });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
};

const newlyAddedProducts = async (req, res) => {
    try {
      // Fetch the top 5 most recently added products (sorted by creation date descending)
      const products = await productModel.find()
        .sort({ createdAt: -1 }) // Sort by createdAt in descending order (newest first)
        .limit(10); // Limit to top 5 most recent products
  
      res.json({ success: true, message: products });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
};

// const addRating = async (req, res) => {
//     const { productId, userId, rating } = req.body;
  
//     if (rating < 1 || rating > 5) {
//       return res.status(400).json({ success: false, message: "Invalid rating" });
//     }
  
//     try {
//       const product = await productModel.findById(productId);
//       if (!product) return res.status(404).json({ success: false, message: "Product not found" });
  
//       // Check if the user has already rated this product
//       const existingRating = product.ratings.ratingDetails.find(
//         (item) => item.userId.toString() === userId
//       );
  
//       if (existingRating) {
//         // Update existing rating
//         existingRating.rating = rating;
//       } else {
//         // Add new rating
//         product.ratings.ratingDetails.push({ userId, rating });
//         product.ratings.totalRatings += 1;
//       }
  
//       // Recalculate average rating
//       const totalRatingSum = product.ratings.ratingDetails.reduce((acc, item) => acc + item.rating, 0);
//       product.ratings.averageRating = totalRatingSum / product.ratings.ratingDetails.length;
  
//       await product.save();
//       res.json({ success: true, message: "Rating submitted successfully", averageRating: product.ratings.averageRating });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };

export {addProduct,listProduct,deleteProduct,searchProduct,fastSellingItems,newlyAddedProducts,farmerList,updateProduct,farmerDelete, farmerRevenue}