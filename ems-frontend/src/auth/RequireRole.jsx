import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RequireRole = ({ allowedRole }) => {
  const { roles } = useAuth();

  return roles.includes(allowedRole)
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
};

export default RequireRole;