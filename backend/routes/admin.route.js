import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser , getDashboardStats ,getUserGrowthData} from '../controllers/admin.js'; // Adjust path as needed

const adminRouter = express.Router();

// Route for fetching all users
adminRouter.get('/users', getAllUsers);

// Route for creating a user
adminRouter.post('/users', createUser);

// Route for updating a user
adminRouter.put('/users/:userId', updateUser);

// Route for deleting a user
adminRouter.delete('/users/:userId', deleteUser);

adminRouter.get('/dashboard-stats', getDashboardStats);

adminRouter.get('/user-growth-data', getUserGrowthData);

export default adminRouter;
