import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Components/Layout';
import Login from './Components/Login';
import Register from './Components/Register';
import Logout from './Components/Logout';
import HomePage from './Components/Home';
import About from './Components/About';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Layout><Login/></Layout>} />
                <Route path="/register" element={<Layout><Register/></Layout>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/about" element={<Layout><About/></Layout>}>
                </Route>
            </Routes>
        </Router>   
    );
}

export default App;
