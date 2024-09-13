import React, { useState, useEffect, } from 'react';
import axios from 'axios';

function ROD() {
  const[recipes, setRecipes]= useState([])
  const[data, setData]= useState([])
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rod/');
        const items = response.data;  
        const recipeTitles = items.map(recipe => recipe.title);
        setRecipes(recipeTitles);

        setData(items)              

      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);
  function getDailyRandomValue() {
    const today = new Date().getDate();     
    const randomIndex = today % recipes.length;     
    console.log(recipes[randomIndex]);
    return recipes[randomIndex];
  }
  const randomValue = getDailyRandomValue();

  return (
    <div className='absolute mx-12 my-80'>
      <div className=" top-1/3 left-1/4 bg-white p-4 rounded-md shadow-lg w-96">
        <div className="bg-red-500 text-white px-2 py-1 inline-block rounded-md text-sm mb-2">
          RECIPE OF THE DAY
        </div>
        <h2 className="text-xl font-bold mb-2">Tuna Salad With Hot and Sweet Peppers</h2>
        <p className="text-gray-700 mb-4">
          Toss this updated take on a classic Mediterranean preparation with lettuce or pasta.
        </p>
        <p className="text-gray-500">By Genevieve Ko</p>
      </div> 
    </div>
  )
}

export default ROD
