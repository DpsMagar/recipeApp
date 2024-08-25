import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await axiosInstance.get('recipes/featured/'); // Adjust the endpoint if needed
        setRecipes(response.data);
      } catch (error) {
        setError('Failed to fetch recipes');
        console.error('Error fetching recipes:', error);
      }
    };

    fetchFeaturedRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Recipe App</h1>
          <nav>
            <a href="/recipes" className="text-white hover:underline px-4">Recipes</a>
            <a href="/profile" className="text-white hover:underline px-4">Profile</a>
            <a href="/login" className="text-white hover:underline px-4">Login</a>
            <a href="/register" className="text-white hover:underline px-4">Register</a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h2 className="text-3xl font-semibold mb-4">Welcome to Recipe App!</h2>
          <p className="text-lg text-gray-700 mb-4">Discover and share delicious recipes with the world.</p>
          <a href="/recipes" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Browse Recipes
          </a>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Featured Recipes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.length > 0 ? (
              recipes.map((recipe) => (
                <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-48 object-cover"/>
                  <div className="p-4">
                    <h4 className="text-xl font-semibold mb-2">{recipe.title}</h4>
                    <p className="text-gray-600">{recipe.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No featured recipes available.</p>
            )}
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </section>
      </main>

      <footer className="bg-blue-600 text-white text-center p-4">
        <p>&copy; {new Date().getFullYear()} Recipe App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
