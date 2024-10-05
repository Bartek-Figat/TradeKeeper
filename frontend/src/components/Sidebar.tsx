import React, { ReactElement } from "react";
import {
  InformationCircleIcon,
  HomeIcon,
  CogIcon,
  ChartBarIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  Icon: ReactElement;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, Icon }) => {
  return (
    <NavLink
      to={title.toLowerCase().replace(" ", "-")}
      className={({ isActive }) =>
        `relative flex flex-row items-center h-11 focus:outline-none hover:bg-[#333b5166]  text-gray-200 hover:text-gray-200 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${
          isActive ? "border-indigo-500" : ""
        }`
      }
    >
      <span className="inline-flex justify-center items-center ml-4">
        {React.cloneElement(Icon, { className: "w-5 h-5" })}
      </span>
      <span className="ml-2 text-sm tracking-wide truncate">{title}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {
  return (
    <aside className="w-full p-6 sm:w-60 bg-[#111c43] text-gray-50">
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
            Getting Started
          </h2>
          <div className="flex flex-col space-y-1">
            <SidebarItem title="Installation" Icon={<PlusCircleIcon />} />
            <SidebarItem title="Plugins" Icon={<InformationCircleIcon />} />
            <SidebarItem title="Migrations" Icon={<ChartBarIcon />} />
            <SidebarItem title="Appearance" Icon={<UserCircleIcon />} />
            <SidebarItem title="Mamba UI" Icon={<CogIcon />} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
            Dashboard
          </h2>
          <div className="flex flex-col space-y-1">
            <SidebarItem title="Header" Icon={<HomeIcon />} />
            <SidebarItem title="Drawer" Icon={<InformationCircleIcon />} />
            <SidebarItem title="Page Title" Icon={<ChartBarIcon />} />
            <SidebarItem title="Menus" Icon={<UserCircleIcon />} />
            <SidebarItem title="Sidebar" Icon={<CogIcon />} />
            <SidebarItem title="Footer" Icon={<CurrencyDollarIcon />} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
            Pages
          </h2>
          <div className="flex flex-col space-y-1">
            <SidebarItem title="Homepage" Icon={<HomeIcon />} />
            <SidebarItem title="Users" Icon={<UserCircleIcon />} />
            <SidebarItem title="Tools" Icon={<ChartBarIcon />} />
            <SidebarItem title="Settings" Icon={<CogIcon />} />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-600">
            Misc
          </h2>
          <div className="flex flex-col space-y-1">
            <SidebarItem title="Tutorials" Icon={<InformationCircleIcon />} />
            <SidebarItem title="Changelog" Icon={<ChartBarIcon />} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
