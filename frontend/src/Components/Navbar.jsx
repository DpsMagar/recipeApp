import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png';

const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn]= useState(false);
  useEffect(() => {
    const userLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <nav className="text-white bg-gray-800 shadow-md py-3" >
      <div className="container mx-auto px-5 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className=" hover:text-blue-600 transition duration-300">
            <img src={logo} alt="logo" className="h-8 rounded-md" />
          </Link>
        </div>

        {/* Navbar Links */}
       
        {!isLoggedIn ? (
           <div className="flex space-x-6">
           <Link
             to="/register"
             className=" hover:text-white hover:bg-blue-700 hover:font-medium py-2 px-4 rounded transition duration-300 font-sans"
           >
             Register
           </Link>
           <Link
             to="/login"
             className=" hover:text-white hover:bg-blue-700 hover:font-medium py-2 px-4 rounded transition duration-300 font-sans"
           >
             Login
           </Link>
           <Link
             to="/about"
             className=" hover:text-white hover:bg-blue-700 hover:font-medium py-2 px-4 rounded transition duration-300 font-sans"
           >
             About
           </Link>
         </div>
        ):(
          <div className="flex space-x-6">
             <Link
             to="/logout"
             className=" hover:text-white hover:bg-blue-700 hover:font-medium py-2 px-4 rounded transition duration-300 font-sans"
           >
             Logout
           </Link>
           <Link
             to="/about"
             className=" hover:text-white hover:bg-blue-700 hover:font-medium py-2 px-4 rounded transition duration-300 font-sans"
           >
             About
           </Link>
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
