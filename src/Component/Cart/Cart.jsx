import React from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (item) => {
    navigate("/purchase", { state: { cart: [item] } });
  };

  const handleProceedToCheckout = () => {
    navigate("/purchase", { state: { cart: cartItems } });
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={`http://localhost:5000${item.productImageUrl}`}
                  alt={item.name}
                  className="cart-img"
                />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Price: ₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                  <button onClick={() => removeFromCart(index)}>Remove</button>
                  <button
                    className="buy-btn"
                    onClick={() => handleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total: ₹{getTotal()}</h3>
            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>
            <button className="clear-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;