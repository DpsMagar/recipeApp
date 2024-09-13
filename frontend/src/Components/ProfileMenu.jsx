import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import dp from '../Images/pp.webp';
import logoutIcon from '../Images/logout.svg'; 
import axiosInstance from './AxiosInstance';
import { bookmarkStore } from '../Zustand Store/Zstore';

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null); 
  const userName = localStorage.getItem("userName");
  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
 
  
  useEffect(() => {
    const fetchUserData = async () => { 
      try {
        const response = await axiosInstance.get("users/");
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) && 
        !profileRef.current.contains(event.target) 
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, profileRef]);

  return (
    <div className="relative">
      <img
        ref={profileRef}
        src={dp}
        alt="Profile"
        className="h-12 w-12 rounded-full cursor-pointer transition duration-300 hover:shadow-lg" 
        onClick={() => setMenuOpen((prev) => !prev)} 
      />

      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg py-4 z-50 transition-all duration-300 ease-out transform origin-top-right scale-100"
        >
          <div className="text-center px-4">
            <img
              src={dp}
              alt="Profile"
              className="h-16 w-16 rounded-full mx-auto shadow-md"
            />
            <h3 className="mt-2 text-lg font-semibold text-gray-100">{capitalizeWords(userName)}</h3> 
          </div>

          <button className="absolute top-2 right-2 text-sm text-blue-300 font-medium hover:text-blue-200 transition duration-300">
            Edit 
          </button>

          <hr className="my-4 border-gray-600" />

           
          <div className="grid grid-cols-1 gap-4 text-left px-4">
             
            <Link to="/home/myRecipes" className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-300">
              <p className="text-gray-200 font-medium">Personal Recipes</p> 
            </Link>

            
            <Link to="/home/bookmarks" className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-300">
              <p className="text-gray-200 font-medium">My Bookmarks</p> 
            </Link>

            
            <Link to="/logout" className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition duration-300">
              <img src={logoutIcon} alt="Logout" className="h-6 w-6 mr-2" />
              <p className="text-red-400 font-medium">Logout</p> 
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
