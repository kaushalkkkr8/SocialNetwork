



import { Link } from "react-router-dom";

const UserProfileLeft = ({ userDetail }) => {

  const userData = userDetail;

  return (
    <>
      <div className="card sticky-top">
        <div className="card-body ">
          <h5 className="card-title text-center">About</h5>
          {userData && (
            <div>
              <p>{userData.bio}</p>

              <p className="text-secondary">
                {" "}
                <b>
                  <i className=" btn btn-warning bi bi-at text-white"></i> UserName: {userData.userName}
                </b>
              </p>

              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-calendar-date-fill btn btn-success"></i> DOB: {userData.dob}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-hearts btn btn-danger"></i> Status: {userData.maritialStatus}{" "}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <i className="bi bi-envelope-at-fill btn btn-primary"></i> Email: {userData.email}
                </b>
              </p>
              <p className="text-secondary">
                <b>
                  <i
                    className="bi bi-phone-fill btn btn-info text-white
                  
                  "
                  ></i>{" "}
                  Phone: {userData.phoneNumber}
                </b>
              </p>
              <p className="text-secondary">
                {" "}
                <b>
                  <span className="btn btn-light">
                    <i className="bi bi-gender-male text-primary"></i>
                    <i className="bi bi-gender-female text-danger"></i>
                  </span>
                  Sex: {userData.sex}
                </b>
              </p>
            </div>
          )}
          <hr />
          <div className="my-2 text-center">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Link to="/mainPage">
                  <i className="bi bi-house-fill"></i>
                  <p>Home</p>
                </Link>
              </div>
            
              <div className="col-md-6 ">
                <Link to="/profile">
                  <i className=" bi bi-person-lines-fill"></i>
                  <p>Profile</p>
                </Link>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserProfileLeft;

