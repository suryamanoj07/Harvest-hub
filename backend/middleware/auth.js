import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised"})
    }
    try{
        const token_decode = jwt.verify(token,"secret#token")
        req.body.userid = token_decode.id;
        next();
    }catch(err){
        res.json({sucess:false,message:err.message})
    }
}

export default authMiddleware;