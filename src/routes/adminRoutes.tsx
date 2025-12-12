import React from "react";
import { Route } from "react-router-dom";
import { AdminLayout } from "../modules/admin/AdminLayout";
import ProtectedRoute from "./ProtectedRoutes";
 
export const adminRoutes = [
  <Route
    path="/admin/*"
    element={
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    }
    key="admin"
  />,
];
