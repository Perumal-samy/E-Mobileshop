const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const methodOverride = require("method-override");
const productRoutes = require("./routes/productRoutes");
const ordersRoute = require("./routes/orders");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// In your server.js
app.use('/api/cart', require('./routes/Cart'));


mongoose
  .connect("mongodb://localhost:27017/mobileshop",)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api", productRoutes);

// Mount the orders route
app.use("/api/orders", ordersRoute);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));