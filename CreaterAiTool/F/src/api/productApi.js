// src/api/productApi.js
import axios from "axios";

// Replace this with your actual backend URL for products
const API_URL = "http://localhost:5000/products";

/**
 * Get all products
 */
export const getProducts = () => {
  return axios.get(API_URL);
};

/**
 * Create a new product
 * @param {Object} product - e.g., { title, price, description }
 */
export const createProduct = (product) => {
  return axios.post(API_URL, product);
};

/**
 * Update an existing product
 * @param {number|string} id - Product ID
 * @param {Object} product - e.g., { title, price, description }
 */
export const updateProduct = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

/**
 * Delete a product
 * @param {number|string} id - Product ID
 */
export const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
