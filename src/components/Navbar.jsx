import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utilities/utils";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");

    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/logIn");
    }, 1000);
  };

  return (
    <nav className="navbar  container-fluid navbar-expand-lg bg-body-tertiary">
      <div className="container ">
        <a className="navbar-brand" href="/mainPage">
          Navbar
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {userData && (
            <div className=" ms-auto  d-flex" style={{ width: "50px", height: "50px", position: "relative" }}>
              <img className=" rounded-circle " src={userData.image ? userData.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

              <button className=" btn btn-primary " aria-current="page" href="#" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};
export default Navbar;
