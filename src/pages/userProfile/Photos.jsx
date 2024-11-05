import { useDispatch, useSelector } from "react-redux";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { fetchUser } from "../../features/userSlice";
import { fetchPosts } from "../../features/postSlice";
import { handleError } from "../../utilities/utils";
import { useState } from "react";

const Photos = () => {

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

  const { profile } = useSelector((state) => state.user);
  const allUser = profile || [];
  const userData = allUser.find((userss) => userss._id === logInDetail?._id);


  useEffect(() => {
    fetchProfile();
  }, []);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { post } = useSelector((state) => state);
  const postData = post?.posts;
  const myPosts = postData?.filter((post) => post?.user === userData?._id);

  const userPic = userData?.image.length>0 ? [userData.image.map(img=>img.imageURL)] : [];

  const photos = [  ...(userPic?userPic:[]) , ...myPosts.map(post => post.postImage.map(image => image.imageURL)).flat()];

  console.log("photos", photos);
  useEffect(() => {
    
    if (!postData.length) {
      dispatch(fetchPosts());
    }
  }, [postData.length]);
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
                          <div className="col-md-4 px-1 mb-2" >
                            <img src={pic} className="card-img img-fluid " alt="" style={{ width: "100%", height: "100%", objectFit: "cover" ,aspectRatio: "1 / 1"}} />
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
