import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";
import { ROUTES } from "../shared/constants";

export const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes}
      {userRoutes}
      {adminRoutes}

      <Route path="*" element={<Navigate to={ROUTES.SIGNIN} replace />} />
    </Routes>
  );
};