import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex flex-1">
        <aside className="w-[16rem] bg-gray-100 self-start sticky top-0 h-screen">
          <Sidebar />
        </aside>
        <div className="flex flex-1 flex-col">
          <div className="flex-1 p-4">
            <Outlet />
          </div>
          <footer className="">
            <Footer />
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Layout;
