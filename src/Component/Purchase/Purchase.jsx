// src/Component/Purchase/Purchase.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Purchase.css";

export default function Purchase() {
  const { state } = useLocation();
  const cartItems = state?.cart || [];
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();

    const user = {
      _id: "123", // Replace with actual user ID
      name: "John Doe", // Replace with actual user name
    };

    const orderData = {
      user,
      products: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: Number(item.quantity),
        price: Number(item.price),
      })),
      totalPrice,
      status: "Completed",
    };

    try {
      await axios.post("http://localhost:5000/api/orders", orderData);
      setPaymentSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="purchase-page">
      <h2 className="text-center">🛒 Checkout</h2>

      {cartItems.length === 0 ? (
        <p>No items in your cart!</p>
      ) : paymentSuccess ? (
        <div className="success-box">
          <h3>🎉 Payment Successful!</h3>
          <p>
            Thank you for your purchase. A confirmation email will be sent
            shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item._id} className="product-box">
                <img
                  src={`http://localhost:5000${item.productImageUrl}`}
                  alt={item.name}
                />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <h4 className="total-price">Total: ₹{totalPrice}</h4>

          <form className="payment-form" onSubmit={handlePayment}>
            <h4>Payment Method</h4>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="netbanking">Net Banking</option>
              <option value="cod">Cash on Delivery</option>
            </select>

            {paymentMethod === "card" && (
              <>
                <input type="text" placeholder="Name on Card" required />
                <input type="text" placeholder="Card Number" required />
                <input type="text" placeholder="Expiry Date (MM/YY)" required />
                <input type="text" placeholder="CVV" required />
              </>
            )}
            {paymentMethod === "upi" && (
              <input type="text" placeholder="Enter UPI ID" required />
            )}
            {paymentMethod === "netbanking" && (
              <>
                <select required>
                  <option value="">Select Bank</option>
                  <option value="sbi">SBI</option>
                  <option value="icici">ICICI</option>
                  <option value="hdfc">HDFC</option>
                  <option value="axis">Axis</option>
                </select>
                <input type="text" placeholder="Account Holder Name" required />
              </>
            )}

            <input type="text" placeholder="Shipping Address" required />

            <button type="submit">
              {paymentMethod === "cod" ? "Place Order" : `Pay ₹${totalPrice}`}
            </button>
          </form>
        </>
      )}
    </div>
  );
}