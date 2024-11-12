import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../utilities/utils";
import Navbar from "../../components/Navbar";
import { fetchUser } from "../../features/userSlice";
import Posts from "../Posts";
import Left from "./Left";
import Right from "./Right";

const Delete = () => {
  const dispatch = useDispatch();

  const [logInDetail, setLogInDetail] = useState("");

  const avtars = {
    male: "https://i.pinimg.com/736x/2a/86/6f/2a866f7847e6f50c86a1ab8e406f5520.jpg",
    female: "https://gallico.shop/wp-content/plugins/konte-addons/assets/images/person.jpg",
  };

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

  const { profile,status } = useSelector((state) => state.user);
  const allUser = profile || [];
  const userData = allUser.find((userss) => userss._id === logInDetail?._id);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
     
      <div className="container-fluid my-2">
        <div className="row">
       
          <Left userDetails={userData} />

      
          {status == "loading" && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
          <div className="col-md-6">
            
            <Posts userDetails={userData} allUser={allUser}/>
          </div>

     
          <Right userDetails={userData} allUser={allUser}/>
        </div>
      </div>
    </>
  );
};
export default Delete;
