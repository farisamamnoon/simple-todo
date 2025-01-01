import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, useSetUser } from "../../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { request } from "../../utils/request";
import { Error } from "../../components/error";

export const Register = () => {
  const setUser = useSetUser();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => request("auth/register", "POST", values),
    onSuccess: setUser,
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler = (values) => {
    mutate(values);
  };

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="bg-primary-gradient w-screen h-screen grid place-content-center">
      <div className="bg-white p-16 rounded-md shadow-xl">
        <h1 className="text-5xl text-blue-950 font-semibold text-center mb-16">
          Create a new account
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
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
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Password:</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className="bg-inherit shadow-lg px-4 py-2 text-blue-950 rounded-md"
            />
            <p className="text-red-500 font-semibold">
              {formState.errors?.confirmPassword?.message}
            </p>
          </div>
          <button
            type="submit"
            className="bg-primary px-4 py-2 text-white rounded-md mt-8 hover:bg-opacity-90 disabled:bg-opacity-50 disabled:pointer-events-none"
            disabled={isPending}
          >
            {isPending ? "Submitting" : "Create Account"}
          </button>
          <Link to="/auth/login" className="text-center text-gray-500">
            Click here if you already have an account
          </Link>
        </form>
      </div>
    </div>
  );
};
