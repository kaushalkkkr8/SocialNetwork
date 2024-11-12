import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/signUpLogIn/Login";
import SignUp from "./pages/signUpLogIn/SignUp";
import MainPage from "./pages/MainPage";
import Profile from "./pages/userProfile/Profile";
import Bookmark from "./pages/userProfile/Bookmark";
import EditPosts from "./pages/userProfile/EditPosts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const redirectPaths = ["/logIn", "/signUp", "/login", "/"];
      if (redirectPaths.includes(location.pathname)) {
        navigate("/mainPage", { replace: false });
      }
    }
  }, [location.pathname, navigate]);

  const PrivateRoute = ({ element }) => (isAuthenticated ? element : <Navigate to="/logIn" />);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/logIn" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<Bookmark />} />
        <Route path="/editPosts" element={<EditPosts />} />
        <Route path="/mainPage" element={<PrivateRoute element={<MainPage />} />} />
      </Routes>
    </>
  );
}

export default App;
