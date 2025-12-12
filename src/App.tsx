import React, { useEffect } from "react";
import { BrowserRouter as Router , useNavigate } from "react-router-dom";
 
import { decodeToken } from "./shared/utils/jwt"; 
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes";



const RoleListener: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token= localStorage.getItem("token"); 
    if (!token) return;
     
    const user = decodeToken(token);

    if (!user) return;

   
    if (user.role === "admin" && !window.location.pathname.startsWith("/admin")) {
      navigate("/admin", { replace: true });
    } else if (user.role === "user" && !window.location.pathname.startsWith("/app")) {
      navigate("/app", { replace: true });
    }
    
  }, [navigate]);

  return <>{children}</>; 
};



 

const App: React.FC = () => (
  <Router>
    <RoleListener>
      <ToastContainer />
      <AppRoutes />
    </RoleListener>
  </Router>
);
export default App;
