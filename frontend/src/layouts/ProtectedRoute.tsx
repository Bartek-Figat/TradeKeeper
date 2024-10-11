import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const location = useLocation();

  if (!localStorage.getItem("token")) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
