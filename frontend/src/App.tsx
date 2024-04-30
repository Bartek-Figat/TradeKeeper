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

export const App = () => {
  const element = useRoutes([
    { path: "/", element: <HomePage /> },
    {
      element: <AuthLayout />,
      children: [
        { path: "/login", element: <h1>Login Page</h1> },
        { path: "/register", element: <h1>Register Page</h1> },
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
