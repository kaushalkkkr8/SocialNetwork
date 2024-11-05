import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../features/userSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleError } from "../utilities/utils";

const UserProfileLeft = ({ userDetail }) => {
  const dispatch = useDispatch();
  const [logInDetail, setLogInDetail] = useState("");
 

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

console.log("apple1");


useEffect(() => {
  console.log("Fetching user data");
  dispatch(fetchUser());
}, [logInDetail]);



useEffect(() => {
  fetchProfile();
  }, []);
  


  return (
    <>
          {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="card sticky-top">
        <div className="card-body ">
          <h5 className="card-title text-center">About</h5>
          {userData ? (
            <div>
              <p>{userData.bio}</p>

              <p className="text-secondary">
                {" "}
                <b>
                  <i className=" btn btn-warning bi bi-at text-white"></i> UserName: {userData.userName}
                </b>
              </p>

              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-calendar-date-fill btn btn-success"></i> DOB: {userData.dob}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-hearts btn btn-danger"></i> Status: {userData.maritialStatus}{" "}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-envelope-at-fill btn btn-primary"></i> Email: {userData.email}
                </b>
              </p>
              <p className="text-secondary">
                <b>
                  <i
                    className="bi bi-phone-fill btn btn-info text-white
                  
                  "
                  ></i>{" "}
                  Phone: {userData.phoneNumber}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <span className="btn btn-light">
                    <i className="bi bi-gender-male text-primary"></i>
                    <i className="bi bi-gender-female text-danger"></i>
                  </span>
                  Sex: {userData.sex}
                </b>
              </p>
            </div>
          ) : (
            <p>No user data found!</p>
          )}
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
    </>
  );
};
export default UserProfileLeft;
