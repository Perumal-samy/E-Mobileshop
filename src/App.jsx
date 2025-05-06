// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import Products from "./Component/Products/Productlist";
import Purchase from "./Component/Purchase/Purchase";
import Contact from "./Component/Contact/Contact";
import Wishlist from "./Component/Wishlist/Wishlist";
import Login from "./Component/Login/Login";
import Cart from "./Component/Cart/Cart";
import { WishlistProvider } from "./Component/Context/WishlistContext";
import { CartProvider } from "./Component/Context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";
import AdminDashboard from "./Admin/AdminDashboard";
import OrderPage from "./Admin/OrderPage";



const App = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className="app-wrapper">
            <Navbar />

            <Routes>
              {/* Redirect root to /home */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* User Pages */}
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/admin/orders" element={<OrderPage />} />
              <Route path="/purchase" element={<Purchase />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={2000} />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;