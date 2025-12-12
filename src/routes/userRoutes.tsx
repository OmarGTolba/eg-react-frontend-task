import { Route } from "react-router-dom";
import { HomePage } from "../modules/user/Home";
import ProtectedRoute from "./ProtectedRoutes";
import { UserLayout } from "../modules/user/UserLayout";
 
export const userRoutes = [
  <Route path="/app" element={<UserLayout />}>
          <Route index element={<HomePage />} /> 
          {/* 👆 Default route under UserLayout */}
        </Route>
];
