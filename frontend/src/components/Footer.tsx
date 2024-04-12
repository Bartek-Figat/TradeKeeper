import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-gray-800 text-white text-center py-4">
      <div className="max-w-xl mx-auto">
        <div className="container mx-auto text-center">
          <div className="mt-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4">
            <a href="#" className="text-gray-300 hover:text-gray-500">
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-300 hover:text-gray-500">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-300 hover:text-gray-500">
              Contact Us
            </a>
          </div>
          <div className="mt-4">
            <p>Follow us on:</p>
            <div className="flex justify-center items-center space-x-3">
              <a href="#" className="text-gray-300 hover:text-gray-500">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-500">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-gray-500">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-6 h-6 text-gray-300 hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Facebook icon path */}
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-6 h-6 text-gray-300 hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Twitter icon path */}
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className="w-6 h-6 text-gray-300 hover:text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              {/* Instagram icon path */}
            </svg>
          </a>
        </div>

        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} TradeKeeper All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
