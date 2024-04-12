import React, { useState, ReactElement } from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
  HomeIcon,
  CogIcon,
  ChartBarIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";

import { Link, NavLink } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  Icon: ReactElement;
  children?: React.ReactNode;
}

interface SidebarItemPropsNoAnimation {
  title: string;
  Icon: ReactElement;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const iconElement = React.cloneElement(Icon, {
    className: "w-5 h-5",
  });

  //

  return (
    <div className="w-full">
      <button
        className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-200 text-[#4b5563] rounded-md transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          {iconElement}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? "rotate-180 bounce" : ""
          }`}
          style={{
            transition: "transform 0.3s ease",
            transformOrigin: "center",
            transformStyle: "preserve-3d",
          }}
        />
      </button>
      <div
        className={`pl-4 sidebar-item-content`}
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SidebarItemNoAnimation: React.FC<SidebarItemPropsNoAnimation> = ({
  title,
  Icon,
  children,
}) => {
  const iconElement = React.cloneElement(Icon, {
    className: "w-5 h-5",
  });

  return (
    <div className="w-full">
      <button className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-200 text-[#4b5563] rounded-md transition-colors duration-300">
        <div className="flex items-center gap-3">
          {iconElement}
          <span className="text-sm font-medium">{title}</span>
        </div>
      </button>
      <div className={`pl-4 sidebar-item-content`}>{children}</div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="">
      <div className="flex flex-col w-full p-6">
        <div className="flex p-2 justify-between rounded-md bg-green-400 text-white">
          <div className="flex items-center text-lg">$</div>
          <div className="text-right">
            <p>36,000.16</p>
            <p>Account Balance</p>
          </div>
        </div>
        <NavLink
          to="/create-trade"
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation
            title="Create Trade"
            Icon={<PlusCircleIcon />}
          />
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation title="Home" Icon={<HomeIcon />} />
        </NavLink>
        <NavLink
          to="/project"
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation
            title="Projects"
            Icon={<InformationCircleIcon />}
          />
        </NavLink>
        <NavLink
          to="/analytics "
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation title="Analytics" Icon={<ChartBarIcon />} />
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation title="Profile" Icon={<UserCircleIcon />} />
        </NavLink>

        <SidebarItem title="Settings" Icon={<CogIcon />} />
        <NavLink
          to="/lightweigh"
          className={({ isActive }) =>
            isActive ? "bg-gray-200 rounded-md" : ""
          }
        >
          <SidebarItemNoAnimation
            title="Cryptocurrency"
            Icon={<CurrencyDollarIcon />}
          />
        </NavLink>

        <SidebarItem title="Logout" Icon={<CogIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
