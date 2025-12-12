import React from "react";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../shared/utils/jwt";
import { storage } from "../shared/utils/storage";
import { ROUTES, USER_ROLES, type UserRole } from "../shared/constants";

interface Props {
  children: React.ReactNode;
  role?: UserRole;
}

const ProtectedRoute: React.FC<Props> = ({ children, role }) => {
  const token = storage.getToken();
  
  if (!token) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  const payload = decodeToken(token);

  if (!payload) {
    storage.clearAuth();
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  if (role && payload.role !== role) {
   
    const redirectPath = payload.role === USER_ROLES.ADMIN ? ROUTES.ADMIN_HOME : ROUTES.USER_HOME;
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;