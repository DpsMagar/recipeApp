import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { IDandTitleStore } from '../Zustand Store/Zstore';

const schema = yup.object().shape({
  steps: yup.array().of(
    yup.object().shape({
      instruction: yup.string().required('Step instruction is required'),
    })
  ).required('At least one step is required'),
});

const StepsForms = () => {
  const navigate = useNavigate();
  const dish = localStorage.getItem('title');
  const { title } = IDandTitleStore();
  const [dishData, setDishData] = useState(null);

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      steps: [{ instruction: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps',
  });

  const onSubmit = async (data) => {
    const updatedData = data.steps.map((data, index) => ({
      ...data,
      dish: dish,
      step_number: index,
    }));
    try {
      const response = await axiosInstance.post('steps/', updatedData);
      reset();
      navigate('/home');
    } catch (error) {
      console.error('Error submitting steps:', error);
    }
  };

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const response1 = await axiosInstance.get(`dishes/${title}/`);
        setDishData(response1.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDish();
  }, [title]);

  return (
    <div className="max-w-6xl mx-auto p-4 shadow-md rounded-md h-[600px] overflow-hidden">
      <div className="grid grid-cols-3 gap-4 h-full">
        {/* Left Section: Minimal Display */}
        <div className="bg-gray-50 p-2 rounded-md text-sm text-gray-600 overflow-auto">
          <h2 className="text-md font-semibold mb-1 text-gray-700">Dish Details</h2>
          {dishData && (
            <div className="space-y-1">
              <p><strong>Title:</strong> {dishData.title}</p>
              <p><strong>Category:</strong> {dishData.category.name}</p>
              <p><strong>Time:</strong> {dishData.estimatedTime} min</p>
            </div>
          )}
        </div>

        {/* Center Section: Compact Steps Form */}
        <div className="col-span-1">
          <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
            <h2 className="text-sm font-semibold mb-2 text-gray-800">List the Steps {dish && `For ${dish}`}</h2>
            <div className="flex-1 overflow-auto">
              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col mb-2 p-1 border border-gray-200 rounded-md">
                  <label htmlFor={`steps[${index}].instruction`} className="text-xs font-medium text-gray-600">
                    Step {index + 1}
                  </label>
                  <textarea
                    id={`steps[${index}].instruction`}
                    {...register(`steps[${index}].instruction`)}
                    className={`mt-1 block w-full px-2 py-1 border ${errors.steps?.[index]?.instruction ? 'border-red-400' : 'border-gray-200'} rounded-sm text-xs focus:outline-none`}
                    rows="2"
                  />
                  {errors.steps?.[index]?.instruction && (
                    <p className="mt-1 text-xs text-red-500">{errors.steps[index].instruction.message}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-xs text-red-500 hover:underline focus:outline-none mt-1"
                  >
                    Remove Step
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => append({ instruction: '' })}
              className="block w-full px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Add Step
            </button>
            <button
              type="submit"
              className="mt-2 w-full px-2 py-1 text-xs font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Submit Steps
            </button>
          </form>
        </div>

        {/* Right Section: Ingredients */}
        <div className="bg-gray-50 p-2 rounded-md text-sm text-gray-600 overflow-auto">
          <h2 className="text-md font-semibold mb-1 text-gray-700">Ingredients</h2>
          {dishData && dishData.ingredients.length > 0 ? (
            <ul className="list-disc pl-4 space-y-1">
              {dishData.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  {ingredient.quantity} of {ingredient.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ingredients available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepsForms;
