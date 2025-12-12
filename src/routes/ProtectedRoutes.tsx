import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../shared/utils/jwt";

interface Props {
  children: React.ReactNode;
  role?: "admin" | "user";
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;

  const payload = decodeToken(token);

  if (role && payload.role !== role) {
    return <Navigate to={payload.role === "admin" ? "/admin" : "/app"} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
