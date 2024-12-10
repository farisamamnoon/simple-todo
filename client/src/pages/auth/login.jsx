import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Notification, useNotification } from "../../components/notification";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "../../components/loading";
import { request } from "../../utils/request";
import { useEffect } from "react";
import { useSetUser } from "../../utils/auth";

export const Login = () => {
  const { notify, ...notifyProps } = useNotification();
  const { register, handleSubmit } = useForm();
  const setUser = useSetUser();

  const mutation = useMutation({
    mutationFn: (values) => request("auth/login", "POST", values),
    onSuccess: setUser,
  });

  useEffect(() => {
    if (mutation.isError) {
      console.log(mutation.error);
      notify(mutation.error.message);
    }
  });

  if (mutation.isPending) {
    return <Loading />;
  }

  return (
    <div className="bg-primary-gradient w-screen h-screen grid place-content-center">
      <div className="bg-white p-8 md:p-16 lg:p-20 max-w-screen-md rounded-md shadow-xl">
        <h1 className="text-4xl md:text-5xl  text-blue-950 font-semibold text-center mb-16">
          Login to continue
        </h1>
        <form
          onSubmit={handleSubmit((values) => mutation.mutate(values))}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-col gap-4">
            <label className="text-blue-950">Username:</label>
            <input
              {...register("userName")}
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
            disabled={mutation.isPending}
          >
            Login
          </button>
          <Link to="/auth/register" className="text-center text-gray-500">
            Click here if you don't have an account
          </Link>
        </form>
      </div>
      <Notification {...notifyProps} />
    </div>
  );
};
