import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import { Link } from 'react-router-dom';

function Bookmarks() {
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const response = await axiosInstance.get('/dishes/');
            const data = response.data;
            const bookmarkedData= data.filter(recipe=>recipe.isBookmarked==true)
            setItems(bookmarkedData)
            console.log(response.data);
            
          } catch (error) {
            console.error(error);
            setError(error);
          }
        };
    
        fetchRecipes();
      }, []);

  return (
    <div className='w-full h-full bg-gray-900 p-6'>
      <div className='flex flex-col space-y-6 h-[519px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {items.map((recipe) => (
            <Link to={`/detail/${recipe.title}`} key={recipe.title} className='group'>
              <div className='relative overflow-hidden rounded-lg shadow-lg transition-transform transform group-hover:scale-105 group-hover:shadow-xl duration-300 ease-out'>
                <div className='relative w-full h-64'>
                  <img
                    className='w-full h-full object-cover rounded-t-lg'
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <div className='absolute inset-0 bg-black opacity-25 group-hover:opacity-0 transition-opacity duration-300 ease-out' />
                </div>
                <div className='p-4 bg-gray-800'>
                  <h2 className='text-lg font-semibold text-white'>{recipe.title}</h2>
                  <p className='text-gray-400 mt-2'>{recipe.estimatedTime} mins</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bookmarks
