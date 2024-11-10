import Order from "../models/orderModel.js";
import User from "../models/UserModel.js";
import productModel from "../models/ProductModel.js";


const placeOrder = async (req, res) => {
  try {
    const newOrder = new Order({
      userid: req.body.userid,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    for (const item of req.body.items) {
      const product = await productModel.findById(item._id);
      if (!product) return res.json({ success: false, message: `Product with ID ${item._id} not found` });
      if (product.stockQuantity < item.quantity){
        // alert(`Insufficient stock for ${product.name}`)
        return res.json({ success: false, message: `Insufficient stock for ${product.name}` });
      } 
      product.stockQuantity -= item.quantity;
      if (product.stockQuantity === 0) product.status = "Sold Out";

      await product.save();
    }

    await User.findByIdAndUpdate(req.body.userid, { cartData: {} });
    let success_url = `http://localhost:3000/verify?success=true&orderId=${newOrder._id}`;
    res.json({ success: true, message: "order successful", success_url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    const count = await Order.countDocuments({});
    const tenMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
    const count2 = await Order.countDocuments({
      createdAt: { $gte: tenMinutesAgo },
    });
    res.json({ success: true, message: orders, count,count2 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userid: req.body.userid });
    const count = await Order.countDocuments({ userid: req.body.userid });
    const tenMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
    const count2 = await Order.countDocuments({
        createdAt: { $gte: tenMinutesAgo },
      });
    res.json({ success: true, message: orders, count,count2 });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
      console.log("ok hjob");
    } else {
      await Order.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Not  Verified" });
  }
};

const updateStatus = async (req, res) => {
  console.log(req.body);
  try {
    await Order.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder };
