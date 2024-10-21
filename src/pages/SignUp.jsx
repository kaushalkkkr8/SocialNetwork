import { useState } from "react";
import { useDispatch } from "react-redux";
import { postUser } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const signUpHandler=(e)=>{
  //   e.preventDefault()
  //   const dataSignUp={name,userName,sex,email,password}
  //   dispatch(postUser(dataSignUp))

  //   alert("Successfully Signed Up",navigate('/logIn'))
  //   setName('')
  //   setUserName('')
  //   setSex('')
  //   setEmail('')
  //   setPassword('')
  // }
  const signUpHandler = async (e) => {
    e.preventDefault();
    const dataSignUp = { name, userName, sex, email, password };
    try {
      await dispatch(postUser(dataSignUp)).unwrap();
      alert("Successfully Signed Up");
      navigate("/logIn");
      setName("");
      setUserName("");
      setSex("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (error.response && error.response.data.error) {
        alert(error.response.data.error); // Display error message (e.g., "Username already exists")
      } else {
        alert("Email or Username is used by other user");
      }
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
                <form>
                  <input type="text" className="form-control text-center px-5" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  <br />
                  {/* <input type="file" className="form-control" id="inputGroupFile01" />
                  <br /> */}

                  <div className="input-group mb-3">
                    {/* <span className="input-group-text" id="basic-addon1">
                      @
                    </span> */}
                    <input type="text" className="form-control text-center px-5" placeholder="UserName: @kaushalkr8" value={userName} onChange={(e) => setUserName(e.target.value)} />
                  </div>

                  <select className="form-select text-center" value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="" disabled>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <br />
                  <input type="email" className="form-control text-center px-5" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <br />
                  <input
                    type="password"
                    className="form-control px-5 text-center "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  <br />
                  <div className="text-center">
                    <button className="btn btn-primary w-100" onClick={signUpHandler}>
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
    </>
  );
};
export default SignUp;
