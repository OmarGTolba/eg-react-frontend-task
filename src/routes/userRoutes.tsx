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

    <Route index element={<HomePage />} />

    <Route path="home" element={<HomePage />} />

    <Route path="profile" element={<ProfilePage />} />

  </Route>,
];
