import { useState, useEffect } from "react"; // Import useState and useEffect
import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsFullScreen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      {isMobile ? (
        <>
          <div
            className={`fixed inset-0 bg-[#111c43] transition-all duration-300 ${
              isFullScreen ? "opacity-100" : "opacity-0 pointer-events-none"
            } z-50`}
          >
            <nav className="flex items-center justify-around h-16">
              {" "}
              {/* Adjusted height */}
              <NavLink
                to="/dashboard"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaHome className="text-2xl" />
                <span className="text-xs">Home</span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaUser className="text-2xl" />
                <span className="text-xs">Profile</span>
              </NavLink>
              <NavLink
                to="/dashboard/project"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaCog className="text-2xl" />
                <span className="text-xs">Project</span>
              </NavLink>
              <NavLink
                to="/dashboard/analytics"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaCog className="text-2xl" />
                <span className="text-xs">Analytics</span>
              </NavLink>
              <NavLink
                to="/dashboard/create-trade"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaCog className="text-2xl" />
                <span className="text-xs">Create Trade</span>
              </NavLink>
              <NavLink
                to="/logout"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `flex flex-col items-center text-lg text-white transition duration-200 mx-2 ${
                    isActive
                      ? "border-b-2 border-blue-500"
                      : "border-transparent"
                  }`
                }
              >
                <FaSignOutAlt className="text-2xl" />
                <span className="text-xs">Logout</span>
              </NavLink>
            </nav>
          </div>
          <div className="absolute top-0 right-0 p-4 z-50">
            <div
              className="cursor-pointer"
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              {isFullScreen ? (
                <FaTimes className="text-white text-lg animate-pulse" />
              ) : (
                <FaBars className="text-black text-lg animate-pulse" />
              )}
            </div>
          </div>
          <div>
            <Outlet />
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      ) : (
        <div className="flex flex-1 relative">
          <aside
            className={`bg-[#111c43] self-start sticky top-0 h-screen transition-transform duration-300 ease-in-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-[-240px] opacity-1"
            }`}
          >
            <div>
              <div
                className="absolute top-0 right-[-30px] cursor-pointer flex items-center justify-center w-10 h-10 rounded-full transition duration-300"
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <FaTimes className="text-black text-lg" />
                ) : (
                  <FaBars className="text-black text-lg" />
                )}
              </div>

              <div>
                <Sidebar />
              </div>
            </div>
          </aside>
          <div
            className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${
              !isOpen ? "ml-[-240px] justify-between" : "ml-0"
            }`}
          >
            <div>
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
