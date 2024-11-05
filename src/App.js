import "./App.css";

import LandingPage from "./pages/LandingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/signUpLogIn/Login";
import SignUp from "./pages/signUpLogIn/SignUp";
import MainPage from "./pages/MainPage";
import UserProfile from "./pages/userProfile/UserProfile";
import Photos from "./pages/userProfile/Photos";
import EditProfile from "./pages/userProfile/EditProfile";
import Bookmark from "./pages/userProfile/Bookmark";
import EditPosts from "./pages/userProfile/EditPosts";
import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-toastify/ReactToastify.css";
import RefreshHandler from "./pages/signUpLogIn/RefreshHandler";


function App() {
  const [isAuthenticated,setIsauthenticated]=useState(false)
  const PrivateRoute=({element})=>{
    return isAuthenticated?element:<Navigate to="/logIn"/>
  }
 

  return (
    <>
 <RefreshHandler setIsauthenticated={setIsauthenticated} />
      <Routes>
        <Route path='/' element={<LandingPage/>} />
      
        <Route path='/logIn' element={<Login/>} />
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/userProfile' element={<UserProfile/>} />
        <Route path='/userProfile/photos' element={<Photos/>} />
        <Route path='/userProfile/editProfile' element={<EditProfile/>} />
        <Route path='/userProfile/bookmark' element={<Bookmark/>} />
        <Route path='/userProfile/editPosts' element={<EditPosts/>} />
        <Route path='/mainPage' element={<PrivateRoute element={<MainPage/>}/>} />
      </Routes>
    </>
  );
}

export default App;
