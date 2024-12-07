// src/api/axiosInstance.js
import axios from 'axios';


// Create an Axios instance without cookies
const axios_without_cookies = axios.create({
    // baseURL: '',   // deploysite
    baseURL: 'http://localhost:3000/api/v1/chaldal',  // local check
    withCredentials: false,
});

export default axios_without_cookies;
