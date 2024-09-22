import mongoose from "mongoose"

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const User = mongoose.model("User",userSchema)
export default User