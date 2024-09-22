import express from 'express'
import { addtool, deletetool, listtool } from '../controllers/tools.js'
import multer from 'multer'

const toolRouter = express.Router()

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

toolRouter.post("/addtool",upload.single("image"),addtool)
toolRouter.get("/listtool",listtool)
toolRouter.post("/deletetool/:id",deletetool)



export default toolRouter