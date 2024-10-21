import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBookMark, addLikes, deleteComment, deletePost, fetchPosts, postComment, postPost, removeBookMark, removeLikes } from "../features/postSlice";
import { addFollower, addFollowing, deleteFollower, deleteFollowing, fetchLogInUser } from "../features/userSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainPage = () => {
  const dispatch = useDispatch();
  const [postValue, setPostValue] = useState("");
  const [comments, setComments] = useState({});
  const [avtar, setAvtar] = useState("");
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  //post
  const { post } = useSelector((state) => state);
  const data1 = post?.posts || [];

  console.log("data1", data1);

  // user
  const { user } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = data.find((user) => user.logIn === true);

  const otherUser = data.filter((userss) => userss.userName !== userData?.userName);

  const postClick = (e) => {
    
    if (postValue.length > 0) {
      const posts = {
        posts: postValue,
        postImage: "",
        userName: userData.userName,
        userImage: userData.image,
        nameOfUser: userData.name,
      };
      console.log(posts);
      
      dispatch(postPost({ newData: posts }));
      setPostValue("");
    }
  };

  const deletePostHandler = (id) => {
    dispatch(deletePost(id));
  };

  const postComentHandler = (postId) => {
    const commentText = comments[postId] || "";
    if (commentText.trim()) {
      const newComment = {
        commentName: userData.name,
        commentUserName: userData.userName,
        commentUserImage: userData.image,
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

  const bookmarkButton = (id) => {
    const bookmarkedBy = userData?.userName;
    const postTobeBookmarked = data1?.find((post) => post._id === id);
    const isBookmarked = postTobeBookmarked?.bookmarked?.includes(bookmarkedBy);

    if (isBookmarked) {
      dispatch(removeBookMark({ id, dataToRemove: { bookmarked: bookmarkedBy } }));
    } else {
      dispatch(addBookMark({ id, dataToadd: { bookmarked: bookmarkedBy } }));
    }
  };

  const likeButton = (id) => {
    const likedBy = userData?.userName;
    const postTobeLiked = data1?.find((post) => post._id === id);
    const isLiked = postTobeLiked?.likes?.includes(likedBy);

    if (isLiked) {
      dispatch(removeLikes({ id, dataToRemove: { liked: likedBy } }));
    } else {
      dispatch(addLikes({ id, dataToAdd: { liked: likedBy } }));
    }
  };

  useEffect(() => {
    if (!data || !user) {
      dispatch(fetchLogInUser());
    }

    if (!data1.length) {
      dispatch(fetchPosts());
    }

    if (userData?.sex) {
      const avatar = userData.sex === "Male" ? avtars.male : avtars.female;
      setAvtar(avatar);
    }
  }, [data, user, data1.length, userData?.sex]);

  return (
    <>
      <Navbar />
      <div className="container-fluid my-2">
        <div className="row">
          {/*================================================================= Left bar =================*/}
          <div className="col-md-3">
            {userData ? (
              <div className="card sticky-top">
                {userData.coverImage && <img src={userData.coverImage} className="card-img-top img-fluid" alt="..." style={{ maxHeight: "40px", objectFit: "cover" }} />}
                <div className="d-flex justify-content-center ">
                  <div className="mt-3" style={{ width: "90px", height: "90px" }}>
                    <img src={userData.image ? userData.image : avtar} className="img-fluid" alt="..." />
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{userData.name}</h5>
                  <p className="card-text">{userData.userName}</p>
                  <p className="card-text">{userData.profession}</p>

                  <div className="d-flex">
                    <div className="col-md-4 ">
                      <b>212</b>
                      <p className="fs-6">Posts</p>
                    </div>
                    <div className="col-md-4 ">
                      <b>2.5K</b>
                      <p className="fs-6">Followers</p>
                    </div>
                    <div className="col-md-4">
                      <b>200</b>
                      <p> Following</p>
                    </div>
                  </div>
                  <hr />

                  <div className="my-2 text-center">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <Link to="/mainPage">
                          <i className="bi bi-house-fill"></i>
                          <p>Home</p>
                        </Link>
                      </div>
                      <div className="col-md-6">
                        <Link to="/userProfile/bookmark">
                          <i className="bi bi-bookmark-fill"></i>
                          <p>Bookmark</p>
                        </Link>
                      </div>
                      <div className="col-md-6 ">
                        <Link to="/userProfile" state={userData}>
                          <i className=" bi bi-person-lines-fill"></i>
                          <p>Profile</p>
                        </Link>
                      </div>
                      <div className="col-md-6">
                        <i className="bi bi-person-fill"></i>
                        <p>People</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Please Login"
            )}
          </div>

          {/*=============================================center bar =====================================*/}
          <div className="col-md-6">
            {userData && (
              <section>
                <div className="card  p-4">
                  <div className="container">
                    <div className="d-flex mb-3">
                      <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                        <img className=" rounded-circle" src={userData.image ? userData.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                            <input type="file" className="form-control " id="inputGroupFile02" />
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
              data1.map((post, index) => {
                const isBookmarked = post?.bookmarked?.includes(userData?.userName);
                const bookmarkClick = isBookmarked ? "bi bi-bookmark-fill ms-auto" : "bi bi-bookmark ms-auto";
                const isLiked = post?.likes?.includes(userData?.userName);
                console.log("isliked", isLiked);

                const likedClick = isLiked ? "bi bi-hand-thumbs-up-fill text-primary" : "bi bi-hand-thumbs-up text-primary";
                return (
                  <section key={post._id || index}>
                    <div className="card my-4  p-4">
                      <div className="container">
                        <div className="d-flex mb-3">
                          <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                            <Link to="/userProfile" state={post}>
                              <img className=" rounded-circle" src={post.userImage} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Link>
                          </div>
                          {/*======================================== POSTS =========================================  */}
                          <div>
                            <div className=" d-flex">
                              <h6 className=" card-title mb-0">
                                <span role="button">{post.nameOfUser}</span>
                              </h6>
                            </div>
                            <p className="mb-0 small">{post.userName}</p>
                          </div>
                          {userData && userData.userName === post?.userName && (
                            <div className="ms-auto">
                              <i
                                className="btn btn-outline-danger bi bi-trash-fill "
                                data-bs-toggle="tooltip"
                                data-bs-placement="bottom"
                                data-bs-title="Delete Post"
                                style={{ cursor: "pointer" }}
                                onClick={() => deletePostHandler(post._id)}
                              ></i>
                              <Link to="/userProfile/editPosts" state={{ post, userData }}>
                                <i className=" ms-3 btn btn-outline-success  bi bi-pencil-fill" style={{ cursor: "pointer" }}></i>
                              </Link>
                            </div>
                          )}
                        </div>
                        <div className="card-body">
                          <p>{post.posts}.</p>
                          {post.postImage && <img className="card-img m-2" src={post.postImage} alt="Post" />}

                          <br />
                          <ul className="d-flex" style={{ paddingInlineStart: "0" }}>
                            <i className={likedClick} onClick={() => likeButton(post._id)} style={{ cursor: "pointer" }}></i><li className=" d-inline list-group-item mx-2 ">Like</li>
                            <i className=" bi bi-chat-fill text-secondary ms-3"></i> <li className=" d-inline list-group-item mx-2 ">Comments</li>
                            <i className={bookmarkClick} style={{ cursor: "parser" }} onClick={() => bookmarkButton(post._id)}></i>
                          </ul>

                          {/* ============================== POST COMMENTS ========================================== */}
                          <div className="d-flex  mb-3">
                            <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                              <img className=" rounded-circle" src={userData?.image ? userData?.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </div>
                            <form className="w-100 d-flex">
                              <textarea
                                className="form-control  py-2 my-1 bg-light"
                                rows="1"
                                placeholder="Add a comment..."
                                style={{ resize: "none" }}
                                value={comments[post._id] || ""}
                                onChange={(e) => handleCommentChange(post._id, e.target.value)}
                              ></textarea>
                              <i
                                className="bi bi-pencil-square h4  text-body-secondary"
                                onClick={() => postComentHandler(post._id)}
                                style={{ position: "relative", right: "2rem", top: "0.5rem", cursor: "pointer" }}
                              ></i>
                            </form>
                          </div>
                          {post?.comments?.map((comnt) => (
                            <div className="d-flex  mb-3 ">
                              <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                                <img className=" rounded-circle" src={comnt?.commentUserImage} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                              </div>
                              <div className="w-100 ">
                                <div className="bg-light rounded-start-top-0 p-3 rounded">
                                  <div className="d-flex justify-content-between">
                                    <h6 className="mb-1">
                                      <a href="/"> {comnt.commentName} </a>
                                    </h6>
                                  </div>
                                  <div className="d-flex">
                                    <p className="small mb-0">{comnt.comment}</p>
                                    {comnt.commentUserName === userData?.userName && (
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
                );
              })}
          </div>

          {/*=============================================right bar =====================================*/}
          <div className="col-md-3">
            <div className="card sticky-top">
              <div className="card-body">
                <h5 className="card-title">Who to follow</h5>
                {otherUser?.map((userDetail) => {
                  const isFollowing = userData?.following?.some((user) => user.userName === userDetail.userName);

                  const folloButtonClass = isFollowing ? "bi bi-plus-circle-fill text-primary h3" : "bi bi-plus-circle text-primary h3";
                  return (
                    <div className="d-flex mb-3">
                      <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                        <Link to="/userProfile" state={userDetail}>
                          <img className=" rounded-circle" src={userDetail.image ? userDetail.image : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </Link>
                      </div>
                      <div className="overflow-hidden">
                        <p className="h6 mb-0">{userDetail.name}</p>
                        {/* <p className="mb-0 small text-truncate">{userDetail.userName}</p> */}
                        <Link to="/userProfile" state={userDetail} className="mb-0 small text-truncate">
                          {userDetail.userName}
                        </Link>
                      </div>
                      <div className="ms-auto">
                        <i className={folloButtonClass} style={{ cursor: "pointer" }} onClick={() => followingHandeler(userDetail._id)}></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
