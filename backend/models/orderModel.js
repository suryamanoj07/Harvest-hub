import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userid:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    Date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})

const Order = mongoose.model("order",orderSchema)
export default Order