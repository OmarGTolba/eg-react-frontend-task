import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";

export const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes}
      {userRoutes}
      {adminRoutes}

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
};
