import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "../modules/user/Home";
import ProtectedRoute from "./ProtectedRoutes";
 
export const userRoutes = [
  <Route
    path="/app/*"
    element={
      <ProtectedRoute role="user">
        <HomePage />
      </ProtectedRoute>
    }
    key="user-home"
  />,
];
