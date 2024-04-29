import "react-toastify/dist/ReactToastify.css";
// import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Content from "./pages/Content";
import { useRoutes } from "react-router-dom";
import Layout from "./layouts/Layout";
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Lightweigh from "./components/chart/Lightweigh";
import CreateTrade from "./components/CreateTrade";
import LandingPage from "./pages/LandingPage";

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
        // {
        //   path: "/create-trade",
        //   element: (
        //     <RequireAuth fallbackPath="/login">
        //       <CreateTrade />
        //     </RequireAuth>
        //   ),
        // },
        {
          path: "/create-trade",
          element: <CreateTrade />,
        },
      ],
    },
    { path: "/login", element: <h1>Login Page</h1> },
    { path: "/register", element: <h1>Register Page</h1> },
    { path: "/landing", element: <LandingPage /> },
  ]);
  return element;
};
