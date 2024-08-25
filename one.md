{/* Recipe of the Day
      <div className="absolute top-1/3 left-1/4 bg-white p-4 rounded-md shadow-lg w-1/4">
        <div className="bg-red-500 text-white px-2 py-1 inline-block rounded-md text-sm mb-2">
          RECIPE OF THE DAY
        </div>
        <h2 className="text-xl font-bold mb-2">Tuna Salad With Hot and Sweet Peppers</h2>
        <p className="text-gray-700 mb-4">
          Toss this updated take on a classic Mediterranean preparation with lettuce or pasta.
        </p>
        <p className="text-gray-500">By Genevieve Ko</p>
      </div> */}




      <img
          src={bg}
          alt="Delicious food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          {/* Logo */}
          <img src={logo} alt="Site Logo" className="h-24 mb-8" />
          {/* Search Bar */}
          <input
            type="text"
            placeholder="What would you like to cook?"
            className="px-4 py-2 rounded-full w-1/2 focus:outline-none"
          />

          {/* Navigation Links */}
          <div className="flex space-x-4 mt-4">
            <Link to="/bbq" className="hover:underline">
              BBQ and Grilling
            </Link>
            <Link to="/grocery-list" className="hover:underline">
              Your Grocery List
            </Link>
            <Link to="/recipe-box" className="hover:underline">
              Your Recipe Box
            </Link>
            <Link to="/subscribe" className="hover:underline">
              Subscribe
            </Link>
          </div>