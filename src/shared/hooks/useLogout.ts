import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./reduxHooks";
import { logoutUser } from "../../store/authSlice";
import { ROUTES } from "../constants";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate(ROUTES.SIGNIN))
      .catch(() => navigate(ROUTES.SIGNIN));
  };

  return { handleLogout };
};