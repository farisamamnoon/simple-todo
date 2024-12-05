import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate()
  const { register, handleSubmit } = useForm();
  const submitHandler = (values) => {
    console.log(values);
    navigate('/')
  };
  return (
    <div className="bg-primary-gradient w-screen h-screen grid place-content-center">
      <div className="bg-white p-4 md:p-16 lg:p-20 max-w-screen-md rounded-md shadow-xl">
        <h1 className="text-5xl text-blue-950 font-semibold text-center mb-16">
          Login to continue
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Username:</label>
            <input
              {...register("username")}
              placeholder="Enter your username"
              className="bg-inherit shadow-lg px-4 py-2 text-blue-950 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Password:</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="bg-inherit shadow-lg px-4 py-2 text-blue-950 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-4 py-2 text-white rounded-md mt-8"
          >
            Login
          </button>
          <Link to="/auth/register" className="text-center text-gray-500">
            Click here if you don't have an account
          </Link>
        </form>
      </div>
    </div>
  );
};
