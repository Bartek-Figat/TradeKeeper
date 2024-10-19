import React from "react";
import { useSelector } from "react-redux";

const Footer: React.FC = () => {
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  return (
    <footer
      className={`flex flex-col items-center justify-center py-6 text-center ${
        darkMode
          ? "bg-gradient-to-r from-[#1a1c1e] via-gray-800 to-[#1a1c1e] text-gray-300"
          : "bg-gradient-to-r from-[#111c43] via-blue-800 to-[#111c43] text-white"
      }`}
    >
      <div className="mx-auto max-w-xl">
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
          <a
            href="#"
            className="hover:text-blue-200"
            aria-label="Terms of Service"
          >
            Terms of Service
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="#"
            className="hover:text-blue-200"
            aria-label="Privacy Policy"
          >
            Privacy Policy
          </a>
          <span className="hidden sm:inline">|</span>
          <a href="#" className="hover:text-blue-200" aria-label="Contact Us">
            Contact Us
          </a>
        </div>
        <div className="mt-4">
          <p>Follow us on:</p>
          <div className="flex items-center justify-center space-x-3">
            <a href="#" className="hover:text-blue-200" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-200" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-200" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
        <p className="mt-4">
          &copy; {new Date().getFullYear()} TradeKeeper. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
