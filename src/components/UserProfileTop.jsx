// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../features/userSlice";
// import { Link } from "react-router-dom";
// import { handleError } from "../utilities/utils";

// const UserProfileTop = ({ userDetail }) => {
//   const dispatch = useDispatch();
//   const [logInDetail, setLogInDetail] = useState("");
//   const avtars = {
//     male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
//     female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found. Please log in.");
//         return;
//       }

//       const response = await fetch("https://major-project2-backend.vercel.app/profile", {
//         headers: {
//           Authorization: `${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch profile data.");
//       }

//       const result = await response.json();

//       if (result.success) {
//         setLogInDetail(result.profile);
//       }
//     } catch (err) {
//       handleError(err);
//     }
//   };

//   const { profile } = useSelector((state) => state.user);
//   const allUser = profile || [];
//   const logInProfileData = allUser.find((userss) => userss._id === logInDetail?._id);
//   const userData = userDetail ? userDetail : logInProfileData;

//   useEffect(() => {
//     fetchProfile();
//   }, []);
//   useEffect(() => {
//     dispatch(fetchUser());
//     console.log("apple");
//   }, [dispatch]);

//   return (
//     <>

//       {userData && (
//         <div className="card">
//           {userData?.coverImage?.length > 0 ? (
//             <img src={userData?.coverImage[userData?.coverImage?.length - 1].imageURL} className="card-img-top img-fluid" alt="..." style={{ maxHeight: "100px", objectFit: "cover" }} />
//           ) : null}
//           <div className="card-body">
//             <div className="text-center mb-3">
//               <div
//                 className="me-2"
//                 style={{
//                   maxWidth: "100px",
//                   position: "relative",
//                   display: "inline-block",
//                 }}
//               >
//                 {userData?.image?.length > 0 ? (
//                   <img src={userData?.image[userData?.image?.length - 1].imageURL} className="img-fluid " alt="..." />
//                 ) : (
//                   <img src={userData?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
//                 )}
//               </div>
//               <div className="text-center">
//                 <h6 className="card-title">{userData.name}</h6>
//               </div>
//             </div>
//             <div className="container">
//               {/* <div className="row">
//                 <div className="col">
//                   <i className="bi bi-briefcase-fill text-warning-emphasis"></i>
//                   <p className="d-inline">{userData.profession}</p>
//                 </div>
//                 <div className="col">
//                   <p>
//                     <i className="bi bi-geo-alt-fill text-primary-emphasis"></i>
//                     {userData.country}
//                   </p>
//                 </div>
//                 <div className="col">
//                   <Link to="/userProfile/photos" state={userData} style={{ textDecoration: "none" }}>
//                     <i className="bi bi-image-fill text-success"></i> Photos
//                   </Link>
//                 </div>
//                 <div className="col">
//                   <Link to="/userProfile/videos" state={userData} style={{ textDecoration: "none" }}>
//                     <i className="bi bi-camera-reels-fill text-primary"></i> Video
//                   </Link>
//                 </div>
//                 <div className="col">
//                   <Link to="/userProfile/bookmark" state={userData} style={{ textDecoration: "none" }}>
//                     <i className="bi bi-bookmark-fill text-danger-emphasis"></i> Bookmark
//                   </Link>
//                 </div>
//                 <div className="col">
//                   {logInProfileData === userData ? (
//                     <Link to="/userProfile/editProfile" className="btn btn-primary">
//                       <i className="bi bi-pencil-fill"></i> Edit Profile
//                     </Link>
//                   ) : null}
//                 </div>
//               </div> */}
//               <div>
//               <ul class="nav nav-underline ">

//               <li class="nav-item col">
//               <i className="bi bi-briefcase-fill text-warning-emphasis"></i>
//               <p className="d-inline">{userData.profession}</p>
//               </li>

//               <li class="nav-item col">
//               <i className="bi bi-geo-alt-fill text-primary-emphasis"></i>
//               {userData.country}
//               </li>

//               <li class="nav-item col">
//               <Link className="nav-link" to="/userProfile/photos" state={userData} style={{ textDecoration: "none" }}>
//                     <i className="bi bi-image-fill text-success"></i> Photos
//                   </Link>
//               </li>

//               <li class="nav-item col">
//               <Link className="nav-link" to="/userProfile/bookmark" state={userData} style={{ textDecoration: "none" }}>
//                     <i className="bi bi-bookmark-fill text-danger-emphasis"></i> Bookmark
//                   </Link>
//               </li>

//               <li class="nav-item col">
//               {logInProfileData === userData ? (
//                     <Link  to="/userProfile/editProfile" className="nav-link">
//                       <i className="bi bi-pencil-fill"></i> Edit Profile
//                     </Link>
//                   ) : null}
//               </li>

//             </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) }
//     </>
//   );
// };

// export default UserProfileTop;

import { Link, useLocation } from "react-router-dom";

const UserProfileTop = ({ userDetails }) => {
  const location = useLocation();
  const userDetail = location.state;
  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };



  return (
    <>
      {userDetails && (
        <div className="card">
          {userDetails?.coverImage?.length > 0 ? (
            <img src={userDetails?.coverImage[userDetails?.coverImage?.length - 1].imageURL} className="card-img-top img-fluid" alt="..." style={{ maxHeight: "100px", objectFit: "cover" }} />
          ) : null}
          <div className="card-body">
            <div className="text-center mb-3">
              <div
                className="me-2"
                style={{
                  maxWidth: "100px",
                  position: "relative",
                  display: "inline-block",
                }}
              >
                {userDetails?.image?.length > 0 ? (
                  <img src={userDetails?.image[userDetails?.image?.length - 1].imageURL} className="img-fluid " alt="..." />
                ) : (
                  <img src={userDetails?.sex === "Male" ? avtars.male : avtars.female} className="img-fluid" alt="..." />
                )}
              </div>
              <div className="text-center">
                <h6 className="card-title">{userDetails.name}</h6>
              </div>
            </div>
            <div className="container">
             
              <div>
                <ul class="nav nav-underline ">
                  <li class="nav-item col">
                    <i className="bi bi-briefcase-fill text-warning-emphasis"></i>
                    <p className="d-inline">{userDetails.profession}</p>
                  </li>

                  <li class="nav-item col">
                    <i className="bi bi-geo-alt-fill text-primary-emphasis"></i>
                    {userDetails.country}
                  </li>

                  <li class="nav-item col">
                    <Link className="nav-link" to="/userProfile/photos" state={userDetails} style={{ textDecoration: "none" }}>
                      <i className="bi bi-image-fill text-success"></i> Photos
                    </Link>
                  </li>

                  <li class="nav-item col">
                    <Link className="nav-link" to="/userProfile/bookmark" state={userDetails} style={{ textDecoration: "none" }}>
                      <i className="bi bi-bookmark-fill text-danger-emphasis"></i> Bookmark
                    </Link>
                  </li>

                  <li class="nav-item col">
                    {userDetails && (
                      <Link to="/userProfile/editProfile" className="nav-link">
                        <i className="bi bi-pencil-fill"></i> Edit Profile
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileTop;
