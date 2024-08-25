import React from 'react';
import Navbar from './Navbar';
import bg from '../Images/background.jpg'; 

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1 relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Navbar />
        {/* Other content here */}
      </div>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
