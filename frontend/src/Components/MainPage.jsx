import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import BookmarkIcon from '../minorComponents/SvgIcons';
import friedRice from "../Images/fried rice.jpg"

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/dishes/'); 
        // console.log(response); 
        console.log(response.data); 
        setRecipes(response.data); 
      } catch (error) {
        console.error(error); 
        setError(error);
      }
    };
    fetchRecipes();
  }, []);
  
  return (    
    <div className='w-full h-full bg-red-900'> 
      <div  className='flex justify-evenly'>
        {recipes.map((recipe)=>(
          <div key={recipe.title} className='border-red-200 size-60  bg-slate-500 m-2  overflow-hidden flex flex-col  rounded-md'>
            <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'><img className='w-full h-full rounded-md' src={recipe.image} alt="image Here"/></div>
              <div className='mx-2 text-xl font-bold text-gray-800'>{recipe.title}</div>
                <div className='flex justify-between mx-2 mt-5'>
                    <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
                        <div className='-mt-1'>
                            <BookmarkIcon/>
                        </div>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
