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

export {addProduct,listProduct,deleteProduct,searchProduct}