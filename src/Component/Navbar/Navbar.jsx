import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserShield, FaBars, FaHeart } from "react-icons/fa";
import "./Navbar.css";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <h1 className="logo">E-Mobiles</h1>
      <div className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link to="/home">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>

        {/* ✅ Wishlist icon added here */}
        <Link to="/wishlist" className="icon-button" title="Wishlist">
          <FaHeart />
        </Link>

        <Link to="/cart" className="icon-button cart-icon" title="Cart">
          <FaShoppingCart />
          {cartItems.length > 0 && (
            <span className="cart-count">{cartItems.length}</span>
          )}
        </Link>

        <Link to="/admin" className="icon-button" title="Admin Panel">
          <FaUserShield />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;