// src/components/Sidebar.tsx
import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard/create-trade", label: "Create Trade" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/profile", label: "Profile" },
  { to: "/dashboard/analytics", label: "Analytics" },
  { to: "/dashboard/lightweigh", label: "Lightweigh" },
  { to: "/dashboard/tutorial", label: "Tutorials" },
  { to: "/dashboard/change-log", label: "Changelog" },
];

const NavLinks = () => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {navItems.map(({ to, label }) => (
        <li key={to} className="mb-2">
          <NavLink
            to={to}
            className={({ isActive }) => (isActive ? "pending" : "")}
          >
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({
  isOpen,
  toggleSidebar,
}) => {
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="bg-blue-500 p-2 text-white md:hidden"
      >
        {isOpen ? "Hide Sidebar" : "Show Sidebar"}
      </button>
      <div
        className={`${isOpen ? "flex" : "hidden"} w-64 flex-col bg-gray-800 text-white md:flex`}
      >
        <div className="p-4">Logo</div>
        <nav className="flex-1 p-4">
          <NavLinks />
        </nav>
      </div>
    </>
  );
};

const MobileNavbar: React.FC<{ toggleMobileNav: () => void }> = ({
  toggleMobileNav,
}) => {
  return (
    <div className="bg-gray-800 p-4 text-white md:hidden">
      <div>Mobile Navbar</div>
      <nav>
        <ul className="flex space-x-4">
          <NavLinks />
        </ul>
      </nav>
      <button onClick={toggleMobileNav} className="bg-blue-500 p-2 text-white">
        Toggle Sidebar
      </button>
    </div>
  );
};

// const Analytics = () => {
//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-2xl font-bold">Analytics</h1>

//       {/* Section 1 */}
//       <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"></section>

//       {/* Section 2 */}
//       <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4"></section>

//       {/* Section 3 */}
//       <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6"></section>

//       {/* Section 4 */}
//       <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"></section>

//       {/* Section 5 */}
//       <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5"></section>

//       {/* Section 6 */}
//       <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6"></section>
//     </div>
//   );
// };

const MainContent = () => {
  return (
    <div className="flex-1 p-4">
      <h1 className="text-2xl font-bold">Main Content</h1>
      <Outlet />
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="bg-gray-800 p-4 text-white">
        <p>Footer Content</p>
      </div>
    </footer>
  );
};

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <MobileNavbar toggleMobileNav={toggleMobileNav} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default App;
