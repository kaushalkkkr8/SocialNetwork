import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser } from "../features/userSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserProfileLeft = ({ userDetail }) => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = userDetail ? userDetail : data.find((user) => user.logIn === true);

  useEffect(() => {
    // Fetch user data only if it hasn't been fetched yet or if userData is not available
    if (!data) {
      dispatch(fetchLogInUser());
    }
  }, [dispatch, data]);

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
