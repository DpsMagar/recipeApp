import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import dp from '../Images/pp.webp';
import logoutIcon from '../Images/logout.png'; // Assuming logout icon is used here

const ProfileMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Image and Username */}
      <img
        src={dp}
        alt="Profile"
        className="h-10 w-10 rounded-full cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      />

      {/* Dropdown Profile Section */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-4">
          {/* Profile Picture and Username */}
          <div className="text-center px-4">
            <img
              src={dp}
              alt="Profile"
              className="h-16 w-16 rounded-full mx-auto"
            />
            <h3 className="mt-2 text-lg font-semibold">John Doe</h3>
          </div>

          {/* Edit Button */}
          <button className="absolute top-2 right-2 text-sm text-blue-500">
            Edit
          </button>

          <hr className="my-4" />

          {/* Menu Items in Columns */}
          <div className="grid grid-cols-1 gap-4 text-left px-4">
            {/* My Recipes */}
            <Link to="/my-recipes" className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <p className="text-gray-800">My Recipes</p>
            </Link>

            {/* Bookmarks */}
            <Link to="/bookmarks" className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <p className="text-gray-800">Bookmarks</p>
            </Link>

            {/* Logout */}
            <Link to="/logout" className="flex items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer">
              <img src={logoutIcon} alt="Logout" className="h-6 w-6 mr-2" />
              <p className="text-red-600">Logout</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
