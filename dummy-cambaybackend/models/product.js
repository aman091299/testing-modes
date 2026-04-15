const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
   ref: "Category1",
    required: true,
  },
  image: {
    type: String,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
