import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Update with your Django backend URL
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
axiosInstance.interceptors.request.use(
    (config) => {
        const Token = localStorage.getItem('token');
        if (Token) {
            config.headers.Authorization = `Bearer ${Token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
