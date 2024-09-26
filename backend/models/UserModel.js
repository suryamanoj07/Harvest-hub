import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    user_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
