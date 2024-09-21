import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/auth.route.js'
import cors from 'cors'
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js'
import orderRouter from './routes/order.route.js'


mongoose.connect("mongodb+srv://manojsurya463:BjxbMbniGwKlMbmT@cluster0.tjaza.mongodb.net/MERN-farmers?retryWrites=true&w=majority&appName=Cluster0")
        .then(()=>console.log("Connected to DB"))
        .catch((err)=>console.log(err)
        )

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>res.send("working"))

app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/images",express.static('uploads'))
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)




app.listen(3000,() => console.log("Server is running on Port 3000!"))