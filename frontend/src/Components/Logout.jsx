import React from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                sessionStorage.removeItem('isLoggedIn');
                navigate('/');
                return;
            }

            await axiosInstance.post('logout/', { refresh_token: refreshToken });

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            sessionStorage.removeItem('isLoggedIn');

            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            sessionStorage.removeItem('isLoggedIn');
            navigate('/');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold mb-4 text-center">Logout</h2>
            <p className="text-gray-600 mb-6 text-center">
                Are you sure you want to log out?
            </p>
            <button 
                onClick={handleLogout} 
                className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-md"
            >
                Logout
            </button>
            <button 
                onClick={() => navigate('/')} 
                className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 p-3 rounded-lg font-semibold transition duration-300 ease-in-out shadow-md"
            >
                Cancel
            </button>
        </div>
    );
};

export default Logout;
