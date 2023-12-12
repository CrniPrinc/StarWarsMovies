import "./App.css";
import Header from "./components/header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/Login";
import { Suspense, lazy } from "react";
import ErrorPage from "./pages/ErrorPage";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

const Movies = lazy(() => import("./pages/Movies"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/movies",
        element: (
          <Suspense fallback="Loading...">
            <Movies />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
