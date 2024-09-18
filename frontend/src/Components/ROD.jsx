import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './AxiosInstance';

function ROD() {
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [randomIndex, setRandomIndex] = useState();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes
        const response = await axios.get('https://recipe-app-django-react-azure-c6c0gkbwhmcubhhz.westindia-01.azurewebsites.net/api/rod');
        
        // Fetch users
        const user = await axiosInstance.get('/users/');

        // Process recipes and users
        const usersData = user.data;
        const items = response.data;

        if (items.length > 0) {
          const recipeDes = items.map(recipe => recipe.description || 'No description available');
          setData(recipeDes);

          const recipeTitles = items.map(recipe => recipe.title || 'No title available');
          setRecipes(recipeTitles);

          const recipeUsers = usersData.map(user => user.username || 'Unknown');
          setUsers(recipeUsers);

          const id = items.map(recipe => recipe.user || 'No user ID');
          setUid(id);
        } else {
          // Handle empty data case
          setData([]);
          setRecipes([]);
          setUsers([]);
          setUid([]);
        }

        setLoading(false);
      } catch (error) {
        // Improved error handling
        console.error('Error fetching recipes or users:', error.response?.data || error.message || error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const getDailyRandomValue = () => {
        const today = new Date().getDate();
        const randomIndex = today % recipes.length;
        setRandomIndex(randomIndex);
      };

      getDailyRandomValue();
    }
  }, [recipes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='absolute mx-12 my-80'>
      <div className="top-1/3 left-1/4 bg-white p-4 rounded-md shadow-lg w-96">
        <div className="bg-red-500 text-white px-2 py-1 inline-block rounded-md text-sm mb-2">
          RECIPE OF THE DAY
        </div>
        <h2 className="text-xl font-bold mb-2">{recipes[randomIndex] || 'No Recipe Available'}</h2>
        <p className="text-gray-700 mb-4">
          {data[randomIndex] || 'No Description Available'}
        </p>  
        <p className="text-gray-500">By {users[uid[randomIndex]] || 'Unknown'}</p>
      </div> 
    </div>
  );
}

export default ROD;
