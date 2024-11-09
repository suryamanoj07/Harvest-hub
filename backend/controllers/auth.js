import jwt  from "jsonwebtoken";
import User from "../models/UserModel.js";
import bcryptjs from "bcryptjs"

export const signup = async(req,res) => {

    const {user_name,password,email,role} = req.body;
    try{
        const hashPassword = bcryptjs.hashSync(password,10);
        const newUser = new User({user_name,password:hashPassword,email,role});
        await newUser.save()

        res.json({
            "success":"true",
            "message" : "User created successfully!"
        })
    }catch(err){
        res.json({
            "success":"false",
            "message":`${err.message}`
        })
    }
}

export const login = async(req,res)=>{
    const {email,password} = req.body
    try{
        const validUser = await User.findOne({email})
        if(!validUser){
            return res.json({"success":"false","message":"No existing user with such email"})
        }
        const validPass = bcryptjs.compareSync(password,validUser.password)
        if(!validPass){
            return res.json({"success":"false","message":"Password incorrect"})
        }

        const token = jwt.sign({id:validUser._id},"secret#token")
        const {password:pass,...user} = validUser._doc
        return res.json({"success":"true",token,user})

    }catch(err){
        res.json({
            "success":"false",
            "message":`${err.message}`
        })
    }
}