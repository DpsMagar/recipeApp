import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';

function App() {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check authentication status (e.g., from localStorage or API)
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   const PrivateRoute = ({ children }) => {
//     return isAuthenticated ? children : <Navigate to="/login" />;
//   };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>   
    );
}

export default App;
