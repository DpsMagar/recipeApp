import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "./AxiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import IngredientForm from "./IngredientForm";
import { focusStore } from "../Zustand Store/Zstore";

const DishForm = () => {
  const [users, setUsers] = useState([]);
  const [category, setCategory] = useState();
  const [title, setTitle] = useState();
  const location = useLocation();
  const {focus, toggleFocus}= focusStore();
  useEffect(() => {
    const cat = location.state?.category;
    if (cat) {
      setCategory(cat);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("users/");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    }, []);

  const userName = localStorage.getItem("userName");
  const userId = users.find((user) => user.username === userName);

  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Title is required")
      .max(200, "Title must be at most 200 characters"),
    description: yup.string().required("Description is required"),
    instructions: yup.string().required("Instructions are required"),
    estimatedTime: yup.string().required("Estimated time is required"),
    image: yup.mixed().required("Image is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // const handleFocus= ()=>{
  //   setFocus(true)
  // }

  const onSubmit = async (data) => {
    console.log(data.title);
    
    setTitle((prevTitle) => data.title);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("instructions", data.instructions);
    formData.append("estimatedTime", data.estimatedTime);
    formData.append("image", data.image[0]);
    formData.append("category", category);

    if (userId) {
      formData.append("user", userId.id);
    } else {
      console.error("User ID not found");
      return;
    }
   
    try {
      const response = await axiosInstance.post("dishes/", formData);
      console.log("Dish created successfully:", response.data);
      toggleFocus()

    } catch (error) {
      console.error("Error creating dish:", error);
    }
  };
  useEffect(() => {
    console.log("Title updated:", title);
  }, [title]);


  

  return (
    <div className="flex mx-auto py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        // o={()=>toggleFocus()}
        className={`max-w-2xl mx-auto p-6 ${!focus ? 'bg-white' : 'bg-gray-100'} shadow-lg  rounded-lg mb-8`}
      >
        <h2 className="text-2xl font-bold mb-6">Add New Dish</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className={`mt-1 block w-full px-4 py-2 border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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
            className={`mt-1 block w-full px-4 py-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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
            className={`mt-1 block w-full px-4 py-2 border ${errors.instructions ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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
            className={`mt-1 block w-full px-4 py-2 border ${errors.estimatedTime ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
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
            className={`mt-1 block w-full px-4 py-2 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <button
        // onClick={()=>toggleFocus()}
          type="submit"
          className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
        <IngredientForm focus={focus} toggleFocus={toggleFocus} dish={title} />
    </div>
  );
};

export default DishForm;
