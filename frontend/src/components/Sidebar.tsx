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
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  title: string;
  Icon: ReactElement;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const iconElement = React.cloneElement(Icon, {
    className: "w-5 h-5",
  });

  return (
    <div className="w-full">
      <button
        className="flex w-full items-center justify-between p-4 text-left hover:bg-[#333b5166] text-gray-50 rounded-md transition-colors duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={`Toggle ${title}`}
      >
        <div className="flex items-center gap-3">
          {iconElement}
          <span className="text-sm font-medium">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="pl-4 overflow-hidden transition-max-height duration-300"
        style={{
          maxHeight: isOpen ? "1000px" : "0",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const SidebarItemNoAnimation: React.FC<SidebarItemProps> = ({
  title,
  Icon,
  children,
}) => {
  const iconElement = React.cloneElement(Icon, {
    className: "w-5 h-5",
  });

  return (
    <div className="w-full">
      <button
        className="flex w-full items-center justify-between p-4 text-left hover:bg-[#333b5166] text-gray-50 rounded-md transition-colors duration-300"
        aria-label={title}
      >
        <div className="flex items-center gap-3">
          {iconElement}
          <span className="text-sm font-medium">{title}</span>
        </div>
      </button>
      <div className="pl-4">{children}</div>
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-full p-6">
      <NavLink
        to="create-trade"
        className={({ isActive }) =>
          isActive ? "bg-[#242157] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Create Trade" Icon={<PlusCircleIcon />} />
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "bg-[#333b5166] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Home" Icon={<HomeIcon />} />
      </NavLink>
      <NavLink
        to="project"
        className={({ isActive }) =>
          isActive ? "bg-[#333b5166] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Projects" Icon={<InformationCircleIcon />} />
      </NavLink>
      <NavLink
        to="analytics"
        className={({ isActive }) =>
          isActive ? "bg-[#333b5166] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Analytics" Icon={<ChartBarIcon />} />
      </NavLink>
      <NavLink
        to="profile"
        className={({ isActive }) =>
          isActive ? "bg-[#333b5166] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Profile" Icon={<UserCircleIcon />} />
      </NavLink>
      <SidebarItem title="Settings" Icon={<CogIcon />} />
      <NavLink
        to="cryptocurrency"
        className={({ isActive }) =>
          isActive ? "bg-[#333b5166] rounded-md" : ""
        }
      >
        <SidebarItemNoAnimation title="Cryptocurrency" Icon={<CurrencyDollarIcon />} />
      </NavLink>
      <SidebarItem title="Logout" Icon={<CogIcon />} />
    </div>
  );
};

export default Sidebar;