// src/api/axiosInstance.js
import axios from 'axios';


// Create an Axios instance with access cookies
const axios_with_cookies = axios.create({
  baseURL: 'https://chaldalbackend.vercel.app/api/v1/chaldal',   // server side
  // baseURL: 'http://localhost:3000/api/v1/chaldal',   // local check
  withCredentials: true,
});

export default axios_with_cookies;
