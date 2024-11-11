import express from 'express'
import { addtool, deletetool, listtool, searchTool, fastSellingItems, newlyAddedProducts } from '../controllers/tools.js'
import multer from 'multer'

const toolRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

toolRouter.post("/add",upload.single("image"),addtool)
toolRouter.post("/delete/:id",deletetool)
toolRouter.get("/topselling",fastSellingItems)
toolRouter.get("/recentadded",newlyAddedProducts)
toolRouter.get("/list",listtool)
toolRouter.get("/search/:search",searchTool)

export default toolRouter