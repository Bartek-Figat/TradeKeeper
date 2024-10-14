import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../common/NavigationItems";

const SidebarItem: React.FC<{
  title: string;
  path: string;
  Icon: React.ReactElement;
}> = ({ title, path, Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `relative flex h-14 flex-row items-center border-l-4 border-transparent pr-6 text-gray-200 hover:border-indigo-500 hover:bg-[#333b5166] hover:text-gray-200 focus:outline-none ${
          isActive ? "border-indigo-500" : ""
        }`
      }
    >
      <span className="ml-4 inline-flex items-center justify-center">
        {React.cloneElement(Icon, { className: "w-5 h-5" })}
      </span>
      <span className="ml-2 truncate text-sm tracking-wide">{title}</span>
    </NavLink>
  );
};

const Sidebar: React.FC = () => {

  return (
    <aside className="w-full bg-[#111c43] p-6 text-gray-50 sm:w-60">
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <div className="flex flex-col space-y-1 justify-start">
            {navItems.map(({ to, icon, label }) => (
              <SidebarItem key={to} title={label} path={to} Icon={icon} />
            ))}
          </div>
          <button
            
            className="mt-4 w-full py-2 text-center text-sm font-semibold text-gray-200 bg-indigo-500 hover:bg-indigo-600 rounded"
          >
            Toggle Dark Mode
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;