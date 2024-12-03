import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";
import Order from "../models/orderModel.js";
import bcryptjs from "bcryptjs";

// Helper function for error responses
const sendErrorResponse = (res, status, message) => {
  res.status(status).json({ success: false, message });
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ success: true, message: users });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { email, password, username, role } = req.body;

  // Validate request body
  if (!email || !password || !username || !role) {
    return sendErrorResponse(res, 400, "Email, username, role, and password are required.");
  }

  try {
    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ email, password: hashPassword, username, role });
    await newUser.save();
    res.json({ success: true, message: newUser });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
};

// Update user details
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const {
    email,
    username,
    role,
    contact_number,
    personal_address,
    business_name,
    business_email,
    business_contact_number,
    business_address,
    business_account_number,
    business_gstin,
    business_about,
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found.");
    }

    // Update fields if provided
    if (email) user.set("email", email || user.email);
    if (username) user.set("username", username || user.username);
    if (role) user.set("role", role || user.role);
    if (contact_number) user.set("contact_number", contact_number || user.contact_number);
    if (personal_address) user.set("personal_address", personal_address || user.personal_address);
    if (business_name) user.set("business_name", business_name || user.business_name);
    if (business_email) user.set("business_email", business_email);
    if (business_contact_number) user.set("business_contact_number", business_contact_number || user.business_contact_number);
    if (business_address) user.set("business_address", business_address || user.business_address);
    if (business_account_number) user.set("business_account_number", business_account_number || user.business_account_number);
    if (business_gstin) user.set("business_gstin", business_gstin || user.business_gstin);
    if (business_about) user.set("business_about", business_about || user.business_about);

    await user.save();
    res.json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, "Internal server error.");
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
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
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
};

// Get user growth data
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
    console.error(error);
    sendErrorResponse(res, 500, error.message);
  }
};

// Get revenue data
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
    console.error(error);
    sendErrorResponse(res, 500, "Error fetching revenue data.");
  }
};

// Get top sellers
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
    console.error(error);
    sendErrorResponse(res, 500, "Error fetching top sellers data.");
  }
};
