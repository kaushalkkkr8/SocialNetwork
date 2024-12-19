
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utilities/utils";
import { ToastContainer } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = (e) => {
    localStorage.removeItem("token");

    handleSuccess("User Logged out");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <nav className="navbar  container-fluid navbar-expand-lg bg-body-tertiary">
      <div className="container ">
        <a className="navbar-brand" href="/">
   LOGO
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav ms-auto">
            <li className="nav-item">
              <button className=" btn btn-primary " aria-current="page" href="#" onClick={handleLogout}>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};
export default Navbar;
