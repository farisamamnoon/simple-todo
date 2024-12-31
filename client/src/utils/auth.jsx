import { Navigate, useNavigate } from "react-router-dom";
import { z } from "zod";

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

export const loginSchema = z.object({
  userName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export const useSetUser = () => {
  const navigate = useNavigate();

  return (data) => {
    if (!data || !data?.accessToken) {
      navigate("/auth/login");
    }
    localStorage.setItem("TODO_APP_USER", data.data.accessToken);
    navigate("/");
  };
};

export const useLogout = () => {
  const navigate = useNavigate();

  return () => {
    localStorage.clear();
    navigate("/auth/login");
  };
};

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("TODO_APP_USER");

  if (user) {
    return <>{children}</>;
  } else {
    return <Navigate to={"auth/login"} />;
  }
};
