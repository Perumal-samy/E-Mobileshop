const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// CREATE
router.post(
  "/products",
  upload.fields([{ name: "productImage" }, { name: "brandImage" }]),
  async (req, res) => {
    const { name, brand, description, price, inStock } = req.body;
    const product = new Product({
      name,
      brand,
      description,
      price,
      inStock: inStock === "true",
      productImageUrl: `/uploads/${req.files["productImage"][0].filename}`,
      brandImageUrl: `/uploads/${req.files["brandImage"][0].filename}`,
    });
    await product.save();
    res.status(201).json(product);
  }
);

// READ
router.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// UPDATE
router.put(
  "/products/:id",
  upload.fields([{ name: "productImage" }, { name: "brandImage" }]),
  async (req, res) => {
    const { name, brand, description, price, inStock } = req.body;
    const updateData = {
      name,
      brand,
      description,
      price,
      inStock: inStock === "true",
    };

    if (req.files["productImage"]) {
      updateData.productImageUrl = `/uploads/${req.files["productImage"][0].filename}`;
    }
    if (req.files["brandImage"]) {
      updateData.brandImageUrl = `/uploads/${req.files["brandImage"][0].filename}`;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(updated);
  }
);

// DELETE
router.delete("/products/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// example route
router.post("/", (req, res) => {
  const order = req.body;
  // Save order to DB or process it
  res.status(201).json({ message: "Order created", order });
});




module.exports = router;