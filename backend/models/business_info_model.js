import mongoose from 'mongoose';

const { Schema } = mongoose;

const BusinessInfoSchema = new Schema({
    personal_contact_number: {
        type: String,
        required: true,
    },
    business_name: {
        type: String,
        default: 'My new shop'
    },
    business_email: {
        type: String,
        default: '',
    },
    business_contact_number: {
        type: String,
        default: '',
    },
    business_address: {
        type: String,
        default: '',
    },
    business_account_number: {
        type: String,
        default: '',
    },
    business_gstin: {
        type: String,
        default: '',
    },
    business_about: {
        type: String,
        default: '',
    },
    logo_image_id: {
        type: String,
        default: 'default.png'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const BusinessInfo = mongoose.model('BusinessInfo', BusinessInfoSchema);

export default BusinessInfo;