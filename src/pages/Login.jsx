import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogInUser, logInStatus } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [logInValue, setlogInValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state);
  const dataUser = user?.profile;

  

  
  useEffect(() => {
    dispatch(fetchLogInUser());
  }, [dispatch]);

  const logInClickHandler = (e) => {
    e.preventDefault();
    const userProfile = dataUser?.find((userProfilee) => userProfilee.email === emailLogin);
  
    
    const passwordMatch = userProfile?.password === passwordLogin;
   
    const loginStatus =  !passwordMatch ? "email or password is incorrect" : "Successfully login";
    setlogInValue(loginStatus);

    if (userProfile && passwordMatch) {
      const logIn = { logIn: true };
      dispatch(logInStatus({ id: userProfile._id, updateprofile: logIn }));
      navigate("/mainPage");
    }
  };

  return (
    <>
      <div className="d-flex  justify-content-center ">
        <div className="card border-none  w-100">
          <div className="row g-0">
            <div className="col-md-6">
              <div className="h-100 d-flex  flex-column align-items-center justify-content-center">
                <div className="text-center">
                  <h3>Welcome</h3>
                  <p>
                    Welcome to Brand! 🎉
                    <br /> Connect, share, and explore with a community built just for you!
                  </p>
                </div>
                <form>
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-person-square h2 text-secondary" style={{ top: "-1px", left: "3px" }}></i>
                    <input type="text" className="form-control text-center px-5" placeholder="Email or userName" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} />
                  </div>

                  <br />
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-shield-lock-fill h2 text-secondary " style={{ top: "-1px", left: "3px" }}></i>
                    <input type="password" className="form-control px-5 text-center " placeholder="Password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
                  </div>
                  <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/">
                    Forgot Password?
                  </a>

                  <br />
                  <br />
                  <div className="text-center">
                    <button className="btn btn-primary w-100" onClick={logInClickHandler}>
                      Log In
                    </button>
                    <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-bold " href="/signUp">
                      Sign Up
                    </a>
                  </div>
                </form>
                <p>{logInValue}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div style={{ maxHeight: "700px" }}>
                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="2000">
                      <img src="https://holatelcel.com/wp-content/uploads/2016/05/mujer-ok.jpg" className="card-img  d-block img-fluid" style={{ maxHeight: "700px" }} alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img
                        src="https://img.buzzfeed.com/buzzfeed-static/static/2019-09/29/3/asset/e04537f29483/sub-buzz-5428-1569727492-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
                        className="card-img d-block img-fluid"
                        style={{ maxHeight: "700px" }}
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img src="https://sj-company.ru/new_images/po/po-1c-cloud-8.jpg" className="d-block card-img  img-fluid" style={{ maxHeight: "700px" }} alt="..." />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
