import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../components/providers/UserContext";

const Logout = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  }, [logout, navigate]);

  return null;
};

export default Logout;
