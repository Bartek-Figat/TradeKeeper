import { Navigate, useLocation, Outlet } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signOut } from "../slice/authSlice"; // Ensure you have a signOut action

const validateTokenWithBackend = async (token: string) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/validate-token",
      { token }
    );
    return response.data.isValid;
  } catch (error) {
    console.error("Token validation failed:", error);
    return false;
  }
};

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
  </div>
);

const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        const isValid = await validateTokenWithBackend(token);
        if (!isValid) {
          console.log("isValid", isValid);
          dispatch(signOut());
        }
      } else {
        dispatch(signOut());
      }
      setLoading(false);
    };

    verifyAuth();
  }, [dispatch, token]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log("User is not authenticated, redirecting to sign-in...");
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
