import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

    // if authenticated then allow the protected component else redirect to the login page
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
