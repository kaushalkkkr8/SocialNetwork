import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, deleteComment, deletePost, fetchPosts, postComment, removeLikes } from "../../features/postSlice";
import { Link } from "react-router-dom";
import { addBookMark, fetchUser, removeBookMark } from "../../features/userSlice";

const UserProfile = ({ userDetails }) => {
  const [comments, setComments] = useState({});
  const dispatch = useDispatch();

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

 
  const { profile } = useSelector((state) => state.user);
  const allUser = profile || [];
  const logInProfileData = allUser.find((userss) => userss._id === userDetails?._id);
 
  
  const { posts } = useSelector((state) => state.post);
  const data1 = posts || [];
  const myPosts = data1?.filter((post) => post?.user === logInProfileData?._id);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const postComentHandler = (postId) => {
    const commentText = comments[postId] || "";
    if (commentText.trim()) {
      const newComment = {
        user: userDetails._id,
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
    const userId = logInProfileData?._id;
    const isBookmarked = logInProfileData?.bookmarked?.some((bookmark) => bookmark.post === postId);


    if (isBookmarked) {
      dispatch(removeBookMark({ id: postId, dataToRemove: { userId } }));
    } else {
      dispatch(addBookMark({ id: postId, dataToadd: { userId } }));
    }
  };

  const likeButton = (id) => {
    const likedBy = userDetails?._id;
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
      <div className="container-fluid"></div>

      {Array.isArray(myPosts) &&
        myPosts?.map((post) => {
          const userOfPostData = allUser?.find((users) => post?.user === users?._id);
         const isBookmarked = logInProfileData?.bookmarked?.some((user) => user.post === post._id);
            const bookmarkClick = isBookmarked ? "bi bi-bookmark-fill ms-auto" : "bi bi-bookmark ms-auto";
          const isLiked = post?.likes?.some((user) => user.user === userDetails?._id);

          const likedClick = isLiked ? "bi bi-hand-thumbs-up-fill text-primary" : "bi bi-hand-thumbs-up text-primary";
          return (
            <section key={post._id}>
              <div className="card  mb-4 p-4">
                <div className="container">
                  <div className="d-flex mb-3">
                    <div className=" me-2 " >
                      {userOfPostData?.image?.length > 0 ? (
                        <img src={userOfPostData?.image[userOfPostData?.image?.length - 1].imageURL} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
                      ) : (
                        <img src={userOfPostData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
                      )}
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
                    {userDetails?._id === post?.user && (
                      <div className="ms-auto">
                        <i
                          className="btn btn-outline-danger bi bi-trash-fill "
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          data-bs-title="Delete Post"
                          style={{ cursor: "pointer" }}
                          onClick={() => deletePostHandler(post?._id)}
                        ></i>
                        <Link to="/editPosts" state={{ post, userDetails }}>
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
                      <div className=" me-2 " >
                        {userDetails?.image?.length > 0 ? (
                          <img src={userDetails?.image[userDetails?.image?.length - 1].imageURL} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
                        ) : (
                          <img src={userDetails?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
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
                      const userOfComent = userDetails;

                      return (
                        <div className="d-flex  mb-3 " key={comnt._id}>
                          <div className=" me-2 " >
                            {userOfComent?.image?.length > 0 ? (
                              <img src={userOfComent?.image[userOfComent?.image?.length - 1].imageURL} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
                            ) : (
                              <img src={userOfComent?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid rounded-circle" style={{width:"50px",height:"50px"}}  alt="..." />
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
                                {comnt?.user === userDetails?._id && (
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
    </>
  );
};
export default UserProfile;
