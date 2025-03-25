import ProductModel from "../models/ProductModel.js";
import fs from "fs";

//add product item
export const addProduct = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);
        console.log("Received File:", req.file);

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image is required" });
        }

        const priceValue = parseFloat(req.body.price);
        if (isNaN(priceValue)) {
            return res.status(400).json({ success: false, message: "Invalid price value" });
        }

        const product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: priceValue, // Store as a valid number
            category: req.body.category,
            image: req.file.filename,
        });

        await product.save();
        console.log("Product saved successfully!");
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


// all product list
 export const listproduct =async (req,res)=>{
    try{
        const product=await ProductModel.find({});
        res.json({success:true,data:product});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server error"});
        res.json({success:false,message:error});
    }
}
//remove product item
export const removeProduct = async (req, res) => {
    try{
        const product = await ProductModel.findById(req.body.id);
        fs.unlink(`./uploads/${product.image }`,()=>{});
        await ProductModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product removed successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Server error"});
    }
}