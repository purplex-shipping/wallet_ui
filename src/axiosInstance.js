// axiosInstance.js
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api'; // Replace with your base URL

const axiosInstance = axios.create({
  baseURL,
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'content-type': 'application/x-www-form-urlencoded'
  },
});

// Add a request interceptor to attach the bearer token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
