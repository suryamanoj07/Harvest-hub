import User from '../models/UserModel.js'; // Adjust path based on your project structure
import bcryptjs from 'bcryptjs';

// Controller to fetch all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, message: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to create a new user
export const createUser = async (req, res) => {
    const { email, password, user_name, role } = req.body;
    

    if (!user_name) {
        return res.status(400).json({ success: false, message: 'Username is required' });
    }

    try {
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ email, password: hashPassword, user_name, role });
        await newUser.save();
        res.json({ success: true, message: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Controller to update an existing user
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { email, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { email, role }, { new: true });
        res.json({ success: true, message: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Controller to delete a user
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        await User.findByIdAndDelete(userId);
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};