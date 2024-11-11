import express from 'express'
import { addProduct, deleteProduct, listProduct,searchProduct, fastSellingItems, newlyAddedProducts } from '../controllers/product.js'
import multer from 'multer'

const productRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add",upload.single("image"),addProduct)
productRouter.get("/list",listProduct)
productRouter.get("/topselling",fastSellingItems)
productRouter.get("/recentadded",newlyAddedProducts)
productRouter.get("/search/:search",searchProduct)
productRouter.post("/delete/:id",deleteProduct)

export default productRouter