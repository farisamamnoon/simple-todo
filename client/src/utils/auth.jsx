import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loading } from "../components/loading";
import { Error } from "../components/error";
import { request } from "./request";

export const registerSchema = z
  .object({
    userName: z.string(),
    password: z.string().min(8, "Minimum 8 characters needed"),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match",
  })
  .transform(({ userName, password }) => ({ userName, password }));

export const useSetUser = () => {
  const navigate = useNavigate();
  return () => {
    navigate("/");
  };
};

export const ProtectedRoute = ({ children }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => request("auth/user", "GET"),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <Navigate to={"auth/login"} />;
  }

  if (data.data.isAuthenticated) {
    return <>{children}</>;
  } else {
    return <Navigate to={"auth/login"} />;
  }
};

// export const useUser = () => {
//   console.log("aj");
//   const navigate = useNavigate();
//   const jwt = localStorage.getItem("accessToken");

//   if (!jwt) {
//     navigate("/auth/login");
//     return;
//   }

//   const getUser = () => {
//     return fetch(`https://localhost:8080/api/auth/status`, {
//       headers: {
//         authorization: `Bearer ${jwt}`,
//       },
//     });
//   };

//   const { data, isPending, isError, error } = useQuery({
//     queryKey: "user",
//     queryFn: getUser,
//   });

//   if (isPending) {
//     return <Loading />;
//   }

//   if (isError) {
//     return <Error error={error} />;
//   }

//   if (!data.data.isAuthenticated) {
//     navigate("/auth/login");
//     return;
//   }
// };
