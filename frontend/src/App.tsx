import "react-toastify/dist/ReactToastify.css";
// import RequireAuth from "@auth-kit/react-router/RequireAuth";
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

export const App = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    {
      element: <AuthLayout />,
      children: [
        { path: "/sign-in", element: <SignInPage /> },
        { path: "/sign-up", element: <SignUpPage /> },
        { path: "/reset-password", element: <ResetPasswordPage /> },
      ],
    },
    // protect
    {
      path: `/dashboard`,
      element: <DasboardLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "project", element: <ProjectPage /> },
        { path: "analytics", element: <AnalyticsPage /> },
        { path: "lightweigh", element: <Lightweigh /> },
        // {
        //   path: "create-trade",
        //   element: (
        //     <RequireAuth fallbackPath="/login">
        //       <CreateTrade />
        //     </RequireAuth>
        //   ),
        // },
        {
          path: "create-trade",
          element: <CreateTrade />,
        },
      ],
    },
    //
  ]);
  return element;
};
