import User from "../models/UserModel.js";
 
const addToCart=async(req,res)=>{
    try{
        let userData= await User.findOne({_id:req.body.userid})
        let cartData= await userData.cartData
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await User.findByIdAndUpdate(req.body.userid,{cartData})
        res.json({success:true,message:"Added to cart"})
    }
    catch(err){ 
        res.json({success:false,message:err.message})
    }
}

const removeFromCart=async(req,res)=>{
    try{
        let userData= await User.findOne({_id:req.body.userid})
        let cartData=await userData.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }
        await User.findByIdAndUpdate(req.body.userid,{cartData})
        res.json({success:true,message:"Removed from cart"})
    }
    catch(err){ 
        res.json({success:false,message:err.message})
    }
}

const getCart=async(req,res)=>{
    try{
        let userData= await User.findOne({_id:req.body.userid})
        let cartData=await userData.cartData
        res.json({success:true,cartData})
    }
    catch(err){ 
        res.json({success:false,message:"here"})
    }
}

export {addToCart,removeFromCart,getCart}