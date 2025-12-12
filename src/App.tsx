import React, { useEffect } from "react";
import { BrowserRouter as Router , useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { decodeToken } from "./shared/utils/jwt"; 
import { storage } from "./shared/utils/storage";
import { ROUTES, USER_ROLES } from "./shared/constants";
import { AppRoutes } from "./routes";

const RoleListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = storage.getToken(); 
    if (!token) return;
     
    const user = decodeToken(token);

    if (!user) return;

    const currentPath = globalThis.location.pathname;
   
    if (user.role === USER_ROLES.ADMIN && !currentPath.startsWith(ROUTES.ADMIN_HOME)) {
      navigate(ROUTES.ADMIN_HOME, { replace: true });
    } else if (user.role === USER_ROLES.USER && !currentPath.startsWith(ROUTES.USER_HOME)) {
      navigate(ROUTES.USER_HOME, { replace: true });
    }
    
  }, [navigate]);

  return <>{children}</>; 
};

const App: React.FC = () => (
  <Router>
    <RoleListener>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </RoleListener>
  </Router>
);

export default App;