import React from "react";
import { useNavigate } from "react-router-dom";
// import { useCart } from "./Component/Context/CartContext";
// import { useWishlist } from "./Context/WishlistContext";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast.success("Product added to wishlist!");
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("Product added to cart!");
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <div className="product-actions">
        <button
          className="add-to-wishlist-btn"
          onClick={() => handleAddToWishlist(product)}
        >
          Add to Wishlist
        </button>
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="view-details-btn"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;