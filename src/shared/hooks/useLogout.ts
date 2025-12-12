import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHooks";
import { logoutUser } from "../../store/authSlice";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => navigate("/login"));
  };

  return { handleLogout };
};
