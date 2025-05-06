import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    price: "",
    image: "",
    brandImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Change this
    imageFormData.append("cloud_name", "YOUR_CLOUD_NAME"); // Change this

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        imageFormData
      );
      setFormData((prev) => ({
        ...prev,
        [field]: res.data.secure_url,
      }));
      toast.success(
        `${field === "image" ? "Product" : "Brand"} image uploaded`
      );
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/products",
        formData
      );
      toast.success("Product added successfully!");
      console.log("Product added:", response.data);

      setFormData({
        title: "",
        brand: "",
        price: "",
        image: "",
        brandImage: "",
      });
    } catch (err) {
      console.error("Failed to add product:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          value={formData.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Upload Product Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "image")}
        />
        {formData.image && (
          <img src={formData.image} alt="Product" width="100" />
        )}

        <label>Upload Brand Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, "brandImage")}
        />
        {formData.brandImage && (
          <img src={formData.brandImage} alt="Brand" width="100" />
        )}

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductForm;