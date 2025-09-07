import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();
  let { logout } = useContext(AuthContext);

  useEffect(() => {
    const logoutOperation = async () => {
      await fetch("http://localhost:5000/logout");
    };
    navigate("/", { replace: true });
    logout();
    logoutOperation()
  })
};
