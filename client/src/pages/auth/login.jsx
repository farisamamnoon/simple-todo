import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "../../components/loading";
import { request } from "../../utils/request";
import { loginSchema, useSetUser } from "../../utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../../components/error";

export const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const setUser = useSetUser();

  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: (values) => request("auth/login", "POST", values),
    onSuccess: setUser,
  });

  if (isError) {
    console.log(error);
    return <Error error={error} />;
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="bg-primary-gradient w-screen h-screen grid place-content-center">
      <div className="bg-white p-8 md:p-16 lg:p-20 max-w-screen-md rounded-md shadow-xl">
        <h1 className="text-4xl md:text-5xl  text-blue-950 font-semibold text-center mb-16">
          Login to continue
        </h1>
        <form
          onSubmit={handleSubmit((values) => mutate(values))}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Username:</label>
            <input
              {...register("userName")}
              placeholder="Enter your username"
              className="bg-inherit shadow-lg px-4 py-2 text-blue-950 rounded-md"
            />
            <p className="text-red-500 font-semibold">
              {formState.errors?.userName?.message}
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Password:</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="bg-inherit shadow-lg px-4 py-2 text-blue-950 rounded-md"
            />
            <p className="text-red-500 font-semibold">
              {formState.errors?.password?.message}
            </p>
          </div>
          <button
            type="submit"
            className="bg-primary px-4 py-2 text-white rounded-md mt-8 disabled:bg-opacity-50 disabled:pointer-events-none"
            disabled={isPending}
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
