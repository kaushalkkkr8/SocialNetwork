import UserProfileLeft from "../../components/UserProfileleLeft";
import UserProfileRight from "../../components/UserProfileRight";
import UserProfileTop from "../../components/UserProfileTop";

const Videos = () => {
    return (
      <>
        <div className="container-fluid">
         <UserProfileTop/>
          <div className=" my-4">
            <div className="row">
              <div className="col-md-3">
                <UserProfileLeft/>
              </div>
              <div className="col-md-6">
               <section>
                  <div className="card">
                      <div className="card-body">
                          <h5 className="card-title text-center">Photos</h5>
                          <div className="container">
                          <div className="row px-4 py-2">
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-4 px-1">
                        <img
                          src="https://image.shutterstock.com/image-photo/portrait-smiling-man-260nw-157245113.jpg"
                          className="card-img img-fluid"
                          alt=""
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                    </div>
  
                          </div>
                      </div>
                  </div>
               </section>
              </div>
              <div className="col-md-3 ">
              <UserProfileRight/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  export default Videos;
  