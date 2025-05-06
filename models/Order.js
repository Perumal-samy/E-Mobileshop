const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
  },
  products: [
    {
      name: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalPrice: Number,
  status: {
    type: String,
    default: "Completed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);