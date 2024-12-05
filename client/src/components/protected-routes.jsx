import { Navigate } from "react-router-dom";
import { useUser } from "../auth";
import { Loading } from "./loading";
import { Error } from "./error";

export const ProtectedRoute = ({ children }) => {
  const user = useUser();

  if (user.isPending) {
    return <Loading />;
  }

  if (user.isError) {
    console.log(user.error.message);

    return <Error error={user.error.message} />;
  }

  if (user.data.isAuthenticated) {
    return <>{children}</>;
  } else {
    <Navigate to={"auth/login"} />;
  }
};
