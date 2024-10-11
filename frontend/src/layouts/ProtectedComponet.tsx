import React from 'react';
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; 
const ProtectedRoute: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;