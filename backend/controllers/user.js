import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

// Fetch user profile details
export const getUserProfile = async (req, res) => {
    const { user_auth_token } = req.body;
    try {
        const decoded = jwt.verify(user_auth_token, "secret#token");
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        res.json({
            status: 'ok',
            user_details: {
                user_name: user.username,
                email: user.email,
                contact_number: user.contact_number,
                personal_address: user.personal_address,
                role: user.role,
                business_name: user.business_name,
                business_email: user.business_email,
                business_contact_number: user.business_contact_number,
                business_address: user.business_address,
                business_account_number: user.business_account_number,
                business_gstin: user.business_gstin,
                business_about: user.business_about,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    const { user_auth_token, user_name, email, contact_number, personal_address, business_name, business_email, business_contact_number, business_address, business_account_number, business_gstin, business_about } = req.body;

    try {
        const decoded = jwt.verify(user_auth_token, "secret#token");
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ status: 'error', message: 'User not found' });
        }

        user.user_name = user_name;
        user.email = email;
        user.contact_number = contact_number;
        user.personal_address = personal_address;

        if (user.role === 'farmer') {
            user.business_name = business_name;
            user.business_email = business_email;
            user.business_contact_number = business_contact_number;
            user.business_address = business_address;
            user.business_account_number = business_account_number;
            user.business_gstin = business_gstin;
            user.business_about = business_about;
        }

        await user.save();
        res.json({
            status: 'ok',
            message: 'Profile updated successfully',
            user_details: {
                user_name: user.user_name,
                email: user.email,
                contact_number: user.contact_number,
                personal_address: user.personal_address,
                role: user.role,
                business_name: user.business_name,
                business_email: user.business_email,
                business_contact_number: user.business_contact_number,
                business_address: user.business_address,
                business_account_number: user.business_account_number,
                business_gstin: user.business_gstin,
                business_about: user.business_about,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
