// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: String, // or ObjectId if you have user system
    required: true,
  },
  product: {
    name: String,
    price: Number,
    image: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);