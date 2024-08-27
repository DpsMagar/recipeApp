import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/recipes/'); // Await the response
        // console.log(response); 
        console.log(response.data); 
        setRecipes(response.data); // Directly set response.data
      } catch (error) {
        console.error(error); // Log the error for debugging
        setError(error);
      }
    };
    fetchRecipes();
  }, []);
  
  return (
    <div className='w-full h-full bg-red-900'> 
    <div className='flex justify-evenly'>
      <div className='border-red-200 size-72  bg-slate-500 m-2 rounded-sm overflow-hidden'>
            <div className='bg-slate-400 w-full mx-3'></div>
        </div>
        <div className='border-red-200 size-72  bg-slate-500 m-2 rounded-sm overflow-hidden'>
            <div className='bg-slate-400 w-full mx-3'></div>
        </div>
        <div className='border-red-200 size-72  bg-slate-500 m-2 rounded-sm overflow-hidden'>
            <div className='bg-slate-400 w-full mx-3'></div>
        </div>
    </div>
    </div>
  );
}

export default MainPage;
