import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "./AxiosInstance";
import { formActivationStore, IDandTitleStore } from "../Zustand Store/Zstore";
import {  useNavigate } from "react-router-dom";


const IngredientForm = (props) => {
  const { dish } = props;
  const navigate = useNavigate()
  const{isFormActive,toggleFormActivation }= formActivationStore();
  const {setTitle}= IDandTitleStore()
  sessionStorage.setItem('isMainPage','false')
  




  const schema = yup.object().shape({
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .max(100, "Name must be at most 100 characters"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .max(50, "Quantity must be at most 50 characters"),
      })
    ),
  });

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ingredients: [{ name: "", quantity: "", dish: dish }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit = async (data) => {
    const updatedData = data.ingredients.map(ingredient => ({
      ...ingredient,
      dish: dish

    })
  );
    
    try {
      const response = await axiosInstance.post("ingredients/", updatedData);
      console.log("Ingredients created successfully:", response.data);
      props.toggleFocus();
      toggleFormActivation();
      reset();
      setTitle(dish)
      navigate(`/steps`)
    } catch (error) {
      console.error("Error creating ingredients:", error);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 shadow-md rounded-md h-[600px] overflow-hidden ${props.focus ? 'bg-white' : 'bg-gray-100'} ${isFormActive && "opacity-50 pointer-events-none"}`}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">List the Ingredients {dish&& `For ${dish}`}</h2>

        <div className="flex-1 overflow-auto">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-3 p-2 border border-gray-300 rounded-md">
              {/* Name Field */}
              <div className="flex-1 mr-3">
                <label htmlFor={`ingredients[${index}].name`} className="text-xs font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id={`ingredients[${index}].name`}
                  {...register(`ingredients[${index}].name`)}
                  className={`mt-1 block w-full px-2 py-1.5 border ${errors.ingredients?.[index]?.name ? "border-red-500" : "border-gray-300"} rounded-sm shadow-sm text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.ingredients?.[index]?.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.ingredients[index].name.message}</p>
                )}
              </div>

              {/* Quantity Field */}
              <div className="flex-1 mr-3">
                <label htmlFor={`ingredients[${index}].quantity`} className="text-xs font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="text"
                  id={`ingredients[${index}].quantity`}
                  {...register(`ingredients[${index}].quantity`)}
                  className={`mt-1 block w-full px-2 py-1.5 border ${errors.ingredients?.[index]?.quantity ? "border-red-500" : "border-gray-300"} rounded-sm shadow-sm text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                />
                {errors.ingredients?.[index]?.quantity && (
                  <p className="mt-1 text-xs text-red-600">{"Invalid"}</p>
                )}
              </div>

              {/* Remove Ingredient Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-red-600 hover:underline focus:outline-none mt-5"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Ingredient Button */}
        <button
          type="button"
          onClick={() => append({ name: "", quantity: "", dish: dish })}
          className="block w-full px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Ingredient
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit Ingredients
        </button>
      </form>
    </div>
  );
};

export default IngredientForm;
