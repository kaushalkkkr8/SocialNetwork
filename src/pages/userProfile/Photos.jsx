

import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { fetchPosts } from "../../features/postSlice";


const Photos = ({ userDetails }) => {
    const dispatch=useDispatch()
    const { posts } = useSelector((state) => state.post);
    const data1 = posts || [];
    const myPosts = data1?.filter((post) => post?.user === userDetails?._id);

  const userPic = userDetails?.image?.length > 0 ? [userDetails.image.map((img) => img.imageURL)] : [];

  const photos = [...(userPic ? userPic : []), ...myPosts.map((post) => post.postImage.map((image) => image.imageURL)).flat()];

  useEffect(() => {
    if (!data1.length) {
      dispatch(fetchPosts());
    }
  }, [data1?.length]);
  return (
    <>
      <section>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">Photos</h5>
            <div className="container">
              <div className="row px-4 py-2">
                {photos.length>0?
                photos?.map((pic,index) => (
                  <div className="col-md-4 px-1 mb-2" key={index}>
                    <img src={pic} className="card-img img-fluid " alt="" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1 / 1" }} />
                  </div>
                )):(
                  <div className="card">
                    <div className="card-body text-center">
                    <h5>You haven't posted anything yet.</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Photos;

