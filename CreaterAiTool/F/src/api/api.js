// // src/api.js
// import axios from "axios";

// // Create an Axios instance
// const API = axios.create({
//   baseURL: "http://localhost:5000/api", // Change this to your backend URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Optional: Add request interceptor to include token if logged in
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // or wherever you store JWT
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
