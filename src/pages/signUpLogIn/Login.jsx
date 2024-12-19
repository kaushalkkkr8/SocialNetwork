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

      if (!response.ok) {
        const errorResponse = await response.json();
        handleError(errorResponse.message || "Email or Password is required");
        return;
      }

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
      <div className="d-flex  justify-content-center " style={{ minHeight: "100vh" }}>
        <div className=" w-100">
          <div className="row g-0">
            <div className="col-md-6 my-2 " >
              <div className="h-100 d-flex  flex-column align-items-center justify-content-center ">
                <div className="text-center">
                  <h3>Welcome</h3>
                  <p>
                    Welcome to Brand! 🎉
                    <br /> Connect, share, and explore with a community built just for you!
                  </p>
                </div>
                <form onSubmit={handleLogin}>
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-person-square h3 text-secondary" style={{ top:"-1px",left: "3px" }}></i>
                    <input type="email" className="form-control form-control-sm text-center px-5" placeholder="Enter your email... " name="email" value={logInInfo.email} onChange={handleChange} />
                  </div>

                  <br />
                  <div className="d-flex position-relative">
                    <i className="position-absolute  bi bi-shield-lock-fill h3 text-secondary " style={{ top:"-1px", left: "3px" }}></i>
                    <input type="password" name="password" className="form-control form-control-sm px-5 text-center " placeholder="Password" value={logInInfo.password} onChange={handleChange} />
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
                <img src="https://sj-company.ru/new_images/po/po-1c-cloud-8.jpg" className="img-fluid " style={{ minHeight: "447px" }} alt="..."/>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Login;
