import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard } from "./pages/dash";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { ProtectedRoute } from "./utils/auth";
import { ErrorBoundary } from "./components/Error-Boundary";

const router = createBrowserRouter([
  {
    path: "/auth/login",
    element: (
      <ErrorBoundary>
        <Login />
      </ErrorBoundary>
    ),
  },
  {
    path: "/auth/register",

    element: (
      <ErrorBoundary>
        <Register />
      </ErrorBoundary>
    ),
  },
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
