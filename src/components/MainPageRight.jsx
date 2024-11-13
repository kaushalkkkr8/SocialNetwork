import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFollow, deleteFollow } from "../features/userSlice";
import { useState } from "react";

const MainPageRight = ({userDetails,allUser,onSeeMore }) => {
  const dispatch = useDispatch();

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };


  const otherUser = allUser?.filter((userss) => userss._id !== userDetails?._id);
  const displayedUsers = otherUser?.slice(0, 4)


  const followingHandeler = (profileId) => {


    const profileForFollowing = allUser?.find((user) => user._id === profileId);

    const targetUserId = profileForFollowing?._id;

    const isFollowing = userDetails?.following?.some((f) => f.user === profileId);


    if (isFollowing) {
      dispatch(deleteFollow({ id: userDetails?._id, targetUserId }));
    } else {
      dispatch(addFollow({ id: userDetails?._id, targetUserId }));
    }
  };


  return (

      <div className="card sticky-top">
        <div className="card-body">
          <h5 className="card-title">Who to follow</h5>
          {displayedUsers?.map((userDetail) => {
            const isFollowing = userDetails?.following?.some((user) => user.user === userDetail?._id);
            const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
            return (
              <div className="d-flex mb-3" key={userDetail?._id}>
                <div className=" me-2 " >
                  <Link to="/profile" state={userDetail}>
                    {userDetail?.image?.length > 0 ? (
                      <img src={userDetail?.image[userDetail?.image?.length - 1].imageURL} className="img-fluid"  style={{width:"50px",height:"50px"}} alt="profilePic" />
                    ) : (
                      <img src={userDetail?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" style={{width:"50px",height:"50px"}}  alt="..." />
                    )}
                  </Link>
                </div>
                <div className="overflow-hidden">
                  <p className="h6 mb-0">{userDetail?.name}</p>
                  <Link to="/profile" state={userDetail} className="mb-0 small text-truncate">
                    {userDetail?.userName}
                  </Link>
                </div>
                <div className="ms-auto">
                  <i className={folloButtonClass} style={{ cursor: "pointer" }} onClick={() => followingHandeler(userDetail?._id)}></i>
                </div>
              </div>
            );
          })}
            {otherUser?.length > 4 && (
          <div className="text-center mt-3">
            {/* <Link to="/mainPage"  className="text-decoration-none"> */}
            <Link to="#" onClick={(e) => { e.preventDefault(); onSeeMore(); }} className="text-decoration-none">
              See More
            </Link>
          </div>
        )}
        </div>
      </div>
  );
};

export default MainPageRight;
