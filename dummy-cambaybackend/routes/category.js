const Category = require("../models/category");
const express = require("express");

const categoryRouter = express.Router();

categoryRouter.post("/category/create", async (req, res) => {
 
  try {
    const category = new Category(req.body);
    
    await category.save();
    res.status(200).json({
      success: true,
      message: "Category created successfull",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while creating category" + error,
    });
  }
});

categoryRouter.get("/categories",async(req,res)=>{
  try {

    console.log("inside category ies ")

    const categories=await Category.find();
     res.status(200).json({
      success:true,
      data:categories
     })

    
  } catch (error) {
    res.status(500).json({
      success:false,
      messsage:"error in  category details" + error.message
    })
  }
})


module.exports=categoryRouter;
