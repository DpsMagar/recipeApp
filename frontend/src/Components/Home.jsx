import React from 'react';
import Navbar from './Navbar';
import ROD from './ROD';
import bg from '../Images/background.jpg'; 
import HomeLogos from '../minorComponents/HomeLogos';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="flex-1  bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <Navbar />
          <ROD/>
          <HomeLogos/>
      </div>
      <footer className="bg-gray-800 text-white py-2 text-center">
        &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
