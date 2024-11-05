import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, deleteComment, deletePost, fetchPosts, postComment, postPost, removeLikes } from "../features/postSlice";
import { addBookMark, fetchUser, removeBookMark } from "../features/userSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MainPageLeft from "../components/MainPageLeft";
import MainPageRight from "../components/MainPageRight";
import { handleError } from "../utilities/utils";
// import { toast, ToastContainer } from "react-toastify";

const MainPage = () => {
  const dispatch = useDispatch();
  const [postValue, setPostValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [comments, setComments] = useState({});
  const [logInDetail, setLogInDetail] = useState("");

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  

  const { posts, status, error } = useSelector((state) => state.post);
  const data1 = posts || [];



  const fetchProfile = async () => {
    try {
      const url = "https://major-project2-backend.vercel.app/profile";
      const headers = {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      };
      const response = await fetch(url, headers);
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

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const postClick = () => {
    if (postValue.trim() || selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("posts", postValue);
      formData.append("user", userData._id);

      Array.from(selectedFiles).forEach((file) => {
        formData.append("image", file);
      });

      dispatch(postPost({ newData: formData }));

      setPostValue("");
      setSelectedFiles([]);
    }
  };

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const postComentHandler = (postId) => {
    const commentText = comments[postId] || "";
    if (commentText.trim()) {
      const newComment = {
        user: userData._id,
        comment: commentText,
      };

      dispatch(postComment({ postId, newData: newComment }));
      setComments((prev) => ({ ...prev, [postId]: "" }));
    }
  };

  const handleCommentChange = (postId, value) => {
    setComments((prev) => ({ ...prev, [postId]: value }));
  };

  const deletePostCommentHandler = (commentId) => {
    dispatch(deleteComment({ commentId }));
  };

  const bookmarkButton = (postId) => {
    const userId = userData?._id;
    const isBookmarked = userData?.bookmarked?.some((bookmark) => bookmark.post === postId);

    if (isBookmarked) {
      dispatch(removeBookMark({ id: postId, dataToRemove: { userId } }));
    } else {
      dispatch(addBookMark({ id: postId, dataToadd: { userId } }));
    }
  };

  const likeButton = (id) => {
    const likedBy = userData?._id;
    const postTobeLiked = data1?.find((post) => post._id === id);
    const isLiked = postTobeLiked?.likes?.some((liked) => liked.user === likedBy);

    if (isLiked) {
      dispatch(removeLikes({ id, dataToRemove: { liked: likedBy } }));
    } else {
      dispatch(addLikes({ id, dataToAdd: { liked: likedBy } }));
    }
  };

  useEffect(() => {
    if (!data1.length) {
      dispatch(fetchPosts());
    }
  }, [data1.length]);

  return (
    <>
      <Navbar />
      {status == "loading" && (
            <div className="d-flex justify-content-center mt-3">
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          )}
      <div className="container-fluid my-2">
        <div className="row">
          {/*================================================================= Left bar =================*/}
          <MainPageLeft />

          {/*=============================================center bar =====================================*/}
      
          <div className="col-md-6">
            {userData && (
              <section>
                <div className="card  p-4">
                  <div className="container">
                    <div className="d-flex mb-3">
                      <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                        {userData?.image?.length > 0 ? (
                          <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid rounded-circle" alt="..." />
                        ) : (
                          <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" alt="..." />
                        )}
                      </div>
                      <div className="w-100">
                        <textarea
                          className="form-control pe-4 border-0"
                          rows="2"
                          placeholder="Share your thoughts..."
                          style={{ resize: "none" }}
                          value={postValue}
                          onChange={(e) => setPostValue(e.target.value)}
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
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {Array.isArray(data1) &&
              data1.map((post) => {
                const userOfPostData = allUser?.find((users) => post?.user === users?._id);

                const isBookmarked = userData?.bookmarked?.some((user) => user.post === post._id);
                const bookmarkClick = isBookmarked ? "bi bi-bookmark-fill ms-auto" : "bi bi-bookmark ms-auto";
                const isLiked = post?.likes?.some((user) => user.user === userData?._id);

                const likedClick = isLiked ? "bi bi-hand-thumbs-up-fill text-primary" : "bi bi-hand-thumbs-up text-primary";
                return (
                  <section key={post?._id}>
                    <div className="card my-4  p-4">
                      <div className="container">
                        <div className="d-flex mb-3">
                          <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                            <Link to="/userProfile" state={post}>
                              {userOfPostData?.image?.length > 0 ? (
                                <img src={userOfPostData?.image[userOfPostData?.image?.length - 1].imageURL} className="img-fluid rounded-circle" alt="..." />
                              ) : (
                                <img src={userOfPostData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" alt="..." />
                              )}
                            </Link>
                          </div>
                          {/*======================================== POSTS =========================================  */}
                          <div>
                            <div className=" d-flex">
                              <h6 className=" card-title mb-0">
                                <span role="button">{userOfPostData?.name}</span>
                              </h6>
                            </div>
                            <p className="mb-0 small">{userOfPostData?.userName}</p>
                          </div>
                          {userData?._id === post?.user && (
                            <div className="ms-auto">
                              <i
                                className="btn btn-outline-danger bi bi-trash-fill "
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-title="Delete Post"
                                style={{ cursor: "pointer" }}
                                onClick={() => deletePostHandler(post?._id)}
                              ></i>
                              <Link to="/userProfile/editPosts" state={{ post, userData }}>
                                <i className=" ms-3 btn btn-outline-success  bi bi-pencil-fill" style={{ cursor: "pointer" }}></i>
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="card-body">
                          <p>{post?.posts}.</p>
                          {post?.postImage && post?.postImage?.map((images) => <img className="card-img m-2" src={images.imageURL} alt="Post" key={images._id}/>)}

                          <br />
                          <ul className="d-flex" style={{ paddingInlineStart: "0" }}>
                            <i className={likedClick} onClick={() => likeButton(post?._id)} style={{ cursor: "pointer" }}></i>
                            <li className=" d-inline list-group-item mx-2 ">Like</li>
                            <i className=" bi bi-chat-fill text-secondary ms-3"></i> <li className=" d-inline list-group-item mx-2 ">Comments</li>
                            <i className={bookmarkClick} style={{ cursor: "pointer" }} onClick={() => bookmarkButton(post?._id)}></i>
                          </ul>

                          {/* ============================== POST COMMENTS ========================================== */}
                          <div className="d-flex  mb-3">
                            <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                              {userData?.image?.length > 0 ? (
                                <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid rounded-circle" alt="..." />
                              ) : (
                                <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" alt="..." />
                              )}
                            </div>
                            <form className="w-100 d-flex">
                              <textarea
                                className="form-control  py-2 my-1 bg-light"
                                rows="1"
                                placeholder="Add a comment..."
                                style={{ resize: "none" }}
                                value={comments[post?._id] || ""}
                                onChange={(e) => handleCommentChange(post?._id, e.target.value)}
                              ></textarea>
                              <i
                                className="bi bi-pencil-square h4  text-body-secondary"
                                onClick={() => postComentHandler(post?._id)}
                                style={{ position: "relative", right: "2rem", top: "0.5rem", cursor: "pointer" }}
                              ></i>
                            </form>
                          </div>
                          {post?.comments?.map((comnt) => {
                            const userOfComent = allUser?.find((users) => comnt?.user === users?._id);

                            return (
                              <div className="d-flex  mb-3 "  key={comnt._id}>
                                <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }} >
                                  {userOfComent?.image?.length > 0 ? (
                                    <img src={userOfComent?.image[userOfComent?.image?.length - 1].imageURL} className="img-fluid rounded-circle" alt="..." />
                                  ) : (
                                    <img src={userOfComent?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" alt="..." />
                                  )}
                                </div>
                                <div className="w-100 ">
                                  <div className="bg-light rounded-start-top-0 p-3 rounded">
                                    <div className="d-flex justify-content-between">
                                      <h6 className="mb-1">
                                        {userOfComent?.name}
                                        <p>
                                          {" "}
                                          <a href="/"> {userOfComent?.userName} </a>
                                        </p>
                                      </h6>
                                    </div>
                                    <div className="d-flex">
                                      <p className="small mb-0">{comnt?.comment}</p>
                                      {comnt?.user === userData?._id && (
                                        <div className="ms-auto">
                                          <i className="bi bi-trash-fill btn btn-outline-danger" onClick={() => deletePostCommentHandler(comnt?._id)}></i>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              })}
          </div>

          {/*=============================================right bar =====================================*/}
          <MainPageRight />
        </div>

        {/* <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} /> */}
      </div>
    </>
  );
};
export default MainPage;
