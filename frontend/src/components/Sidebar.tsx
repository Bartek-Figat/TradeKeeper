import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../slice/darkModeSlice";
import { navItems } from "../common/NavigationItems";
import { FaMoon, FaSun } from "react-icons/fa";

const SidebarItem: React.FC<{
  title: string;
  path: string;
  Icon: React.ReactElement;
}> = ({ title, path, Icon }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `relative flex h-14 flex-row items-center border-l-4 border-transparent pr-6 ${
          isActive ? "border-indigo-500" : ""
        } hover:border-indigo-500 hover:bg-[#333b5166] focus:outline-none`
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
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <aside
      className={`w-full p-6 sm:w-60 ${
        darkMode ? "bg-[#1a1c1e] text-gray-200" : "bg-[#111c43] text-gray-50"
      }`}
    >
      <nav className="space-y-8 text-sm">
        <div className="space-y-2">
          <div className="flex flex-col justify-start space-y-1">
            {navItems.map(({ to, icon, label }) => (
              <SidebarItem key={to} title={label} path={to} Icon={icon} />
            ))}
          </div>
          <button
            onClick={handleToggleDarkMode}
            className="mt-4 flex w-full items-center justify-center rounded bg-indigo-500 py-2 text-center text-sm font-semibold text-gray-200 transition-all duration-300 hover:bg-indigo-600"
          >
            {darkMode ? (
              <FaSun className="animate-spin-slow mr-2" />
            ) : (
              <FaMoon className="animate-spin-slow mr-2" />
            )}
            Toggle Dark Mode
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
