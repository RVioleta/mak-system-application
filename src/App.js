import "./App.css";
import Register from "./components/Register";
import NonAuthHome from "./components/NonAuthHome";
import Login from "./components/Login";
import StyledContainer from "@mui/material/StyledEngineProvider";
import { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPublic from "./components/RootPublic";
import ErrorPage from "./components/ErrorPage";
import RootPrivate from "./components/RootPrivate";
import AuthHome from "./components/AuthHome";
import AssetPlatforms from "./components/AssetPlatforms";
import Cryptocurrencies from "./components/Cryptocurrencies";
import MyCoins from "./components/MyCoins";
import LogOut from "./components/LogOut";
import Table from "./components/Table";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPublic />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <NonAuthHome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "/home/",
    element: <RootPrivate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home/",
        element: <AuthHome />,
      },

      {
        path: "/home/homePage",
        element: <AuthHome />,
      },

      {
        path: "/home/platforms",
        element: <AssetPlatforms />,
      },

      {
        path: "/home/cryptocurrencies",
        element: <Cryptocurrencies />,
      },
      {
        path: "/home/coins",
        element: <MyCoins />,
      },

      {
        path: "/home/logout",
        element: <LogOut />,
      },
      {
        path: "/home/table",
        element: <Table />,
      },
    ],
  },
]);

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
