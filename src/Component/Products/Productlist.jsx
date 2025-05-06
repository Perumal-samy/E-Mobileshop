// src/Component/Product/Productlist.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./Productlist.css";

const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleAddToCart = (product) => {
    const sanitizedProduct = {
      ...product,
      price: Number(String(product.price).replace(/[^\d.]/g, "")),
      quantity: 1,
    };
    addToCart(sanitizedProduct);
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  const handleBuyNow = (product) => {
    const sanitizedProduct = {
      ...product,
      price: Number(String(product.price).replace(/[^\d.]/g, "")),
      quantity: 1,
    };
    navigate("/purchase", { state: { cart: [sanitizedProduct] } });
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.info(`${product.name} removed from wishlist.`, {
        position: "bottom-right",
      });
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`, {
        position: "bottom-right",
      });
    }
  };

  const brands = [...new Set(products.map((p) => p.brand))];

  return (
    <div className="products-wrapper">
      <h2>Select a Brand</h2>
      <div className="brand-list">
        {brands.map((b) => {
          const brandProduct = products.find((p) => p.brand === b);
          return (
            <div
              key={b}
              className="brand-card"
              onClick={() => setSelectedBrand(b)}
            >
              <img
                src={`http://localhost:5000${brandProduct?.brandImageUrl}`}
                alt={b}
                className="brand-img"
              />
              <p>{b}</p>
            </div>
          );
        })}
      </div>

      <h2>Products</h2>
      <div className="products-grid">
        {products
          .filter((p) => p.brand === selectedBrand)
          .map((prod) => {
            const inWishlist = isInWishlist(prod._id);
            return (
              <div className="product-card" key={prod._id}>
                <div
                  className="wishlist-icon"
                  onClick={() => handleWishlistToggle(prod)}
                >
                  {inWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
                </div>
                <img
                  src={`http://localhost:5000${prod.productImageUrl}`}
                  alt={prod.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/fallback-image.png"; // optional fallback
                  }}
                />
                <h4>{prod.name}</h4>
                <p>₹{prod.price}</p>
                <div className="product-actions">
                  <button onClick={() => handleAddToCart(prod)}>
                    Add to Cart
                  </button>
                  <button onClick={() => handleBuyNow(prod)}>Buy Now</button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Productlist;