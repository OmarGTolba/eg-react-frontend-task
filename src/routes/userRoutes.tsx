import { Route } from "react-router-dom";
import { HomePage } from "../modules/user/Home";

import ProtectedRoute from "./ProtectedRoutes";
import { USER_ROLES } from "../shared/constants";
import { UserLayout } from "../modules/user/UserLayout";
import { ProfilePage } from "../modules/user/ProfilePage";

export const userRoutes = [
  <Route
    path="/app"
    element={
      <ProtectedRoute role={USER_ROLES.USER}>
        <UserLayout />
      </ProtectedRoute>
    }
    key="user-layout"
  >

    {/* Default page → /app */}
    <Route index element={<HomePage />} />

    {/* Explicit home page → /app/home */}
    <Route path="home" element={<HomePage />} />

    {/* Other nested pages */}
    <Route path="profile" element={<ProfilePage />} />

  </Route>,
];
