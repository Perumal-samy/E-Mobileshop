import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ShoppingCart,
  PlusSquare,
  PackageCheck,
  ArrowLeft,
  Edit,
  Trash2,
} from "lucide-react";
import "./AdminDashboard.css";

// OrdersPage component inside AdminDashboard
function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data.message);
      // Optional: Refresh orders list after delete
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  if (loading) return <p className="loading">Loading orders...</p>;

  return (
    <div>
      <h3>Completed Orders</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Products</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || "N/A"}</td>
                <td>
                  {order.products && order.products.length > 0
                    ? order.products.map((p) => p.name).join(", ")
                    : "No products"}
                </td>
                <td>₹{order.totalPrice}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeView, setActiveView] = useState("products");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    inStock: true,
    productImage: null,
    brandImage: null,
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("inStock", formData.inStock);
    if (formData.productImage)
      payload.append("productImage", formData.productImage);
    if (formData.brandImage) payload.append("brandImage", formData.brandImage);

    try {
      if (editingProduct) {
        await axios.post(
          `http://localhost:5000/api/products/${editingProduct._id}?_method=PUT`,
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/products", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchProducts();
      resetForm();
      setActiveView("products");
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      inStock: product.inStock,
      productImage: null,
      brandImage: null,
    });
    setActiveView("form");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      inStock: true,
      productImage: null,
      brandImage: null,
    });
    setEditingProduct(null);
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <ul className="sidebar-menu">
          <li onClick={() => setActiveView("products")}>
            <ShoppingCart size={16} /> Product List
          </li>
          <li
            onClick={() => {
              resetForm();
              setActiveView("form");
            }}
          >
            <PlusSquare size={16} /> Add Product
          </li>
          <li onClick={() => setActiveView("orders")}>
            <PackageCheck size={16} /> Orders
          </li>
          {/* <li onClick={() => setActiveView("cartproducts")}>
            <PackageCheck size={16} /> Cart Products
          </li> */}
          <li onClick={() => setIsLoggedIn(false)}>
            <ArrowLeft size={16} /> Logout
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {activeView === "form" && (
          <form
            className="admin-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Product Price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <label>
              Product Image:
              <input
                type="file"
                name="productImage"
                accept="image/*"
                onChange={handleFileChange}
                required={!editingProduct}
              />
            </label>
            <label>
              Brand Image:
              <input
                type="file"
                name="brandImage"
                accept="image/*"
                onChange={handleFileChange}
                required={!editingProduct}
              />
            </label>
            <label>
              In Stock:
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">
              {editingProduct ? "Update" : "Add"} Product
            </button>
          </form>
        )}

        {activeView === "products" && (
          <div className="product-list">
            <h3>Product List</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={`http://localhost:5000${p.productImageUrl}`}
                        alt={p.name}
                        width={50}
                      />
                      <p>{p.name}</p>
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000${p.brandImageUrl}`}
                        alt="brand"
                        width={40}
                      />
                    </td>
                    <td>₹{p.price}</td>
                    <td>{p.inStock ? "Yes" : "No"}</td>
                    <td>
                      <button onClick={() => handleEdit(p)}>
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(p._id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeView === "orders" && <OrdersPage />}
      </main>
    </div>
  );
}