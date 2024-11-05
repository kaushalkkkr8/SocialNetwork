import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../../features/userSlice";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utilities/utils";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  //new auth
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    userName: "",
    sex: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, userName, sex, password } = signupInfo;
    if (!name || !email || !password || !userName || !sex) {
      return handleError("name, email,userName,gender and password are required");
    }
    try {
      const url = `https://major-project2-backend.vercel.app/auth/signUp`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/logIn");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
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
                  <h3>Sign Up</h3>
                  <p>
                    Your journey starts here—sign up now!
                    <br /> Join our community and discover endless possibilities
                  </p>
                </div>
                <form onSubmit={handleSignup}>
                  <input type="text" name="name" className="form-control text-center px-5" placeholder="Name" value={signupInfo.name} onChange={handleChange} />
                  <br />

                  <div className="input-group mb-3">
                    {/* <span className="input-group-text" id="basic-addon1">
                      @
                    </span> */}
                    <input type="text" name="userName" className="form-control text-center px-5" placeholder="UserName: @kaushalkr8" value={signupInfo.userName} onChange={handleChange} />
                  </div>

                  <select className="form-select text-center" name="sex" value={signupInfo.sex} onChange={handleChange}>
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <br />
                  <input type="email" name="email" className="form-control text-center px-5" placeholder="Email" value={signupInfo.email} onChange={handleChange} />
                  <br />
                  <input
                    type="password"
                    className="form-control px-5 text-center "
                    placeholder="Password"
                    value={signupInfo.password}
                    name="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                  />

                  <br />
                  <div className="text-center">
                    <button className="btn btn-primary w-100" type="submit">
                      {" "}
                      Sign Up
                    </button>
                    <a className="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover fw-bold " href="/logIn">
                      Log In
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
                      <img src="https://holatelcel.com/wp-content/uploads/2016/05/mujer-ok.jpg" className=" card-img  img-fluid" style={{ maxHeight: "700px" }} alt="..." />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img
                        src="https://img.buzzfeed.com/buzzfeed-static/static/2019-09/29/3/asset/e04537f29483/sub-buzz-5428-1569727492-1.jpg?downsize=700%3A%2A&output-quality=auto&output-format=auto"
                        className="card-img  img-fluid"
                        style={{ maxHeight: "700px" }}
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                      <img src="https://sj-company.ru/new_images/po/po-1c-cloud-8.jpg" className="  card-img  img-fluid" style={{ maxHeight: "700px" }} alt="..." />
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
export default SignUp;
