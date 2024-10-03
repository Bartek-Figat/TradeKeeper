const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-gradient-to-r from-[#111c43] via-blue-800 to-[#111c43] text-white text-center py-6">
      <div className="max-w-xl mx-auto">
        <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:space-x-4">
          <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Terms of Service">
            Terms of Service
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Privacy Policy">
            Privacy Policy
          </a>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Contact Us">
            Contact Us
          </a>
        </div>
        <div className="mt-4">
          <p>Follow us on:</p>
          <div className="flex justify-center items-center space-x-3">
            <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Twitter">
              Twitter
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Facebook">
              Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-blue-200" aria-label="Instagram">
              Instagram
            </a>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          &copy; {new Date().getFullYear()} TradeKeeper. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;