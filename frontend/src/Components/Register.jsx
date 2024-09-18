import React, { useState } from 'react';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';  // Assuming you're using react-router for navigation

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();  // Hook to navigate programmatically

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axiosInstance.post('register/', {
                username,
                password,
                email,
            });
            console.log('Response:', response);
            setSuccess('Registration successful!');
            navigate('/login');
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response);
                console.log('Error response headers:', err.response.headers);
                console.log('Error response data:', err.response.data);
                if (err.response.data) {
                    setError(err.response.data.detail || 'Registration failed 1');
                } else {
                    setError('Registration failed 2');
                }
            } else {
                console.error('Error:', err.message);
                setError('Registration failed 3');
            }
        }
        
    };
    

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-2 w-full p-2 border rounded-lg"
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2 w-full p-2 border rounded-lg"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-2 w-full p-2 border rounded-lg"
                required
            />
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-lg">
                Register
            </button>
        </form>
    );
};

export default Register;
