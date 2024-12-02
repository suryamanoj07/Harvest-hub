import express from 'express'
import { addProduct, deleteProduct, listProduct,searchProduct, fastSellingItems, newlyAddedProducts, farmerList,updateProduct,farmerDelete,farmerRevenue} from '../controllers/product.js'
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
productRouter.post("/farmerlist",farmerList)
productRouter.post("/farmerrevenue",farmerRevenue)
productRouter.put("/farmerupdate/:id",updateProduct)
productRouter.delete("/farmerdelete/:id",farmerDelete)
productRouter.get("/topselling",fastSellingItems)
productRouter.get("/recentadded",newlyAddedProducts)
productRouter.get("/search/:search",searchProduct)
// productRouter.post("/delete/:id",deleteProduct)
// productRouter.post('/rating', addRating); // Add or update rating
// productRouter.post('/review', addReview); // Add review
// productRouter.get('/:id', getProductDetails); // Get product details
// productRouter.post("/rate",addRating)


export default productRouter