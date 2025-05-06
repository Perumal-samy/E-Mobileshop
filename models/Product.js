const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  price: Number,
  inStock: Boolean,
  productImageUrl: String,
  brandImageUrl: String,
});

module.exports = mongoose.model("Product", ProductSchema);