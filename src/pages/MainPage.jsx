import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlice";
import { handleError } from "../utilities/utils";
import MainPageRight from "../components/MainPageRight";
import Posts from "./Posts";
import Navbar from "../components/Navbar";
import { Link, useLocation } from "react-router-dom";
import AllUser from "./AllUser";
import EditPost from "./userProfile/EditPosts";

const MainPage = () => {
  const dispatch = useDispatch();

  const [logInDetail, setLogInDetail] = useState("");
  const [allPosts, setAllPosts] = useState(true);
  const [allProfile, setAllProfile] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const location = useLocation();

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };
  const fetchProfile = async () => {
    try {
      const url = "https://major-project2-backend.vercel.app/profile";
      const headers = {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();

      if (result.success) {
        setLogInDetail(result.profile);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const { profile, status } = useSelector((state) => state.user);
  const allUser = profile || [];
  const userData = allUser.find((userss) => userss._id === logInDetail?._id);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (location.state) {
      setEditPost(true);
      setAllPosts(false);
      setAllProfile(false);
    }
  }, [location.state]);

  const homePagePostHandler = (e) => {
    e.preventDefault();
    setAllPosts(true);
    setAllProfile(false);
  };

  const homePageProfileHandler = (e) => {
    e.preventDefault();
    setAllPosts(false);
    setAllProfile(true);
  };
  const onSeeMore = () => {
    setAllProfile(true);
    setAllPosts(false);
  };
  return (
    <>
      <Navbar />

      <div className="container-fluid my-2">
        <div className="row">
          <div className="col-md-3">
            <div className="card sticky-top">
              {userData?.coverImage?.length > 0 ? (
                <img src={userData?.coverImage[userData?.coverImage?.length - 1].imageURL} className="card-img-top img-fluid" alt="..." style={{ height: "40px", objectFit: "cover" }} />
              ) : null}
              <div className="d-flex justify-content-center ">
                <div className="mt-3" style={{ maxWidth: "90px" }}>
                  {userData?.image?.length > 0 ? (
                    <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid" alt="..." />
                  ) : (
                    <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                  )}
                </div>
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{userData?.name}</h5>
{/*                 <Link to="/userProfile" className="card-text" style={{ textDecoration: "none" }}>
                  {userData?.userName}
                </Link> */}
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
                      <Link onClick={homePagePostHandler}>
                        <i className="bi bi-house-fill"></i>
                        <p>Home</p>
                      </Link>
                    </div>

                    <div className="col-md-6 ">
                      <Link to="/profile">
                        <i className=" bi bi-person-lines-fill"></i>
                        <p>Profile</p>
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link onClick={homePageProfileHandler}>
                        <i className="bi bi-person-fill"></i>
                        <p>People</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            {allPosts && <Posts userDetails={userData} allUser={allUser} />}
            {allProfile && <AllUser userDetails={userData} allUser={allUser} />}
            {editPost && <EditPost userDetails={location.state.userDetails} post={location.state.post} />}
            
          </div>

          <div className="col-md-3">
        
            <MainPageRight userDetails={userData} allUser={allUser} onSeeMore={onSeeMore} />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
