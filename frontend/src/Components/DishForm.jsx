import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";

const DishForm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("users/");
        setUsers(response.data); // Update state with user data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const userName = localStorage.getItem("userName");
  const userId = users.find((user) => user.username === userName);
  console.log(userId);

  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("Title is required").max(200, "Title must be at most 200 characters"),
    description: yup.string().required("Description is required"),
    instructions: yup.string().required("Instructions are required"),
    estimatedTime: yup.string().required("Estimated time is required"),
    image: yup.mixed().required("Image is required"),
    category: yup.string().required("Category is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();

    // Append all form fields to the FormData object
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("instructions", data.instructions);
    formData.append("estimatedTime", data.estimatedTime);
    formData.append("image", data.image[0]); // Append the first file from the image input
    formData.append("category", data.category);

    // Check if userId is defined before appending it to formData
    if (userId) {
      formData.append("user", userId.id);
    } else {
      console.error("User ID not found");
      return; // Exit early if userId is not found
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      // Send the POST request to the Django backend
      const response = await axiosInstance.post("dishes/", formData);
      
      // Handle success, such as displaying a success message or redirecting
      console.log("Dish created successfully:", response.data);
      // Optionally navigate to another page
      // navigate('/some-route');
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error("Error creating dish:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>}
      </div>

      {/* Instructions */}
      <div className="mb-4">
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Instructions
        </label>
        <textarea
          id="instructions"
          {...register("instructions")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.instructions ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.instructions && <p className="mt-2 text-sm text-red-600">{errors.instructions.message}</p>}
      </div>

      {/* Estimated Time */}
      <div className="mb-4">
        <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">
          Estimated Time
        </label>
        <input
          type="text"
          id="estimatedTime"
          {...register("estimatedTime")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.estimatedTime ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.estimatedTime && <p className="mt-2 text-sm text-red-600">{errors.estimatedTime.message}</p>}
      </div>

      {/* Image */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="image"
          {...register("image")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>}
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register("category")}
          className={`mt-1 block w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        >
          {/* Placeholder and options */}
          <option value="">Select a category</option>
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
          {/* Add options dynamically based on categories */}
        </select>
        {errors.category && <p className="mt-2 text-sm text-red-600">{errors.category.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Submit
      </button>
    </form>
  );
};

export default DishForm;
