import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import axios from "axios";
import { navItems } from "../common/NavigationItems";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../slice/darkModeSlice";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );
  const dispatch = useDispatch();

  const API_URL = "http://localhost:8080/auth";

  const validateToken = async (token: string) => {
    try {
      const { data } = await axios.post(`${API_URL}/validate-token`, { token });
      return data;
    } catch (error) {
      console.error("Token validation error:");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const checkToken = async () => {
      if (token) {
        try {
          setLoading(true);
          const isValid = await validateToken(token);
          if (!isValid) {
            localStorage.removeItem("token");
            navigate("/sign-in");
          }
        } catch (error) {
          localStorage.removeItem("token");
          navigate("/sign-in");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("No token found");
        navigate("/sign-in");
      }
    };

    checkToken();
  }, [navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsFullScreen(false);
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div
      className={`${darkMode ? "dark" : "light"} flex min-h-screen w-full flex-col`}
    >
      {isMobile ? (
        <>
          <div
            className={`fixed inset-0 transition-all duration-300 ${
              darkMode
                ? "bg-[#1a1c1e] text-gray-200"
                : "bg-[#111c43] text-white"
            } ${isFullScreen ? "opacity-1" : "pointer-events-none opacity-0"} z-50`}
          >
            <nav className="flex h-full flex-col space-y-4 p-10">
              {navItems.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 rounded-md border-l-4 border-transparent p-2 pr-6 transition duration-200 hover:border-indigo-500 hover:bg-[#333b5166] ${
                      isActive ? "hover:bg-[#333b5166]" : ""
                    }`
                  }
                >
                  {React.cloneElement(icon, { className: "w-5 h-5" })}
                  <span className="text-sm">{label}</span>
                </NavLink>
              ))}
              <button
                onClick={handleToggleDarkMode}
                className="mt-4 flex w-full items-center justify-center rounded bg-indigo-500 py-2 text-center text-sm font-semibold transition-all duration-300 hover:bg-indigo-600"
              >
                {darkMode ? (
                  <FaSun className="animate-spin-slow mr-2" />
                ) : (
                  <FaMoon className="animate-spin-slow mr-2" />
                )}
                Toggle Dark Mode
              </button>
            </nav>
          </div>
          <div className="absolute right-0 top-0 z-50 p-4">
            <div
              className="cursor-pointer"
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              {isFullScreen ? (
                <FaTimes className="animate-pulse text-lg text-white" />
              ) : (
                <FaBars className="animate-pulse text-lg text-black" />
              )}
            </div>
          </div>
          <div className="flex flex-1 flex-col">
            <Outlet />
            <footer>
              <Footer />
            </footer>
          </div>
        </>
      ) : (
        <div className="relative flex flex-1">
          <aside
            className={`sticky top-0 h-screen self-start transition-transform duration-300 ease-in-out ${
              darkMode ? "bg-[#1a1c1e]" : "bg-[#111c43]"
            } ${isOpen ? "translate-x-0 opacity-100" : "opacity-1 translate-x-[-240px]"}`}
          >
            <div>
              <motion.div
                className={`absolute right-[-50px] top-[5px] z-20 flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full shadow-lg transition duration-300 ${
                  darkMode
                    ? "bg-[#1a1c1e] hover:bg-[#243369]"
                    : "bg-[#111c43] hover:bg-[#243369]"
                }`}
                onClick={toggleSidebar}
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {isOpen ? (
                  <FaTimes className="text-xl text-white" />
                ) : (
                  <FaBars className="text-xl text-white" />
                )}
              </motion.div>
              <div>
                <Sidebar />
              </div>
            </div>
          </aside>
          <div
            className={`flex min-h-screen w-full min-w-0 flex-auto flex-col transition-all duration-300 ease-in-out ${
              !isOpen ? "ml-[-240px] justify-between" : "ml-0"
            }`}
          >
            <div className="flex flex-1 flex-col dark:bg-[#252729]">
              <Outlet />
            </div>
            <footer>
              <Footer />
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
