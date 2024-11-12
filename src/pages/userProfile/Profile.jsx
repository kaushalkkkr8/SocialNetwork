import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchUser } from "../../features/userSlice";
import { handleError } from "../../utilities/utils";
import UserProfile from "./UserProfile";
import Photos from "./Photos";
import Bookmark from "./Bookmark";
import EditProfile from "./EditProfile";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileLeft from "../../components/UserProfileleLeft";

const Profile = () => {
  const dispatch = useDispatch();
  const [logInDetail, setLogInDetail] = useState("");
  const [showMyPosts, setShowMyPosts] = useState(true);
  const [showMyPhoto, setShowMyPhoto] = useState(false);
  const [showMyBookmark, setShowMyBookmark] = useState(false);
  const [showEditProfile, setShowMyEditProfile] = useState(false);
 
  const location = useLocation();
  const userDetail = location.state;



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

  const { profile, status, error } = useSelector((state) => state.user);
  const allUser = profile || [];
  const logInProfileData = allUser.find((userss) => userss._id === logInDetail?._id);
   const userData = userDetail ? userDetail:logInProfileData;
  

  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleMyPostsClick = () => {
    setShowMyPosts(true);
    setShowMyPhoto(false);
    setShowMyBookmark(false);
    setShowMyEditProfile(false);
  };
  const handleMyPhotoClick = () => {
    setShowMyPhoto(true);
    setShowMyPosts(false);
    setShowMyBookmark(false);
    setShowMyEditProfile(false);
  };
  const handleMyBookmarkClick = () => {
    setShowMyBookmark(true);
    setShowMyPosts(false);
    setShowMyPhoto(false);
    setShowMyEditProfile(false);
  };
  const handleMyEditProfileClick = () => {
    setShowMyEditProfile(true);
    setShowMyPosts(false);
    setShowMyPhoto(false);
    setShowMyBookmark(false);
  };

  return (
    <>
      <div className="container-fluid">
        {userData && (
          <div className="card">
            {userData?.coverImage?.length > 0 ? (
              <img src={userData?.coverImage[userData?.coverImage?.length - 1].imageURL} className="card-img-top img-fluid" alt="..." style={{ maxHeight: "100px", objectFit: "cover" }} />
            ) : null}
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
                  {userData?.image?.length > 0 ? (
                    <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid " alt="..." />
                  ) : (
                    <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                  )}
                </div>
                <div className="text-center">
                  <h6 className="card-title">{userData.name}</h6>
                </div>
              </div>
              <div className="container">
                <div>
                  <ul className="nav nav-underline ">
                    <li className="nav-item col">
                      <i className="bi bi-briefcase-fill text-warning-emphasis"></i>
                      <p className="d-inline">{userData.profession}</p>
                    </li>

                    <li className="nav-item col">
                      <i className="bi bi-geo-alt-fill text-primary-emphasis"></i>
                      {userData.country}
                    </li>

                    <li className="nav-item col">
                      <Link className="nav-link " state={userData} style={{ textDecoration: "none" }} onClick={handleMyPostsClick}>
                        <i className="bi bi-sticky-fill text-success"></i> My Posts
                      </Link>
                    </li>
                    <li className="nav-item col">
                      <Link className="nav-link" onClick={handleMyPhotoClick} state={userData} style={{ textDecoration: "none" }}>
                        <i className="bi bi-image-fill text-success"></i> Photos
                      </Link>
                    </li>

                    <li className="nav-item col">
                    {logInProfileData?._id===userData?._id ? (
                      <Link className="nav-link" onClick={handleMyBookmarkClick} state={userData} style={{ textDecoration: "none" }}>
                        <i className="bi bi-bookmark-fill text-danger-emphasis"></i> Bookmark
                      </Link>
                       ) : null}
                    </li>

                    <li className="nav-item col">
                      {logInProfileData?._id===userData?._id ? (
                        <Link onClick={handleMyEditProfileClick} className="nav-link">
                          <i className="bi bi-pencil-fill"></i> Edit Profile
                        </Link>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {status == "loading" && (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}

        <div className=" my-4">
          <div className="row">
            <div className="col-md-3">
              <UserProfileLeft userDetail={userData} />
            </div>
            <div className="col-md-6">
              {showMyPosts && <UserProfile userDetails={userData} />}
              {showMyPhoto && <Photos userDetails={userData} />}
              {showMyBookmark && <Bookmark userDetails={userData}  />}
              {showEditProfile && <EditProfile userDetails={userData} />}
            </div>
            <div className="col-md-3">
              <UserProfileRight userDetails={userData} allUser={allUser}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
