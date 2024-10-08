import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom";
import DasboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Lightweigh from "./components/chart/Lightweigh";
import CreateTrade from "./components/CreateTrade";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicRoute from "./layouts/PublicRoute"; // Import the PublicRoute component

export const App = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-in",
          element: (
            <PublicRoute>
              <SignInPage />
            </PublicRoute>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <PublicRoute>
              <SignUpPage />
            </PublicRoute>
          ),
        },
        {
          path: "/reset-password",
          element: (
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          ),
        },
      ],
    },
    // Protect the dashboard routes
    {
      path: `/dashboard`,
      element: (
        <ProtectedRoute>
          <DasboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "project", element: <ProjectPage /> },
        { path: "analytics", element: <AnalyticsPage /> },
        { path: "lightweigh", element: <Lightweigh /> },
        { path: "create-trade", element: <CreateTrade /> },
      ],
    },
  ]);
  return element;
};