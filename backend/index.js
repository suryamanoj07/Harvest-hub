import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'
import userRouter from './routes/user.route.js'
import toolRouter from './routes/tools.route.js'
import wishlistRouter from './routes/wishlist.js'
import adminRouter from './routes/admin.route.js'; 
import feedbackRouter from './routes/feedback.route.js'

mongoose.connect("mongodb+srv://manojsurya463:BjxbMbniGwKlMbmT@cluster0.tjaza.mongodb.net/MERN-farmers?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("working"));

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/tool", toolRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishlistRouter);
app.use('/api/admin', adminRouter);
app.use("/api/user", userRouter);
app.use("/api/feedback",feedbackRouter)
// app.use("/api/profile", profileRoutes);

app.listen(3000, () => console.log("Server is running on Port 3000!"));