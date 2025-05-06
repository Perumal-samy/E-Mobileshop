import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products"; // Change if your backend port is different

export const getAllProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addNewProduct = async (product) => {
  const res = await axios.post(BASE_URL, product);
  return res.data;
};