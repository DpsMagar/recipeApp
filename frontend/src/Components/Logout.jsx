import React from 'react';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Retrieve the refresh token from local storage
            const refreshToken = localStorage.getItem('refresh_token');

            // If no refresh token, remove tokens and redirect
            if (!refreshToken) {
                localStorage.removeItem('token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
                return;
            }

            // Send a request to the logout endpoint to blacklist the refresh token
            await axiosInstance.post('logout/', { refresh_token: refreshToken });

            // Remove tokens from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');

            // Redirect to the login page
            navigate('/login');
        } catch (err) {
            console.error('Logout failed:', err);
            // Remove tokens anyway and redirect
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
        }
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-lg">
            Logout
        </button>
    );
};

export default Logout;
