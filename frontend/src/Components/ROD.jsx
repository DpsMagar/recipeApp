import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rod/');
        const items = response.data;
      console.log(items);
        
        const recipeDes = items.map(recipe => recipe.description);

        setData(recipeDes)
        const recipeTitles = items.map(recipe => recipe.title);
        setRecipes(recipeTitles);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);
  return { recipes, loading, data };
}

function ROD() {
  const { recipes, loading, data } = useFetchRecipes();
  const [randomIndex, setRandomIndex] = useState();

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
        <p className="text-gray-500">By Genevieve Ko</p>
      </div> 
    </div>
  );
}

export default ROD;
