import { Route } from "react-router-dom";
import { AdminLayout } from "../modules/admin/AdminLayout";
import ProtectedRoute from "./ProtectedRoutes";
import { USER_ROLES } from "../shared/constants";
 
export const adminRoutes = [
  <Route
    path="/admin/*"
    element={
      <ProtectedRoute role={USER_ROLES.ADMIN}>
        <AdminLayout />
      </ProtectedRoute>
    }
    key="admin"
  />,
];