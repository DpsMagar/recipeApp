import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "./AxiosInstance"; 


const IngredientForm = () => {
  // Validation schema using Yup
  const schema = yup.object().shape({
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Name is required").max(100, "Name must be at most 100 characters"),
        quantity: yup.string().required("Quantity is required").max(50, "Quantity must be at most 50 characters"),
      })
    ),
  });

  // Initialize the useForm hook with Yup resolver
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "" }],
    },
  });

  // Use Field Array hook
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // Send the POST request to the Django backend
      const response = await axiosInstance.post("ingredients/", data);
      
      // Handle success, such as displaying a success message or redirecting
      console.log("Ingredients created successfully:", response.data);
    } catch (error) {
      // Handle error, such as displaying an error message
      console.error("Error creating ingredients:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">Ingredients</h2>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4">
          <label htmlFor={`ingredients[${index}].name`} className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id={`ingredients[${index}].name`}
            {...register(`ingredients[${index}].name`)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.ingredients?.[index]?.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.ingredients?.[index]?.name && <p className="mt-2 text-sm text-red-600">{errors.ingredients[index].name.message}</p>}

          <label htmlFor={`ingredients[${index}].quantity`} className="block text-sm font-medium text-gray-700 mt-2">
            Quantity
          </label>
          <input
            type="text"
            id={`ingredients[${index}].quantity`}
            {...register(`ingredients[${index}].quantity`)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.ingredients?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          />
          {errors.ingredients?.[index]?.quantity && <p className="mt-2 text-sm text-red-600">{errors.ingredients[index].quantity.message}</p>}

          <button type="button" onClick={() => remove(index)} className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: "", quantity: "" })}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Ingredient
      </button>

      <button type="submit" className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 mt-4">
        Submit
      </button>
    </form>
  );
};

export default IngredientForm;
