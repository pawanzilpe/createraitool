import axios from "axios";

/**
 * Base API URL
 * Change this if your backend runs on a different port/domain
 */
const API_URL = "http://localhost:5000/api/users";

/**
 * Get all users
 */
export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Create new user
 * @param {Object} user { name, email }
 */
export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

/**
 * Update user
 * @param {string|number} id
 * @param {Object} user
 */
export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

/**
 * Delete user
 * @param {string|number} id
 */
export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
