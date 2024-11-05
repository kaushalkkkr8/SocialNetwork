import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsauthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsauthenticated(true);
      if (location.pathname === "/logIn" ||location.pathname === "/login" || location.pathname === "/signUp" || location.pathname === "/") {
        navigate("/mainPage", { replace: false });
      }
    }
  });

  return <></>;
};
export default RefreshHandler;
