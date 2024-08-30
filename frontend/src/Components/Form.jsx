import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

function Form() {
    const schema= yup.object().shape({
        fullName: yup.string().required("full name is required"),
        email: yup.string().required().email("Enter valid email"),
        age: yup.number().required("Enter age").positive("age must be positive").min(18),
        password: yup.string().required().min(4).max(8),
        confirmPassword: yup.string().required("Confirm Password is required").oneOf([yup.ref('password'), null], 'Passwords must match'),
    })
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema),
    });
  const onSubmit = (data) => {    
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-800">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-slate-700 p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Enter Your Name" 
            {...register("fullName")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>{errors.fullName?.message}</p>
        </div>
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email Here" 
            {...register("email")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>{errors.email?.message}</p>

        </div>
        <div className="mb-4">
          <input 
            type="number" 
            placeholder="Age here" 
            {...register("age")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>{errors.age?.message}</p>

        </div>
        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Enter Password" 
            {...register("password")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>{errors.password?.message}</p>

        </div>
        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            {...register("confirmPassword")} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p>{errors.confirmPassword?.message}</p>

        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
