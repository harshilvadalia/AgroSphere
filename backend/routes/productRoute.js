import express from 'express';
import {addProduct,listproduct,removeProduct} from '../controllers/productController.js';
import multer from 'multer'; //for image

const productRouter = express.Router(); //to create get method,post method


//image storage engine
const storage = multer.diskStorage({
   destination:"./uploads/",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const upload = multer({storage:storage})   
productRouter.post('/add',upload.single("image"),addProduct); //to add product
productRouter.get("/list",listproduct); //to get product list
productRouter.post("/remove",removeProduct); //to remove product


export default productRouter; //to use in server.js