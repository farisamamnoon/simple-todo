import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dash";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { ProtectedRoute } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
