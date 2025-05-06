const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Import your MongoDB model

// POST /api/orders - Create and save order to MongoDB
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    console.log("New Order Saved:", newOrder);
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (err) {
    console.error("Failed to save order:", err);
    res.status(500).json({ error: "Failed to save order" });
  }
});

// GET /api/orders - Retrieve all orders from MongoDB
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// DELETE /api/orders/:id - Delete order by ID from MongoDB
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
});

module.exports = router;