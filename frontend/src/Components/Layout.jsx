import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../Images/logo.png'; // Adjust the path to your logo image

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4 px-6 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
