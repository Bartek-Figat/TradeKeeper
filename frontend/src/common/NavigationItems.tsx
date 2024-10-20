import {
  InformationCircleIcon,
  HomeIcon,
  ChartBarIcon,
  UserIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";

export const navItems = [
  {
    to: "/dashboard/create-trade",
    icon: <PlusCircleIcon />,
    label: "Create Trade",
  },
  { to: "/dashboard", icon: <HomeIcon />, label: "Dashboard" },

  { to: "/dashboard/profile", icon: <UserIcon />, label: "Profile" },
  { to: "/dashboard/analytics", icon: <ChartPieIcon />, label: "Analytics" },
  {
    to: "/dashboard/lightweigh",
    icon: <PresentationChartLineIcon />,
    label: "Lightweigh",
  },

  {
    to: "/dashboard/tutorial",
    icon: <InformationCircleIcon />,
    label: "Tutorials",
  },
  { to: "/dashboard/change-log", icon: <ChartBarIcon />, label: "Changelog" },
];
