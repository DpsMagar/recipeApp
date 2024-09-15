import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './AxiosInstance';

function useFetchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rod/');
        console.log(response.data);
        
        const user = await axiosInstance.get('/users/');
        console.log(user.data[0].username);
        const users= user.data
        const items = response.data;
        const recipeDes = items.map(recipe => recipe.description);
        setData(recipeDes)
        const recipeTitles = items.map(recipe => recipe.title);
        setRecipes(recipeTitles);
        const recipeUsers = users.map(recipe => recipe.username);
        setUsers(recipeUsers)
        const id = items.map(recipe => recipe.user);
        setUid(id)

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  return { recipes, loading, data, users, uid };
}

function ROD() {
  const { recipes, loading, data, users, uid } = useFetchRecipes();
  const [randomIndex, setRandomIndex] = useState();
  console.log(users);
  console.log(uid);
  
  

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


  return (
    <div className='absolute mx-12 my-80'>
      <div className="top-1/3 left-1/4 bg-white p-4 rounded-md shadow-lg w-96">
        <div className="bg-red-500 text-white px-2 py-1 inline-block rounded-md text-sm mb-2">
          RECIPE OF THE DAY
        </div>
        <h2 className="text-xl font-bold mb-2">{recipes[randomIndex]}</h2>
        <p className="text-gray-700 mb-4">
          {data[randomIndex]}
        </p>  
        <p className="text-gray-500">By {users[uid[randomIndex]]}</p>
      </div> 
    </div>
  );
}

export default ROD;
