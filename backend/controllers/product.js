import fs from "fs";
import productModel from "../models/ProductModel.js";

const addProduct = async(req,res)=>{

    let image_filename = `${req.file.filename}`

    const product = new productModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
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
        .sort({ createdAt: 1 }) // Sort by createdAt in descending order (newest first)
        .limit(10); // Limit to top 5 most recent products
  
      res.json({ success: true, message: products });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
};

export {addProduct,listProduct,deleteProduct,searchProduct,fastSellingItems,newlyAddedProducts}