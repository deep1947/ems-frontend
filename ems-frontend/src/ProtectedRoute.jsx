import { Navigate } from "react-router-dom";
import { isAuthenticated, hasRole } from "../services/authService";

const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  if (role && !hasRole(role)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
