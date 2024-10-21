import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/userProfile/UserProfile";
import Photos from "./pages/userProfile/Photos";
import EditProfile from "./pages/userProfile/EditProfile";
import Bookmark from "./pages/userProfile/Bookmark";
import EditPosts from "./pages/userProfile/EditPosts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/logIn",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/mainPage",
    element: <MainPage />,
  },
  {
    path: "/userProfile",
    element: <UserProfile />,
  },
  {
    path: "/userProfile/photos",
    element: <Photos />,
  },
  {
    path: "/userProfile/videos",
    element: <Photos />,
  },
  {
    path: "/userProfile/editProfile",
    element: <EditProfile />,
  },
  {
    path: "/userProfile/bookmark",
    element: <Bookmark />,
  },
  {
    path: "/userProfile/editPosts",
    element: <EditPosts />,
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
