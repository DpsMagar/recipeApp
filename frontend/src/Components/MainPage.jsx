import React, { useState, useEffect, } from 'react';
import axiosInstance from './AxiosInstance';
import bk1 from "../Images/b1.png";
import bk2 from "../Images/b2.png";
import { bookmarkStore } from '../Zustand Store/Zstore';
import { Link, useNavigate } from 'react-router-dom';

function MainPage() {
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState([]);
  const [category1Items, setCategory1Items] = useState([]);
  const [category2Items, setCategory2Items] = useState([]);
  const [category3Items, setCategory3Items] = useState([]);
  const [category4Items, setCategory4Items] = useState([]);
  const { bookmarks, toggleBookmark, setBookmarks } = bookmarkStore();
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); 
  sessionStorage.setItem('isMainPage', 'true');
  sessionStorage.setItem('isLoggedIn', 'true');
  const navigate = useNavigate();
  const RecipeNames= Object.keys(bookmarks)  
  
  function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.classList.add("toast");
    
    const inputContainer = document.getElementById("input-container");
    inputContainer.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 1000); 
  }
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("users/");
        setUserName(response.data)
        const userName = localStorage.getItem("userName");
        const user = response.data.find((user) => user.username === userName);
        if (user) {
          setUserId(user.id);
          sessionStorage.setItem('userID', user.id);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axiosInstance.get('/dishes/');
        const items = response.data;

        setBookmarks(items);
        

        const category1 = items.filter(item => item.category === 1);
        const category2 = items.filter(item => item.category === 2);
        const category3 = items.filter(item => item.category === 3);
        const category4 = items.filter(item => item.category === 4);

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
  }, [userId, setBookmarks]);

  const handleBookmark = async (e, recipeTitle) => {
    e.preventDefault();
    toggleBookmark(recipeTitle);

    try {
      await axiosInstance.post(`dishes/${recipeTitle}/bookmark/`);      
      console.log('Bookmark toggled successfully');
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  };

  const handleSearchInput = (e) => {
    if (e.key === 'Enter') {
      
      const query= e.target.value;
      if(RecipeNames.includes(query)){
        navigate(`/detail/${query}`)

      }
      else{
        console.log('hi');
        
          showToast("Entered Dish is not available!!")
      }      
    }
    else {
      // Update the state as usual
      setSearchQuery(e.target.value);
    }
  };


  return (
    <div className='w-full h-full bg-gray-900'>
      <div className="p-4 flex justify-center" id="input-container">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInput}
          onKeyDown={handleSearchInput}
          placeholder="Search recipes..."
          className="w-3/4 max-w-sm p-2 text-sm bg-gray-800 text-white placeholder-gray-500 rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
        />
      </div>

      {/* Category 1 */}
      <div className='p-4 flex flex-col'>
        <div className='flex gap-8 text-white'>
          <h2 className='text-xl font-bold text-white mb-2'>Stir Frying</h2>
          <Link to="/home/create" state={{ category: 1 }}>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-500">
              Create
            </button>
          </Link>
        </div>
        <div className='flex flex-wrap'>
          {category1Items.map((recipe) => (
            <Link to={`/detail/${recipe.title}`} key={recipe.title}>
              <div key={recipe.title} className='bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-out'>
                <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
                  <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
                </div>
                <div className='mx-2 text-xl font-bold text-gray-800'>
                  {recipe.title}
                </div>
                <div className='flex justify-between mx-2 mt-5'>
                  <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
                  <div className='pb-4'>
                    <img src={!bookmarks[recipe.title] ? bk1 : bk2} alt="" className='size-6' onClick={(e) => handleBookmark(e, recipe.title)} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

       {/* Category 2 */}
       <div className='p-4'>
        <div className='flex gap-8 text-white'>
          <h2 className='text-xl font-bold text-white mb-2'>Steaming</h2>
          <Link to="/home/create" state={{ category: 2 }}>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-500">
              Create 
            </button>   
          </Link>  
        </div>
        <div className='flex flex-wrap'>
          {category2Items.map((recipe) => (
            <Link to={`/detail/${recipe.title}`} key={recipe.title}>
              <div key={recipe.title} className='bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-out'>
                <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
                  <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
                </div>
                <div className='mx-2 text-xl font-bold text-gray-800'>
                  {recipe.title}
                </div>
                <div className='flex justify-between mx-2 mt-5'>
                  <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
                  <div className='pb-4'>
                    <img src={!bookmarks[recipe.title] ? bk1 : bk2} alt="" className='size-6' onClick={(e) => handleBookmark(e, recipe.title)}/>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Category 3 */}
      <div className='p-4'>
        <div className='flex gap-8 text-white'>
          <h2 className='text-xl font-bold text-white mb-2'>Deep Frying</h2>
          <Link to="/home/create" state={{ category: 3 }}>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-500">
              Create 
            </button>   
          </Link>  
        </div>
        <div className='flex flex-wrap'>
          {category3Items.map((recipe) => (
            <Link to={`/detail/${recipe.title}`} key={recipe.title}>
              <div key={recipe.title} className='bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-out'>
                <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
                  <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
                </div>
                <div className='mx-2 text-xl font-bold text-gray-800'>
                  {recipe.title}
                </div>
                <div className='flex justify-between mx-2 mt-5'>
                  <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
                  <div className='pb-4'>
                    <img src={!bookmarks[recipe.title] ? bk1 : bk2} alt="" className='size-6' onClick={(e) => handleBookmark(e, recipe.title)}/>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Category 4 */}
      <div className='p-4'>
        <div className='flex gap-8 text-white'>
          <h2 className='text-xl font-bold text-white mb-2'>Boiling and Shimmering</h2>
          <Link to="/home/create" state={{ category: 4 }}>
            <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-500">
              Create 
            </button>   
          </Link> 
        </div>
        <div className='flex flex-wrap'>
          {category4Items.map((recipe) => (
            <Link to={`/detail/${recipe.title}`} key={recipe.title}>
              <div key={recipe.title} className='bg-slate-500 m-2 overflow-hidden flex flex-col rounded-md transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-out'>
                <div className='bg-slate-400 size-36 w-52 rounded-md my-2 mx-4'>
                  <img className='w-full h-full rounded-md' src={recipe.image} alt={recipe.title} />
                </div>
                <div className='mx-2 text-xl font-bold text-gray-800'>
                  {recipe.title}
                </div>
                <div className='flex justify-between mx-2 mt-5'>
                  <div className='text-sm text-gray-800'>{recipe.estimatedTime} mins</div>
                  <div className='pb-4'>
                    <img src={!bookmarks[recipe.title] ? bk1 : bk2} alt="" className='size-6' onClick={(e) => handleBookmark(e, recipe.title)}/>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MainPage;
