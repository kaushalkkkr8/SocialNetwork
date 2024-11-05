import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollow, deleteFollow, fetchUser } from "../features/userSlice";
import { handleError } from "../utilities/utils";
import { Link } from "react-router-dom";
const UserProfileRight = ({ userDetail }) => {
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

  const { profile } = useSelector((state) => state.user);
  const allUser = profile || [];
  const logInProfileData = allUser.find((userss) => userss._id === logInDetail?._id);
  const userData = userDetail ? userDetail : logInProfileData;
  const followings = allUser?.filter((user) => userData?.following.some((follow) => follow.user === user._id));
  const followers = allUser?.filter((user) => userData?.follower.some((follow) => follow.user === user._id));
  const followingHandeler = (profileId) => {
    const profileForFollowing = allUser?.find((user) => user._id === profileId);

    const targetUserId = profileForFollowing?._id;

    const isFollowing = userData?.following?.some((f) => f.user === profileId);

    if (isFollowing) {
      dispatch(deleteFollow({ id: userData._id, targetUserId }));
    } else {
      dispatch(addFollow({ id: userData._id, targetUserId }));
    }
  };
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <>
      <div className="sticky-top">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center ">Followings</h5>

            {followings?.map((userDetail) => {
              const isFollowing = userData?.following?.some((user) => user.user === userDetail?._id);
              const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
              return (
                <div className="d-flex mb-3" key={userDetail._id}>
                  <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                    <Link to="/userProfile" state={userDetail}>
                      {userDetail?.image?.length > 0 ? (
                        <img src={userDetail?.image[userDetail?.image?.length - 1].imageURL} className="img-fluid" alt="..." />
                      ) : (
                        <img src={userDetail?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                      )}
                    </Link>
                  </div>
                  <div className="overflow-hidden">
                    <p className="h6 mb-0">{userDetail.name}</p>
                    <Link to="/userProfile" state={userDetail} className="mb-0 small text-truncate">
                      {userDetail.userName}
                    </Link>
                  </div>
                  <div className="ms-auto">
                    <i className={folloButtonClass} style={{ cursor: "pointer" }} onClick={() => followingHandeler(userDetail._id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card my-4">
          <div className="card-body">
            <h5 className="card-title text-center ">Followers</h5>

            {followers?.map((userDetail) => {
              const isFollowing = userData?.following?.some((user) => user.user === userDetail?._id);
              const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
              return (
                <div className="d-flex mb-3" key={userDetail._id}>
                  <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                    <Link to="/userProfile" state={userDetail}>
                      {userDetail?.image?.length > 0 ? (
                        <img src={userDetail?.image[userDetail?.image?.length - 1].imageURL} className="img-fluid" alt="..." />
                      ) : (
                        <img src={userDetail?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                      )}
                    </Link>
                  </div>
                  <div className="overflow-hidden">
                    <p className="h6 mb-0">{userDetail.name}</p>
                    <Link to="/userProfile" state={userDetail} className="mb-0 small text-truncate">
                      {userDetail.userName}
                    </Link>
                  </div>
                  <div className="ms-auto">
                    <i className={folloButtonClass} style={{ cursor: "pointer" }} onClick={() => followingHandeler(userDetail._id)}></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfileRight;
