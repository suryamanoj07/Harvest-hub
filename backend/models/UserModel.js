import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user_name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: {
      type: String,
      default:
        'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },
    role: { type: String, required: true },
    personal_address: { type: String, default: "" },
    contact_number: { type: String, default: "" },
    profile_image_id: { type: String, default: 'default.png' },
    cartData: { type: Object, default: {} },
    business_name: { type: String, default: "" },
    business_email: { type: String, default: "" },
    business_contact_number: { type: String, default: "" },
    business_address: { type: String, default: "" },
    business_account_number: { type: String, default: "" },
    business_gstin: { type: String, default: "" },
    business_about: { type: String, default: "" }
}, { minimize: false });

const User = mongoose.model("User", userSchema);
export default User;
