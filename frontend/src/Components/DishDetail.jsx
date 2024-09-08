import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import { useParams, Link } from 'react-router-dom';
import { IDandTitleStore } from '../Zustand Store/Zstore';

const DishDetail = () => {
  const { title } = useParams(); // Get the dish title from URL parameters
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);
  const name= localStorage.getItem('userName')
  const User = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();



  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axiosInstance.get(`dishes/${title}/`);
        console.log(response.data);
        setDish(response.data);
      } catch (err) {
        setError('Error fetching dish details');
        console.error(err);
      }
    };

    fetchDish();
  }, [title]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!dish) return <div>Loading...</div>;

  // If the steps are part of the instructions as a string, split it into an array
  const steps = dish.instructions.split('.').filter(step => step.trim() !== '');

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Dish Details Section */}
      <div className="flex flex-col lg:flex-row items-start">
        {/* Dish Image */}
        <div className="lg:w-1/3 w-full mb-6 lg:mb-0">
          {dish.image && (
            <img
              src={dish.image}
              alt={dish.title}
              className="object-cover w-full h-48 lg:h-64 rounded-lg"
            />
          )}
        </div>

        {/* Dish Info */}
        <div className="lg:w-2/3 w-full lg:ml-8">
          <h1 className="text-3xl font-bold mb-4">{dish.title}</h1>

          <p className="text-lg text-gray-700 mb-4">{dish.description}</p>

          <div className="text-gray-600 mb-4">
            <span className="font-semibold">Estimated Time: </span>
            {dish.estimatedTime} minutes
          </div>

          {dish.category && (
            <div className="text-sm mb-4">
              <span className="font-semibold text-gray-600">Category: </span>
              {dish.category.name}
            </div>
          )}

          <div className="text-sm text-gray-600 mb-4">
            <div>Posted by: {User}</div>
            <div>Created at: {new Date(dish.created_at).toLocaleDateString()}</div>
            <div>Updated at: {new Date(dish.updated_at).toLocaleDateString()}</div>
            <div>Status: {dish.public ? "Public" : "Private"}</div>
          </div>
        </div>
      </div>

      {/* Ingredients and Steps Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {dish.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="text-gray-700">
                <span className="font-semibold">{ingredient.quantity}</span> - {ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Steps</h2>
          <ol className="list-decimal list-inside space-y-2">
            {dish.steps.map((step,index) => (
              <li key={step.id} className="text-gray-700 list-none">
                <span className="font-semibold">Step {index+1}: </span>
                {step.instruction}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
