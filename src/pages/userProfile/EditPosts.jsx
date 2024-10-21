import { useEffect, useState } from "react";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../features/postSlice";

const EditPosts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [avtar, setAvtar] = useState("");
  const [editPosts, setEditPost] = useState("");

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const userData = location?.state?.userData;

  const editPostdata = location?.state?.post;

  const postClick = (e) => {
    e.preventDefault();
    const id = editPostdata._id;
   const newData= {posts:editPosts}

    dispatch(editPost( {id, newData} ));

    navigate("/mainPage")
  };

  useEffect(() => {
    if (editPostdata) {
      setEditPost(editPostdata.posts);
    }

    if (userData?.sex) {
      const avatar = userData.sex === "Male" ? avtars.male : avtars.female;
      setAvtar(avatar);
    }
  }, [dispatch, editPostdata, userData?.sex]);

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
              {userData && (
                <section>
                  <div className="card  p-4">
                    <div className="container">
                      <div className="d-flex mb-3">
                        <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                          <img className=" rounded-circle" src={userData.image ? userData.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <form className="w-100">
                          <textarea
                            className="form-control pe-4 border-0"
                            rows="2"
                            placeholder="Share your thoughts..."
                            style={{ resize: "none" }}
                            value={editPosts}
                            onChange={(e) => setEditPost(e.target.value)}
                          ></textarea>

                          <ul className="" style={{ paddingInlineStart: "0" }}>
                            <li className=" d-inline list-group-item  ">
                              {" "}
                              <i className="bi bi-image-fill text-success"></i> Photo
                            </li>
                            <li className=" d-inline list-group-item ">
                              {" "}
                              <i className="bi bi-camera-reels-fill  text-primary"></i> Video
                            </li>
                            <br />
                            <div className="input-group mb-3 w-50">
                              <input type="file" className="form-control " id="inputGroupFile02" />
                            </div>
                          </ul>
                          <button className="btn btn-primary ms-auto" onClick={postClick}>
                            Post
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </section>
              )}
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
export default EditPosts;
