import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollower, addFollowing, deleteFollower, deleteFollowing, fetchLogInUser } from "../features/userSlice";

const UserProfileRight = ({ userDetail }) => {
  const dispatch = useDispatch();
  const [avtar, setAvtar] = useState("");

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const { user } = useSelector((state) => state);
  const data = user?.profile;
  const userData = !userDetail ? userDetail : data.find((user) => user.logIn === true);
  const followingUser = userData?.following.map((user) => user.userName);

  const followings = data?.filter((user) => followingUser?.includes(user.userName));

  const followingHandeler = (profileId) => {
    const profileForFollowing = data?.find((user) => user._id === profileId);



    const followings = {
      name: profileForFollowing.name,
      userName: profileForFollowing.userName,
      userImage: profileForFollowing.image,
    };
    const followers = {
      name: userData.name,
      userName: userData.userName,
      userImage: userData.image,
    };

    const isFollowing = userData?.following?.some((user) => user.userName === profileForFollowing.userName);

    if (isFollowing) {
      const followerDelete = profileForFollowing.follower.find((user) => user.userName === userData.userName);

      const followingDelete = userData.following.find((user) => user.userName === profileForFollowing.userName);

      dispatch(deleteFollower(followerDelete._id));
      dispatch(deleteFollowing(followingDelete._id));
    } else {
      dispatch(addFollowing({ id: userData._id, updateFollowing: followings }));
      dispatch(addFollower({ id: profileId, updateFollower: followers }));
    }
  };

  useEffect(() => {
    // Fetch user data only if it hasn't been fetched yet or if userData is not available
    
    if (!data || !user) {
      dispatch(fetchLogInUser());
    }

    if (userData?.sex) {
      const avatar = userData.sex === "Male" ? avtars.male : avtars.female;
      setAvtar(avatar);
    }
  }, [dispatch, data, data, userData?.sex]);
  return (
    <>
      <div className="sticky-top">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center ">Followings</h5>

            {followings?.map((user, index) => {
              const isFollowing = userData?.following?.some((userProfile) => userProfile.userName === user.userName);
              const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
              return (
                <div className="d-flex my-3" key={user._id || index}>
                  <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                    <img className=" rounded-circle" src={user.image ? user.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="h6 mb-0">{user.name}</p>
                    <p className="h6 mb-0">{user.userName}</p>
                  </div>
                  <div className="ms-auto">
                    <i className={folloButtonClass} style={{ cursor: "pointer" }} onClick={() => followingHandeler(user._id)}></i>
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
