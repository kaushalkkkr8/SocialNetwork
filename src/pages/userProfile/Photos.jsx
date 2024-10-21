import { useDispatch, useSelector } from "react-redux";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchLogInUser } from "../../features/userSlice";
import { fetchPosts } from "../../features/postSlice";

const Photos = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const data = user?.profile;
  const userData = location.state ? location.state : data.find((user) => user.logIn === true);

  const { post } = useSelector((state) => state);
  const postData = post?.posts;
  const myPosts = postData?.filter((post) => post?.userName === userData?.userName);

  const userPic = [userData?.image];
  
  const photos = [
    ...userPic,
    ...myPosts
      .map((post) => post.postImage)
      .filter((img) => img),
  ];

  console.log("photos", photos);
  useEffect(() => {
    
    if (!data) {
      dispatch(fetchLogInUser());
    }
    if (!data.length) {
      dispatch(fetchPosts());
    }
  }, [data, data.length]);
  return (
    <>
      <div className="container-fluid">
        <UserProfileTop userDetail={userData} />
        <div className=" my-4">
          <div className="row">
            <div className="col-md-3">
              <UserProfileLeft userDetail={userData} />
            </div>
            <div className="col-md-6">
              <section>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-center">Photos</h5>
                    <div className="container">
                      <div className="row px-4 py-2">
                        {photos?.map((pic) => (
                          <div className="col-md-4 px-1">
                            <img src={pic} className="card-img img-fluid" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-md-3 ">
              <UserProfileRight userDetail={userData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Photos;
