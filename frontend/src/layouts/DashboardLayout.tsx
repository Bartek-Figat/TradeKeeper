import { useState, useEffect } from "react"; // Import useState and useEffect
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
import axios from "axios";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [loading, setLoading] = useState(true);

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

  return (
    <div className="flex min-h-screen w-full flex-col">
      {isMobile ? (
        <>
          <div
            className={`fixed inset-0 bg-[#111c43] transition-all duration-300 ${
              isFullScreen ? "opacity-100" : "pointer-events-none opacity-0"
            } z-50`}
          >
            <nav className="flex h-16 items-center justify-around">
              {" "}
              {/* Adjusted height */}
              <NavLink
                to="/dashboard"
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
                  `mx-2 flex flex-col items-center text-lg text-white transition duration-200 ${
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
          <div>
            <Outlet />
          </div>
          <footer>
            <Footer />
          </footer>
        </>
      ) : (
        <div className="relative flex flex-1">
          <aside
            className={`sticky top-0 h-screen self-start bg-[#111c43] transition-transform duration-300 ease-in-out ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-1 translate-x-[-240px]"
            }`}
          >
            <div>
              <div
                className="absolute right-[-30px] top-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition duration-300"
                onClick={toggleSidebar}
              >
                {isOpen ? (
                  <FaTimes className="text-lg text-black" />
                ) : (
                  <FaBars className="text-lg text-black" />
                )}
              </div>

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
