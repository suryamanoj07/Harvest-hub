import fs from "fs";
import toolModel from "../models/toolModel.js";

const addtool = async(req,res)=>{

    let image_filename = `${req.file.filename}`

    const tool = new toolModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image : image_filename
    })

    try{
        await tool.save()
        res.json({success:true,message:"tool added successfully"})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }

}

const listtool = async(req,res)=>{
    try{
        const tools = await toolModel.find({})
        res.json({success:true,message:tools})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const searchTool = async(req,res)=>{
    const {search} = req.params
    try{
        if(search==""){
            const tools = await toolModel.find({})
            return res.json({success:true,message:tools})
        }
        const tools = await toolModel.find({name:{$regex:search,$options:"i"}})
        res.json({success:true,message:tools})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const deletetool=async(req,res)=>{
    try{
        const tool = await toolModel.findById(req.params.id)
        fs.unlink(`uploads/${tool.image}`,()=>{})
        await toolModel.findByIdAndDelete(req.params.id)
        res.json({success:true,message:"tool deleted successfully"})
    }catch(err){
        res.json({success:false,message:`${err.message}`})
    }
}

const fastSellingItems = async (req, res) => {
    try {
      // Fetch products with stock > 0, sorted by stock quantity in ascending order (least stock first)
      const products = await toolModel.find({ stockQuantity: { $gt: 0 } })
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
      const products = await toolModel.find()
        .sort({ updatedAt: -1 }) // Sort by createdAt in descending order (newest first)
        .limit(10); // Limit to top 5 most recent products
  
      res.json({ success: true, message: products });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
};

export {addtool,listtool,deletetool,searchTool,fastSellingItems,newlyAddedProducts}