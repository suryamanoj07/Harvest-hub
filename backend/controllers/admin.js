import User from '../models/UserModel.js';
import Product from '../models/ProductModel.js';
import Order from '../models/orderModel.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, message: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

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
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalSales = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    const totalProducts = await Product.countDocuments();
    const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalAmount' } } }]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalSales: totalSales[0]?.total || 0,
        totalProducts,
        totalRevenue: totalRevenue[0]?.total || 0, // Include totalRevenue in the response
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSalesData = async (req, res) => {
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalAmount' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const labels = salesData.map((data) => data._id);
    const sales = salesData.map((data) => data.totalSales);

    res.json({
      success: true,
      data: {
        labels,
        sales,
      },
    });
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
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const labels = userGrowthData.map((data) => data._id);
    const users = userGrowthData.map((data) => data.totalUsers);

    res.json({
      success: true,
      data: {
        labels,
        users,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};