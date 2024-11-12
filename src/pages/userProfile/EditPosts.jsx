import { useEffect, useState } from "react";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { editPost } from "../../features/postSlice";

const EditPosts = ({ userDetails, post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [editPosts, setEditPost] = useState("");

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const userData = userDetails;

  const editPostdata = post;

  const postClick = (e) => {
    e.preventDefault();
    const id = editPostdata._id;
    const newData = { posts: editPosts };

    dispatch(editPost({ id, newData }));

    navigate("/mainPage");
  };

  // const handleFileChange = (e) => {
  //   setSelectedFiles(e.target.files);
  // };
  // const postClick = () => {
  //   if (editPosts.trim() || selectedFiles.length > 0) {
  //     const formData = new FormData();
  //     formData.append("posts", editPostdata);

  //     Array.from(selectedFiles).forEach((file) => {
  //       formData.append("image", file);
  //     });
  //     const id = editPostdata._id;
  //     dispatch(editPost({ id,newData: formData }));
  //     navigate("/mainPage")
  //     setEditPost("");
  //     setSelectedFiles([]);
  //   }
  // };

  useEffect(() => {
    if (editPostdata) {
      setEditPost(editPostdata.posts);
    }
  }, [editPostdata]);

  return (
    <>
      {userData && (
        <section>
          <div className="card  p-4">
            <div className="container">
              <div className="d-flex mb-3">
                <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                  {userData?.image?.length > 0 ? (
                    <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid rounded" alt="..." />
                  ) : (
                    <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded" alt="..." />
                  )}
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
                {/* <div className="w-100">
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
                            <input type="file" className="form-control" id="inputGroupFile02" onChange={handleFileChange} multiple />
                          </div>
                        </ul>
                        <button className="btn btn-primary ms-auto" onClick={postClick}>
                          Post
                        </button>
                      </div> */}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default EditPosts;

// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { editPost } from "../../features/postSlice";

// const EditPost = ({userDetails,post}) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [editPosts, setEditPost] = useState("");

//   const avtars = {
//     male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
//     female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
//   };

//   const userData = userDetails
//   const editPostData = post

//   const postClick = (e) => {
//     e.preventDefault();
//     const id = editPostData._id;
//     const newData = { posts: editPosts };

//     dispatch(editPost({ id, newData }));

//     navigate("/mainPage");
//   };

//   // Handling file selection

//   // Handling text change
//   const postTextChange = (e) => {
//     setEditPost(e.target.value);
//   };

//   useEffect(() => {
//     if (editPostData) {
//       setEditPost(editPostData.posts);
//     }
//   }, [editPostData]);

//   return (
//     <>

//             {userData && (
//               <section>
//                 <div className="card p-4">
//                   <div className="container">
//                     <div className="d-flex mb-3">
//                       <div
//                         className="me-2"
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           position: "relative",
//                           display: "inline-block",
//                         }}
//                       >
//                         {userData?.image?.length > 0 ? (
//                           <img
//                             src={userData?.image[userData?.image?.length - 1].imageURL}
//                             className="img-fluid rounded"
//                             alt="User Avatar"
//                           />
//                         ) : (
//                           <img
//                             src={userData?.sex === "Male" ? avtars.male : avtars.female}
//                             className="img-fluid rounded"
//                             alt="Default Avatar"
//                           />
//                         )}
//                       </div>
//                       <form className="w-100">
//                         <textarea
//                           className="form-control pe-4 border-0"
//                           rows="2"
//                           placeholder="Share your thoughts..."
//                           style={{ resize: "none" }}
//                           value={editPosts}
//                           onChange={postTextChange}
//                         ></textarea>
//                       </form>
//                     </div>
//                     <div className="d-flex">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleFileChange}
//                       />
//                     </div>
//                     <button className="btn btn-primary mt-3" onClick={postClick}>
//                       Save
//                     </button>
//                   </div>
//                 </div>
//               </section>
//             )}

//     </>
//   );
// };

// export default EditPost;
