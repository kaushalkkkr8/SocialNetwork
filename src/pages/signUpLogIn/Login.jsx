import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utilities/utils";

const Login = () => {
  const navigate = useNavigate();

  //auth
  const [logInInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const copyLogInInfo = { ...logInInfo };
    copyLogInInfo[name] = value;
    setLogInInfo(copyLogInInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = logInInfo;
    if (!email || !password) {
      return handleError(" email and password are required");
    }
    try {
      const url = `https://major-project2-backend.vercel.app/auth/logIn`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInInfo),
      });
      const result = await response.json();
      const { success, message, token, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/mainPage");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
     
    } catch (err) {
      handleError(err);
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
                <form onSubmit={handleLogin}>
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-person-square h2 text-secondary" style={{ top: "-1px", left: "3px" }}></i>
                    <input type="email" className="form-control text-center px-5" placeholder="Enter your email... " name="email" value={logInInfo.email} onChange={handleChange} />
                  </div>

                  <br />
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-shield-lock-fill h2 text-secondary " style={{ top: "-1px", left: "3px" }}></i>
                    <input type="password" name="password" className="form-control px-5 text-center " placeholder="Password" value={logInInfo.password} onChange={handleChange} />
                  </div>
                  <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/">
                    Forgot Password?
                  </a>

                  <br />
                  <br />
                  <div className="text-center">
                    <button className="btn btn-primary w-100" type="submit">
                      Log In
                    </button>
                    <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-bold " href="/signUp">
                      Sign Up
                    </a>
                  </div>
                </form>
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
      <ToastContainer />
    </>
  );
};
export default Login;
