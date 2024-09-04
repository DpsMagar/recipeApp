import React, { useEffect, useState } from 'react';
import axiosInstance from './AxiosInstance';
import { useParams, Link } from 'react-router-dom';

const DishDetail = () => {
  const { title } = useParams(); // Get the dish title from URL parameters
  const [dish, setDish] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response = await axiosInstance.get(`dishes/${title}/`);
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{dish.title}</h1>
      <img src={dish.image} alt={dish.title} className="w-full h-auto mb-4" />
      <p className="mb-4"><strong>Description:</strong> {dish.description}</p>
      <p className="mb-4"><strong>Instructions:</strong> {dish.instructions}</p>
      <p className="mb-4"><strong>Estimated Time:</strong> {dish.estimatedTime}</p>
      <p className="mb-4"><strong>Category:</strong> {dish.category.name}</p>
      <p className="mb-4"><strong>Created At:</strong> {new Date(dish.created_at).toLocaleString()}</p>
      <p className="mb-4"><strong>Updated At:</strong> {new Date(dish.updated_at).toLocaleString()}</p>
      <p className="mb-4"><strong>Public:</strong> {dish.public ? 'Yes' : 'No'}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul>
        {dish.ingredients.map(ingredient => (
          <li key={ingredient.id} className="mb-1">{ingredient.name} - {ingredient.quantity}</li>
        ))}
      </ul>

      <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
    </div>
  );
};

export default DishDetail;
