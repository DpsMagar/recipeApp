import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axiosInstance from './AxiosInstance';
import { useNavigate } from 'react-router-dom';
const schema = yup.object().shape({
  steps: yup.array().of(
    yup.object().shape({
      instruction: yup.string().required('Step instruction is required'),
    })
  ).required('At least one step is required')
});

const StepsForms = () => {
    const navigate= useNavigate()
    const dish= localStorage.getItem('title')
  
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      steps: [{ instruction: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'steps'
  });

  const onSubmit = async (data) => {
    console.log(data);
    const updatedData= data.steps.map((data, index)=>({
        ...data,
        dish:dish,
        step_number:index
    }
    

    ));
    console.log(updatedData)

    try {
      const response = await axiosInstance.post('steps/',updatedData);
      console.log('Steps submitted successfully:', response.data);
      reset();
      navigate('/home')
    } catch (error) {
      console.error('Error submitting steps:', error);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-4 shadow-md rounded-md h-[600px] overflow-hidden`}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">List the Steps {dish && `For ${dish}`}</h2>

        <div className="flex-1 overflow-auto">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col mb-3 p-2 border border-gray-300 rounded-md">
              <label htmlFor={`steps[${index}].instruction`} className="text-xs font-medium text-gray-700">
                Step instruction
              </label>
              <textarea
                id={`steps[${index}].instruction`}
                {...register(`steps[${index}].instruction`)}
                className={`mt-1 block w-full px-2 py-1.5 border ${errors.steps?.[index]?.instruction ? 'border-red-500' : 'border-gray-300'} rounded-sm shadow-sm text-xs focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.steps?.[index]?.instruction && (
                <p className="mt-1 text-xs text-red-600">{errors.steps[index].instruction.message}</p>
              )}

              {/* Remove Step Button */}
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-xs text-red-600 hover:underline focus:outline-none mt-2"
              >
                Remove Step
              </button>
            </div>
          ))}
        </div>

        {/* Add Step Button */}
        <button
          type="button"
          onClick={() => append({ instruction: '' })}
          className="block w-full px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Step
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit Steps
        </button>
      </form>
    </div>
  );
};

export default StepsForms;
