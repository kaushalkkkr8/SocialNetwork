import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser } from "../features/userSlice";
import { Link } from "react-router-dom";

const UserProfileTop = ({ userDetail }) => {
  const dispatch = useDispatch();

  const { user, status, error } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = userDetail ? userDetail : data.find((user) => user.logIn === true);

  useEffect(() => {
    // Fetch user data only if it hasn't been fetched yet or if userData is not available
    if (!userData) {
      dispatch(fetchLogInUser());
    }
  }, [dispatch, userData]);

  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {userData? (
        <div className="card">
          <img src={userData.coverImage} className="card-img-top img-fluid" alt="Cover" style={{ maxHeight: "200px", objectFit: "cover" }} />
          <div className="card-body">
            <div className="text-center mb-3">
              <div
                className="me-2"
                style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <img className="rounded-circle" src={userData.image} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                  <Link to="/userProfile/photos" state={userData} style={{textDecoration:"none"}}>
                    <i className="bi bi-image-fill text-success"></i> Photos
                  </Link>
                </div>
                <div className="col">
                  <Link to="/userProfile/videos" state={userData} style={{textDecoration:"none"}}>
                    <i className="bi bi-camera-reels-fill text-primary" ></i> Video
                  </Link>
                </div>
                <div className="col">
                  <Link to="/userProfile/bookmark" state={userData} style={{textDecoration:"none"}}>
                    <i className="bi bi-bookmark-fill text-danger-emphasis" ></i> Bookmark
                  </Link>
                </div>
                <div className="col">
                  {data?.find((user) => user.logIn === true)&&data?.find((user) => user.logIn === true)._id===userDetail?._id &&(
                    <Link to="/userProfile/editProfile" className="btn btn-primary">
                      <i className="bi bi-pencil-fill"></i> Edit Profile
                    </Link>
                  )}
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
