import React, { useState, useEffect } from 'react';
import axiosInstance from './AxiosInstance';
import BookmarkIcon from '../minorComponents/SvgIcons';

function MainPage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [category1Items, setCategory1Items] = useState([]);
  const [category2Items, setCategory2Items] = useState([]);
  const [category3Items, setCategory3Items] = useState([]);
  const [category4Items, setCategory4Items] = useState([]);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/dishes/'); 
        const items= response.data
        console.log(items); 
        setRecipes(items); 
        const category1= items.filter(item=>item.category==1);
        const category2= items.filter(item=>item.category==2);
        const category3= items.filter(item=>item.category==3);
        const category4= items.filter(item=>item.category==4);

        setCategory1Items(category1);
        setCategory2Items(category2);
        setCategory3Items(category3);
        setCategory4Items(category4);
        
      } catch (error) {
        console.error(error); 
        setError(error);
      }
    };
    fetchRecipes();
  }, []);
  
  return (    
    <div className='w-full h-full bg-gray-800 '> 
    {/* Category 1 */}
    <div className='p-4'>
      <h2 className='text-xl font-bold text-white mb-2'>Stir Frying</h2>
      <div className='flex flex-wrap'>
        {category1Items.map((recipe) => (
          <div key={recipe.title} className='border-red-200 size-60 bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md'>
            <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
              <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
            </div>
            <div className='mx-2 text-xl font-bold text-gray-800'>{recipe.title}</div>
            <div className='flex justify-between mx-2 mt-5'>
              <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
              <div className='-mt-1'>
                <BookmarkIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Category 2 */}
    <div className='p-4'>
      <h2 className='text-xl font-bold text-white mb-2'>	Steaming</h2>
      <div className='flex flex-wrap'>
        {category2Items.map((recipe) => (
          <div key={recipe.title} className='border-red-200 size-60 bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md'>
            <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
              <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
            </div>
            <div className='mx-2 text-xl font-bold text-gray-800'>{recipe.title}</div>
            <div className='flex justify-between mx-2 mt-5'>
              <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
              <div className='-mt-1'>
                <BookmarkIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Category 3 */}
    <div className='p-4'>
      <h2 className='text-xl font-bold text-white mb-2'>Deep Frying </h2>
      <div className='flex flex-wrap'>
        {category3Items.map((recipe) => (
          <div key={recipe.title} className='border-red-200 size-60 bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md'>
            <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
              <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
            </div>
            <div className='mx-2 text-xl font-bold text-gray-800'>{recipe.title}</div>
            <div className='flex justify-between mx-2 mt-5'>
              <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
              <div className='-mt-1'>
                <BookmarkIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Category 4 */}
    <div className='p-4'>
      <h2 className='text-xl font-bold text-white mb-2'>Boiling and Shimmering</h2>
      <div className='flex flex-wrap'>
        {category4Items.map((recipe) => (
          <div key={recipe.title} className='border-red-200 size-60 bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md'>
            <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
              <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
            </div>
            <div className='mx-2 text-xl font-bold text-gray-800'>{recipe.title}</div>
            <div className='flex justify-between mx-2 mt-5'>
              <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
              <div className='-mt-1'>
                <BookmarkIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
export default MainPage;
