import { useEffect, useState } from "react";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useDispatch, useSelector } from "react-redux";
import { addBookMark, addLikes, deleteComment, deletePost, fetchPosts, postComment, removeBookMark, removeLikes } from "../../features/postSlice";
import { useLocation } from "react-router-dom";
import { fetchLogInUser } from "../../features/userSlice";
// import { fetchLogInUser } from "../../features/userSlice";

const UserProfile = () => {
  const [comment, setComments] = useState("");
  const dispatch = useDispatch();
  const location= useLocation()

  

  const { user } = useSelector((state) => state);
  const comentData = user?.profile || [];
  const userData = location.state?location.state:comentData.find((user) => user.logIn === true);

  const { post } = useSelector((state) => state);
  const data = post?.posts ;
  const myPosts = data?.filter((post) =>  post?.userName === userData?.userName);



  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };



  

  const postComentHandler = (postId) => {
    const comments = {
      commentName: userData.name,
      commentUserName: userData.userName,
      commentUserImage: userData.image,
      comment: comment,
    };


    dispatch(postComment({ postId, newData: comments }));
    setComments("");
  };


  const deletePostCommentHandler = (commentId) => {
    dispatch(deleteComment({commentId}));
  };

  const bookmarkButton = (id) => {
    const bookmarkedBy = userData?.userName;
    const postTobeBookmarked = data?.find((post) => post._id === id);
    const isBookmarked = postTobeBookmarked?.bookmarked?.includes(bookmarkedBy);

    if (isBookmarked) {
      dispatch(removeBookMark({ id, dataToRemove: { bookmarked: bookmarkedBy } }));
    } else {
      dispatch(addBookMark({ id, dataToadd: { bookmarked: bookmarkedBy } }));
    }
  };

  
  const likeButton = (id) => {
    const likedBy = userData?.userName;
    const postTobeLiked = data?.find((post) => post._id === id);
    const isLiked = postTobeLiked?.likes?.includes(likedBy);

    if (isLiked) {
      dispatch(removeLikes({ id, dataToRemove: { liked: likedBy } }));
    } else {
      dispatch(addLikes({ id, dataToAdd: { liked: likedBy } }));
    }
  };


  useEffect(() => {
    if (!data.length) {
      dispatch(fetchPosts());
    }
    if(!userData)
    dispatch(fetchLogInUser());
  }, [dispatch, data,userData]);

  return (
    <>
      <div className="container-fluid">
        <UserProfileTop userDetail={userData}/>

        <div className=" my-4">
          <div className="row">
            <div className="col-md-3">
              <UserProfileLeft userDetail={userData}/>
            </div>
            {/*======================================== POSTS =========================================  */}

            <div className="col-md-6">
              {myPosts?.map((post) => {
                
                const isBookmarked = post?.bookmarked?.includes(userData?.userName);
                const bookmarkClick = isBookmarked ? "bi bi-bookmark-fill ms-auto" : "bi bi-bookmark ms-auto";
                const isLiked = post?.likes?.includes(userData?.userName);
                console.log("isliked",isLiked);
                
                const likedClick = isLiked ? "bi bi-hand-thumbs-up-fill text-primary" : "bi bi-hand-thumbs-up text-primary";
              return(

                <section>
                  <div className="card  mb-4 p-4">
                    <div className="container">
                      <div className="d-flex mb-3">
                        <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                          <img className=" rounded-circle" src={post.userImage} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>

                        <div>
                          <div className=" d-flex">
                            <h6 className=" card-title mb-0">
                              <span role="button">{post.nameOfUser}</span>
                            </h6>
                          </div>
                          <p className="mb-0 small">{post.userName}</p>
                        </div>
                        <div className="ms-auto">
                          <i className="btn btn-outline-danger bi bi-trash-fill " style={{cursor:"pointer"}} onClick={() => deletePostHandler(post._id)}></i>
                          </div>
                      </div>
                      <div className="card-body">
                        <p>{post.posts}.</p>
                        {post.postImage && <img className="card-img m-2" src={post.postImage} alt="Post" />}

                        <br />
                        <ul className="d-flex" style={{ paddingInlineStart: "0" }}>
                            <i className={likedClick} onClick={()=>likeButton(post._id)}></i> <li className=" d-inline list-group-item mx-2 ">Like</li>
                            <i className=" bi bi-chat-fill text-secondary ms-3"></i> <li className=" d-inline list-group-item mx-2 ">Comments</li>
                            <i className={bookmarkClick} style={{ cursor: "parser" }} onClick={() => bookmarkButton(post._id)}></i>
                          </ul>

                        {/* ============================== POST COMMENTS ========================================== */}

                        <div className="d-flex  mb-3">
                          <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                            <img className=" rounded-circle" src={post.userImage} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          <form className="w-100 d-flex">
                            <textarea
                              className="form-control  py-2 my-1 bg-light"
                              rows="1"
                              placeholder="Add a comment..."
                              style={{ resize: "none" }}
                              value={comment}
                              onChange={(e) => setComments(e.target.value)}
                            ></textarea>
                            <i
                              className="bi bi-pencil-square h4  text-body-secondary"
                              onClick={() => postComentHandler(post._id)}
                              style={{ position: "relative", right: "2rem", top: "0.5rem", cursor: "pointer" }}
                            ></i>
                          </form>
                        </div>
                        {post?.comments.map((comnt) => (
                          <div className="d-flex  mb-3 ">
                            <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                              <img className=" rounded-circle" src={comnt.commentUserImage} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <div className="w-100 ">
                              <div className="bg-light rounded-start-top-0 p-3 rounded">
                                <div className="d-flex justify-content-between">
                                  <h6 className="mb-1">
                                    <a href="/"> {comnt.commentName} </a>
                                  </h6>
                                  {/* <small className="ms-2">5 hours ago</small> */}
                                </div>
                                <div className="d-flex">
                                  <p className="small mb-0">{comnt.comment}</p>
                                  { comnt.commentUserName===userData?.userName && (
                                    <div className="ms-auto">
                                      <i className="bi bi-trash-fill btn btn-outline-danger" onClick={() => deletePostCommentHandler(comnt._id)}></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )})}
            </div>
            <div className="col-md-3 ">
              <UserProfileRight userDetail={userData}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfile;
