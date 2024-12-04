import User from '../models/UserModel.js'; // Adjust path based on your project structure
import Order from '../models/orderModel.js';
import productModel from '../models/ProductModel.js';
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
    const { email, password, username, role } = req.body;
    try {
        const hashPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({ email, password: hashPassword, username, role });
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

export const getDashboardStats = async (req, res) => {
    try {
      const totalUsers = await User.countDocuments();
      const totalProducts = await productModel.countDocuments();
      const totalRevenue = await Order.aggregate([
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]);
  
      res.json({
        success: true,
        data: {
          totalUsers,
          totalProducts,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
      });
    } catch (error) {
      res.json(error.message)
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

export const getUserGrowthData = async (req, res) => {
    try {
      const userGrowthData = await User.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            totalUsers: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]);
  
      const labels = userGrowthData.map((data) => data._id);
      const users = userGrowthData.map((data) => data.totalUsers);
  
      res.json({
        success: true,
        data: { labels, users },
      });
    } catch (error) {
        res.json(error.message)
    }
  };

  export const getRevenueData = async (req, res) => {
    const { period } = req.query;
    let startDate;
  
    switch (period) {
      case "1month":
        startDate = new Date(new Date().setMonth(new Date().getMonth() - 1));
        break;
      case "6months":
        startDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
        break;
      case "1year":
        startDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
        break;
      case "all":
      default:
        startDate = new Date(0);
        break;
    }
  
    try {
      const orders = await Order.find({ createdAt: { $gte: startDate } });
      const revenueData = {};
  
      orders.forEach((order) => {
        const month = new Date(order.createdAt).toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        if (!revenueData[month]) revenueData[month] = 0;
        revenueData[month] += order.amount;
      });
  
      const labels = Object.keys(revenueData);
      const revenue = Object.values(revenueData);
  
      res.json({
        success: true,
        data: { labels, revenue },
      });
    } catch (error) {
        res.json(error.message)
    }
  };

  export const getTopSellers = async (req, res) => {
    try {
      const sellers = await Order.aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.email",
            name: { $first: "$items.name" },
            stock: { $sum: "$items.stockQuantity" },
            revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
          },
        },
        { $sort: { revenue: -1 } },
        { $limit: 5 },
      ]);
  
      res.json({ success: true, data: sellers });
    } catch (error) {
        res.json(error.message)
    }
  };