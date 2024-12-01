import mongoose from "mongoose";

const toolSchema = new mongoose.Schema({
    name : {type:String,required:true},
    description : {type:String,required:true},
    price : {type:Number,required:true},
    image : {type:String,required:true},
    category : {type:String,required:true},
    stockQuantity: { type: Number, required: true, default: 50 },
    status: { type: String, enum: ['Sold Out', 'On Sale'], default: 'On Sale' },
    ratings: { type: Number, min: 0, max: 5, default: 0 },
    reviews: [{ 
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
      comment: String, 
      rating: { type: Number, min: 0, max: 5 } 
    }],
    discount: { type: Number, default: 0 },
    seller: { type: String, default: null }, 
    email: { type: String, required: true } 
}, { timestamps: true })

const toolModel = mongoose.model('Tool',toolSchema)
export default toolModel