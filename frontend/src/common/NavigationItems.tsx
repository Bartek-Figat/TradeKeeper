import {
  InformationCircleIcon,
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  BriefcaseIcon,
  ChartPieIcon,
  ArrowTrendingDownIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/20/solid";

export const navItems = [
  { to: "/dashboard", icon: <HomeIcon />, label: "Dashboard" },
  { to: "/dashboard/profile", icon: <UserIcon />, label: "Profile" },
  { to: "/dashboard/project", icon: <BriefcaseIcon />, label: "Project" },
  { to: "/dashboard/analytics", icon: <ChartPieIcon />, label: "Analytics" },
  {
    to: "/dashboard/lightweigh",
    icon: <PresentationChartLineIcon />,
    label: "Lightweigh",
  },
  {
    to: "/dashboard/create-trade",
    icon: <ArrowTrendingDownIcon />,
    label: "Create Trade",
  },
  {
    to: "/dashboard/tutorials",
    icon: <InformationCircleIcon />,
    label: "Tutorials",
  },
  { to: "/dashboard/change-log", icon: <ChartBarIcon />, label: "Changelog" },
];
