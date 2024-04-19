const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-gradient-to-r from-[#111c43] via-blue-800 to-[#111c43] text-white text-center">
      <div className="max-w-xl mx-auto">
        <div className="container mx-auto text-center">
          <div className="mt-4 flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4">
            <a href="#" className="text-gray-300 hover:text-blue-200">
              Terms of Service
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-300 hover:text-blue-200">
              Privacy Policy
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="text-gray-300 hover:text-blue-200">
              Contact Us
            </a>
          </div>
          <div className="mt-4">
            <p>Follow us on:</p>
            <div className="flex justify-center items-center space-x-3">
              <a href="#" className="text-gray-300 hover:text-blue-200">
                Twitter
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-200">
                Facebook
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-200">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-4">
          {/* Social icons omitted for brevity */}
        </div>

        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} TradeKeeper All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
