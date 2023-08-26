import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../components/layouts/RootLayout";
import PrivateLayout from "../components/layouts/PrivateLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Loader from "../components/Common/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "loader",
        element: <Loader />,
      },
      {
        path: "dashboard",
        element: <PrivateLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);
