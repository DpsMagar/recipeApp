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

// Request interceptor for adding the token to requests
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');  // Consistent naming
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for handling token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Check if the error status is 401 (Unauthorized) and it's not a retry
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried
            
            try {
                const refreshToken = localStorage.getItem('refresh_token');
                
                if (!refreshToken) {
                    // Redirect to login if no refresh token is found
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // Attempt to get a new access token using the refresh token
                const response = await axiosInstance.post('token/refresh/', {
                    refresh: refreshToken,
                });

                // Store the new access token in localStorage
                localStorage.setItem('access_token', response.data.access);

                // Update the Authorization header in the original request
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
                originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (err) {
                // Redirect to login if the refresh token is invalid or expired
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
