import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Content from "./components/Content";
import { useRoutes } from "react-router-dom";
import Layout from "./Layout/Layout";
import ProfilePage from "./components/Profile";
import ProjectPage from "./components/Project";
import AnalyticsPage from "./components/AnalyticsPage";
import Lightweigh from "./components/chart/Lightweigh";
import CreateTrade from "./components/CreateTrade";

export const App = () => {
  const element = useRoutes([
    {
      path: `/`,
      element: <Layout />,
      children: [
        { index: true, element: <Content /> },
        { path: "/profile", element: <ProfilePage /> },
        { path: "/project", element: <ProjectPage /> },
        { path: "/analytics", element: <AnalyticsPage /> },
        { path: "/lightweigh", element: <Lightweigh /> },
        {
          path: "/create-trade",
          element: (
            <RequireAuth fallbackPath="/login">
              <CreateTrade />
            </RequireAuth>
          ),
        },
      ],
    },
    { path: "/login", element: <h1>Login Page</h1> },
    { path: "/register", element: <h1>Register Page</h1> },
  ]);
  return element;
};
