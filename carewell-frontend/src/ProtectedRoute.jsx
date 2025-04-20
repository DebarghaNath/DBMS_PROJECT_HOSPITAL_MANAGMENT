import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const location = useLocation(); // Get the current location
  const role = location.pathname.split("/")[1]; // Extract the role from the URL (e.g., 'admin', 'fdo', etc.)
  const authToken = localStorage.getItem(`${role}$token`); // Get the token based on the role
  console.log(`${role}$token`);

  if (!authToken) {
    return <Navigate to="/staff-login" replace />;
  }

  try {
    const decoded = jwtDecode(authToken);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < currentTime) {
      localStorage.removeItem(`${role}$token`); // Remove the expired token
      localStorage.removeItem(`${role}$name`);
      localStorage.removeItem(`${role}$email`);
      localStorage.removeItem(`${role}$role`);
      localStorage.removeItem(`${role}$userid`);
      localStorage.removeItem(`${role}$mobile`);
      localStorage.removeItem(`${role}$imageurl`);
      return <Navigate to="/staff-login" replace />;
    }
  } catch (err) {
    return <Navigate to="/staff-login" replace />;
  }

  return children;
};

export default ProtectedRoute;