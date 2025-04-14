// src/api/api.js
import axios from 'axios';
import { getUserInfo } from '../utils/getUserInfo.js';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
});

// You can add request interceptors to handle common tasks like adding tokens to headers
api.interceptors.request.use((config) => {
  // Example: Add authorization token if available
  const userInfo = getUserInfo();
  console.log("User Info:", userInfo);
  
  if (userInfo && userInfo.token) {
    const token = userInfo.token;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
},
  (error) => {
    console.error("Interceptor request error:", error);
    return Promise.reject(error);
  }
);

export default api;