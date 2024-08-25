import React from 'react';
import Navbar from './Navbar';
import bg from '../Images/background.jpg'; 

const HomePage = () => {
  return (
  <>
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }}>
      <Navbar />
      
    </div>
    <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Recipe App. All rights reserved.
      </footer>
  </>
    
  );
};

export default HomePage;
