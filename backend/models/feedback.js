import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  message: { type: String, required: true },
  customerSatisfaction: { type: String, required: true }, // happy, neutral, sad
  isWebsiteUseful: { type: String, required: true }, // yes, no
  productFeedback: { type: String, required: true }, // good, bad, ok, excellent
  overallRating: { type: Number, required: true }, // 1-5
},{timestamps : true});

const Feedback = mongoose.model('Feedback', feedbackSchema);

  
export default Feedback