import { useEffect, useState } from "react";
import { handleError } from "../utilities/utils";
import { Link } from "react-router-dom";
import { fetchUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const MainPageLeft = () => {
  const [logInDetail, setLogInDetail] = useState(null);
  const dispatch = useDispatch();
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };



  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found. Please log in.");
        return;
      }

      const response = await fetch("https://major-project2-backend.vercel.app/profile", {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch profile data.");
      }

      const result = await response.json();
      
 
      if (result.success) {
        setLogInDetail(result.profile);
      }
      
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);





  const { profile } = useSelector((state) => state.user);
  const allUser = profile || [];
  const userData = allUser.find((userss) => userss._id === logInDetail?._id);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  

  return (
    <div className="col-md-3">
      <div className="card sticky-top">
        {userData?.coverImage?.length>0 ? <img src={userData?.coverImage[userData?.coverImage?.length-1].imageURL} className="card-img-top img-fluid" alt="..." style={{ maxHeight: "40px", objectFit: "cover" }} /> : null}
        <div className="d-flex justify-content-center ">
          <div className="mt-3" style={{ maxWidth: "90px" }}>
            {userData?.image?.length>0 ? (
              <img src={userData?.image[userData?.image?.length-1].imageURL} className="img-fluid" alt="..." />
            ) : (
              <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
            )}
          </div>
        </div>
        <div className="card-body text-center">
          <h5 className="card-title">{userData?.name}</h5>
          <Link to="/userProfile" className="card-text" style={{textDecoration:"none"}}>{userData?.userName}</Link>
          <p className="card-text">{userData?.profession}</p>

          <div className="d-flex">
          
            <div className="col ">
              <b>{userData?.follower?.length}</b>
              <p className="fs-6">Followers</p>
            </div>
            <div className="col">
              <b>{userData?.following?.length}</b>
              <p> Following</p>
            </div>
          </div>
          <hr />

          <div className="my-2 text-center">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Link to="/mainPage">
                  <i className="bi bi-house-fill"></i>
                  <p>Home</p>
                </Link>
              </div>
              <div className="col-md-6">
                <Link to="/userProfile/bookmark">
                  <i className="bi bi-bookmark-fill"></i>
                  <p>Bookmark</p>
                </Link>
              </div>
              <div className="col-md-6 ">
                <Link to="/userProfile">
                  <i className=" bi bi-person-lines-fill"></i>
                  <p>Profile</p>
                </Link>
              </div>
              <div className="col-md-6">
                <i className="bi bi-person-fill"></i>
                <p>People</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageLeft;
