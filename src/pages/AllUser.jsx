import { useDispatch } from "react-redux";
import { addFollow, deleteFollow } from "../features/userSlice";
import { useState } from "react";

const AllUser = ({ allUser, userDetails }) => {
  const dispatch = useDispatch();
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };


  const otherUser = allUser?.filter((userss) => userss._id !== userDetails?._id);


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
    <div className="row">
      {otherUser?.map((userDetail) =>  {
         const isFollowing = userDetails?.following?.some((user) => user.user === userDetail?._id);
         const folloButtonClass = isFollowing ? "btn btn-primary" : "btn btn-outline-primary";
         const followButtonText = isFollowing ? "Unfollow" : "Follow";

        return(
        <div className="col-md-6" key={userDetail._id}>
          <div className="card my-2" >
            {userDetail?.image?.length > 0 ? (
              <img src={userDetail.image[userDetail.image.length - 1].imageURL} className="card-img-top img-fluid" alt="profilePic" style={{maxHeight:"273px"}} />
            ) : (
              <img src={userDetail.sex === "Male" ? avtars.male : avtars.female} className="card-img-top" alt="defaultAvatar" style={{maxHeight:"273px"}}/>
            )}
            <div className="card-body text-center">
              <h5 className="card-title">{userDetail.name}</h5>
              <p className="card-text">{userDetail.userName}</p>
            </div>
            <button className={folloButtonClass} onClick={() => followingHandeler(userDetail?._id)}>{followButtonText}</button>
           
          </div>
        </div>
      )}
      )}
    </div>
  );
};
export default AllUser;
