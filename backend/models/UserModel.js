import mongoose from "mongoose"

const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    personal_address:{type:String,default:""},
    contact_number:{type:String,default:""},
    profile_image_id:{type:String,default:'deafult.png'},
    cartData:{type:Object,default:{}}
},{minimize:false})

const User = mongoose.model("User",userSchema)
export default User