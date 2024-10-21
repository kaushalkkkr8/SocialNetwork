import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser, logInStatus } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { user } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = data.find((user) => user.logIn === true);
  const [avtar, setAvtar] = useState("");
  const avtars={
    male:"https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female:"https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg"
  }

  useEffect(() => {
    // Fetch user data if it doesn't exist
    if (!data.length || !userData) {
      dispatch(fetchLogInUser());
    } else if (userData.sex === "Male") {
      setAvtar(avtars.male); // Set male avatar
    } else if (userData.sex === "Female") {
      setAvtar(avtars.female); // Set female avatar
    }
  }, [dispatch, data, userData])

  const logOutHandler = () => {
    const logIn = { logIn: false };;
    dispatch(logInStatus({ id: userData._id, updateprofile: logIn }));
    navigate('/logIn')
  };

  return (
    <nav className="navbar  container-fluid navbar-expand-lg bg-body-tertiary">
      <div className="container ">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {userData && (
            <div className=" ms-auto  d-flex" style={{ width: "50px", height: "50px", position: "relative" }}>
              <img className=" rounded-circle " src={userData.image?userData.image:avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

              <button className="btn " onClick={logOutHandler}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
