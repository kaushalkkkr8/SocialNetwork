import { useDispatch, useSelector } from "react-redux";
import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";
import { useEffect, useState } from "react";
import { addBookMark, deleteComment, fetchPosts, postComment, removeBookMark } from "../../features/postSlice";
import { fetchLogInUser } from "../../features/userSlice";
import { useLocation } from "react-router-dom";

const Bookmark = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [comment, setComments] = useState("");
  const [avtar, setAvtar] = useState("");


  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

  const { user } = useSelector((state) => state);
  const data = user?.profile || [];
  const userData = location.state ? location.state : data.find((user) => user.logIn === true);

  const { post } = useSelector((state) => state);
  const data1 = post?.posts || [];
  const myBookmark = data1.filter((post) => post.bookmarked.includes(userData?.userName));



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
    const bookmarkedBy = userData.userName;
    const postTobeBookmarked = data1?.find((post) => post._id === id);
    const isBookmarked = postTobeBookmarked?.bookmarked?.includes(bookmarkedBy);

    if (isBookmarked) {
      dispatch(removeBookMark({ id, dataToRemove: { bookmarked: bookmarkedBy } }));
    } else {
      dispatch(addBookMark({ id, dataToadd: { bookmarked: bookmarkedBy } }));
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
  }, [data, data1.length, userData?.sex]);

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
              {myBookmark?.map((data, index) => {
                const isBookmarked = data?.bookmarked?.includes(userData?.userName);
                const bookmarkClick = isBookmarked ? "bi bi-bookmark-fill ms-auto" : "bi bi-bookmark ms-auto";
                return (
                  <section key={data._id || index}>
                    <div className="card mb-3  p-4">
                      <div className="container">
                        <div className="d-flex mb-3">
                          <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                            <img className=" rounded-circle" src={data.userImage ? data.userImage : avtar} alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          </div>
                          {/*======================================== POSTS =========================================  */}
                          <div>
                            <div className=" d-flex">
                              <h6 className=" card-title mb-0">
                                <span role="button">{data.nameOfUser}</span>
                              </h6>
                            </div>
                            <p className="mb-0 small">{data.userName}</p>
                          </div>
                        </div>
                        <div className="card-body">
                          <p>{data.posts}.</p>
                          {data.postImage && <img className="card-img m-2" src={data.postImage} alt="Post" />}

                          <br />
                          <ul className="d-flex" style={{ paddingInlineStart: "0" }}>
                            <i className="bi bi-hand-thumbs-up-fill text-primary"></i> <li className=" d-inline list-group-item mx-2 ">Like</li>
                            <i className=" bi bi-chat-fill text-secondary ms-3"></i> <li className=" d-inline list-group-item mx-2 ">Comments</li>
                            <i className={bookmarkClick} style={{ cursor: "parser" }} onClick={() => bookmarkButton(data._id)}></i>
                          </ul>

                          {/* ============================== POST COMMENTS ========================================== */}
                          <div className="d-flex  mb-3">
                            <div className=" me-2 " style={{ width: "50px", height: "50px", position: "relative", display: "inline-block" }}>
                              <img className=" rounded-circle" src={userData?.image ? userData?.image : avtar}  alt="avatar3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
                                onClick={() => postComentHandler(data._id)}
                                style={{ position: "relative", right: "2rem", top: "0.5rem", cursor: "pointer" }}
                              ></i>
                            </form>
                          </div>
                          {data?.comments.map((comnt) => (
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
                );
              })}
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
export default Bookmark;
