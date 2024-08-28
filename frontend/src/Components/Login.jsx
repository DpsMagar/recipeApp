import React, { useState } from 'react';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Hook to navigate programmatically

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear any previous error
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }

        try {
            const response = await axiosInstance.post('login/', {
                username,
                password,
            });

            // Store access and refresh tokens in localStorage
            const { access, refresh } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            sessionStorage.setItem('isLoggedIn','true')

            navigate('/home');
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response);
                if (err.response.data) {
                    setError(err.response.data.detail || 'Invalid credentials');
                } else {
                    setError('Invalid credentials');
                }
            } else {
                console.error('Error:', err.message);
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 w-full p-2 border rounded-lg"
                required  // Basic HTML validation
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 w-full p-2 border rounded-lg"
                required  // Basic HTML validation
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                Login
            </button>
        </form>
    );
};

export default Login;
