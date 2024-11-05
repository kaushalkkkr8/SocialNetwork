import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { handleError } from "../utilities/utils";

const UserProfileTop = ({ userDetail }) => {
  const dispatch = useDispatch();
  const [logInDetail, setLogInDetail] = useState("");
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


  const { profile,status,error } = useSelector((state) => state.user);
  const allUser = profile || [];
  const logInProfileData = allUser.find((userss) => userss._id === logInDetail?._id);
  const userData = userDetail ? userDetail : logInProfileData;

  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    dispatch(fetchUser());
    console.log("apple");
    
  }, []);

  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {userData ? (
        <div className="card">
          {/* <img src={userData.coverImage} className="card-img-top img-fluid" alt="Cover" style={{ maxHeight: "200px", objectFit: "cover" }} /> */}
          {userData?.coverImage ?.length>0? <img src={userData?.coverImage[userData?.coverImage?.length-1].imageURL}  className="card-img-top img-fluid" alt="..." style={{ maxHeight: "100px", objectFit: "cover" }} /> : null}
          <div className="card-body">
            <div className="text-center mb-3">
              <div
                className="me-2"
                style={{
                 maxWidth: "100px",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {userData?.image?.length>0 ? (
                  <img src={userData?.image[userData?.image?.length-1].imageURL} className="img-fluid " alt="..." />
                ) : (
                  <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                )}
              </div>
              <div className="text-center">
                <h6 className="card-title">{userData.name}</h6>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col">
                  <i className="bi bi-briefcase-fill text-warning-emphasis"></i>
                  <p className="d-inline">{userData.profession}</p>
                </div>
                <div className="col">
                  <p>
                    <i className="bi bi-geo-alt-fill text-primary-emphasis"></i>
                    {userData.country}
                  </p>
                </div>
                <div className="col">
                  <Link to="/userProfile/photos" state={userData} style={{ textDecoration: "none" }}>
                    <i className="bi bi-image-fill text-success"></i> Photos
                  </Link>
                </div>
                <div className="col">
                  <Link to="/userProfile/videos" state={userData} style={{ textDecoration: "none" }}>
                    <i className="bi bi-camera-reels-fill text-primary"></i> Video
                  </Link>
                </div>
                <div className="col">
                  <Link to="/userProfile/bookmark" state={userData} style={{ textDecoration: "none" }}>
                    <i className="bi bi-bookmark-fill text-danger-emphasis"></i> Bookmark
                  </Link>
                </div>
                <div className="col">
                  {/* {data?.find((user) => user.logIn === true)&&data?.find((user) => user.logIn === true)._id===userDetail?._id &&(
                    <Link to="/userProfile/editProfile" className="btn btn-primary">
                      <i className="bi bi-pencil-fill"></i> Edit Profile
                    </Link>
                  )} */}
                  {logInProfileData === userData ? (
                    <Link to="/userProfile/editProfile" className="btn btn-primary">
                      <i className="bi bi-pencil-fill"></i> Edit Profile
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No user data found!</p>
      )}
    </>
  );
};

export default UserProfileTop;
