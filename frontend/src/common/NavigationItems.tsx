import {
  InformationCircleIcon,
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  BriefcaseIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  RectangleGroupIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";

export const navItems = [
  { to: "/dashboard", icon: <HomeIcon />, label: "Dashboard" },
  {
    to: "/dashboard/transactions",
    icon: <RectangleGroupIcon />,
    label: "Transactions",
  },
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
    icon: <PlusCircleIcon />,
    label: "Create Trade",
  },
  {
    to: "/dashboard/tutorial",
    icon: <InformationCircleIcon />,
    label: "Tutorials",
  },
  { to: "/dashboard/change-log", icon: <ChartBarIcon />, label: "Changelog" },
];
