const Category = require("../models/category");
const Product = require("../models/product");
const express = require("express");

const productRouter = express.Router();

productRouter.post("/product/create/:categoryName", async (req, res) => {
  try {
    const { categoryName } = req.params;
    const category = await Category.findOne({
      name: { $regex: `^${categoryName}$`, $options: "i" },
    });
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const product = new Product({ ...req.body, categoryId: category._id });

    await product.save();
    res.status(200).json({
      success: true,
      message: "Product create successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while creating product " + error.message,
    });
  }
});

productRouter.get("/product/:categoryId", async (req, res) => {
  try {
    console.log("inside ckk");
    const { categoryId } = req.params;
    console.log("cat", typeof categoryId);
    const category = await Category.findById(categoryId);
    console.log("category", category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category does not exist",
      });
    }

    const products = await Product.find({ categoryId });
    console.log("products", products);
    if (products.length === 0) {
      return res.status(404).json({
        success: true,
        message: "Product not found.",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products founded.",
      products: products,
      count: products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in product of this category " + error.message,
    });
  }
});

productRouter.get("/product", async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "name");

    if (products.length === 0) {
      return res.status(404).json({
        success: true,
        message: "Product not found.",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products founded.",
      products: products,
      count: products.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in all product " + message.error,
    });
  }
});

productRouter.get("/productDetail/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    return res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in all product " + message.error,
    });
  }
});

productRouter.put("/product/edit/:productId", async (req, res) => {
  try {
    console.log("Insdie d",req.params)
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product  id is required",
      });
    }
    const { name, description, price } = req.body;
    if (!name && !description && !price) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }
    const product = await Product.findByIdAndUpdate(productId,req.body,{returnDocument: "after",});
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
      
    return res.status(200).json({
      success:true,
      message: "Product updated successfully",
      product
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in  product edit" + error.message,
    });
  }
});

productRouter.delete("/product/delete/:productId",async(req,res)=>{
   try{
      console.log("Insdie ddletet product id",req.params)
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product  id is required",
      });
    }
    const deletedProduct=await Product.findByIdAndDelete(productId);
      if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });

   } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in  product edit" + error.message,
    });
  }
});

module.exports = productRouter;
