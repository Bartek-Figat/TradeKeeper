import "react-toastify/dist/ReactToastify.css";
import { useRoutes } from "react-router-dom"; // Import Navigate for redirection
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
//import ProtectedRoute from "./layouts/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import ChangeLogPage from "./pages/ChangeLog";
import TransactionTable from "./pages/Transactions";
//import TutorialPage from "./pages/TutorialPage";
import TradeCalendar from "./pages/Calendar";

export const App = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/sign-in",
          element: <SignInPage />,
        },
        {
          path: "/sign-up",
          element: <SignUpPage />,
        },
        {
          path: "/reset-password",
          element: <ResetPasswordPage />,
        },
      ],
    },
    {
      path: `/dashboard`,
      element: <DasboardLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: "transactions", element: <TransactionTable /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "project", element: <ProjectPage /> },
        { path: "analytics", element: <AnalyticsPage /> },
        { path: "lightweigh", element: <Lightweigh /> },
        { path: "create-trade", element: <CreateTrade /> },
        { path: "change-log", element: <ChangeLogPage /> },
        { path: "tutorial", element: <TradeCalendar /> },
      ],
    },

    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return element;
};

// export const App = () => {
//   const element = useRoutes([
//     {
//       path: "/",
//       element: !localStorage.getItem("token") ? (
//         <HomePage />
//       ) : (
//         <Navigate to="/dashboard" />
//       ),
//     },
//     {
//       element: <AuthLayout />,
//       children: [
//         {
//           path: "/sign-in",
//           element: !localStorage.getItem("token") ? (
//             <SignInPage />
//           ) : (
//             <Navigate to="/dashboard" />
//           ),
//         },
//         {
//           path: "/sign-up",
//           element: !localStorage.getItem("token") ? (
//             <SignUpPage />
//           ) : (
//             <Navigate to="/dashboard" />
//           ),
//         },
//         {
//           path: "/reset-password",
//           element: !localStorage.getItem("token") ? (
//             <ResetPasswordPage />
//           ) : (
//             <Navigate to="/dashboard" />
//           ),
//         },
//       ],
//     },
//     {
//       path: `/dashboard`,
//       element: <ProtectedRoute />,
//       children: [
//         {
//           path: `/dashboard`,
//           element: <DasboardLayout />,
//           children: [
//             { index: true, element: <DashboardPage /> },
//             { path: "transactions", element: <TransactionTable /> },
//             { path: "profile", element: <ProfilePage /> },
//             { path: "project", element: <ProjectPage /> },
//             { path: "analytics", element: <AnalyticsPage /> },
//             { path: "lightweigh", element: <Lightweigh /> },
//             { path: "create-trade", element: <CreateTrade /> },
//             { path: "change-log", element: <ChangeLogPage /> },
//             //{ path: "tutorial", element: <TutorialPage /> },
//             { path: "tutorial", element: <TradeCalendar /> },
//           ],
//         },
//       ],
//     },
//     {
//       path: "*",
//       element: <NotFoundPage />,
//     },
//   ]);

//   return element;
// };
