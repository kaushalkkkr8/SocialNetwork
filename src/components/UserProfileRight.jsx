import { useEffect,  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollow, deleteFollow, fetchUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import { handleSuccess } from "../utilities/utils";
import { ToastContainer } from "react-toastify";

const UserProfileRight = ({ userDetails }) => {
  const dispatch = useDispatch();
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const { profile } = useSelector((state) => state.user);
  const allUser = profile || [];
  const logInProfileData = allUser.find((userss) => userss._id === userDetails?._id);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const followings = allUser?.filter((user) => logInProfileData?.following?.some((follow) => follow.user === user._id));
  const followers = allUser?.filter((user) => logInProfileData?.follower?.some((follow) => follow.user === user._id));

  const followingHandeler = (profileId) => {
    const profileForFollowing = allUser?.find((user) => user._id === profileId);

    const targetUserId = profileForFollowing?._id;

    const isFollowing = logInProfileData?.following?.some((f) => f.user === profileId);

    if (isFollowing) {
      dispatch(deleteFollow({ id: logInProfileData?._id, targetUserId }));
        handleSuccess("Unfollow Successfully")
    } else {
      dispatch(addFollow({ id: logInProfileData?._id, targetUserId }));
      handleSuccess("Following Successfully")
    }
  };
  return (
    <>
      <div className="sticky-top">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center ">Followings ({followings?.length})</h5>

            {followings?.map((userDetail) => {
              const isFollowing = logInProfileData?.following?.some((user) => user.user === userDetail?._id);
              const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
              return (
                <div className="d-flex mb-3" key={userDetail._id}>
                  <div className=" me-2 ">
                    <Link to="/userProfile" state={userDetail}>
                      {userDetail?.image?.length > 0 ? (
                        <img src={userDetail?.image[userDetail?.image?.length - 1].imageURL} className="img-fluid"  style={{width:"50px",height:"50px"}}  alt="..." />
                      ) : (
                        <img src={userDetail?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid"  style={{width:"50px",height:"50px"}}  alt="..." />
                      )}
                    </Link>
                  </div>
                  <div className="overflow-hidden">
                    <p className="h6 mb-0">{userDetail.name}</p>
                    <Link to="/profile" state={userDetail} className="mb-0 small text-truncate">
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
            <h5 className="card-title text-center ">Followers ({followers?.length})</h5>

            {followers?.map((userDetail) => {
              const isFollowing = logInProfileData?.following?.some((user) => user.user === userDetail?._id);
              const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
              return (
                <div className="d-flex mb-3" key={userDetail._id}>
                  <div className=" me-2 " >
                    <Link to="/profile" state={userDetail}>
                      {userDetail?.image?.length > 0 ? (
                        <img src={userDetail?.image[userDetail?.image?.length - 1].imageURL} className="img-fluid"  style={{width:"50px",height:"50px"}}  alt="..." />
                      ) : (
                        <img src={userDetail?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid"  style={{width:"50px",height:"50px"}}  alt="..." />
                      )}
                    </Link>
                  </div>
                  <div className="overflow-hidden">
                    <p className="h6 mb-0">{userDetail.name}</p>
                    <Link to="/profile" state={userDetail} className="mb-0 small text-truncate">
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
        <ToastContainer/>
      </div>
    </>
  );
};
export default UserProfileRight;
