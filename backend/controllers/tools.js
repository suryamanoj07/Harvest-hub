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

export {addtool,listtool,deletetool}