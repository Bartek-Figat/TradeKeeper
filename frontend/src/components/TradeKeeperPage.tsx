import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

const TradeKeeperPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }
    >
      {/* Top Navigation with Dark/Light Mode Toggle */}
      <nav
        className={
          darkMode ? "bg-gray-800 text-white" : "bg-blue-800 text-white"
        }
      >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">TradeKeeper</h1>
            <button className="ml-4" onClick={toggleDarkMode}>
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          <ul className="flex space-x-4">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Services</li>
            <li className="cursor-pointer">Contact</li>
          </ul>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto py-4">
          <h1 className="text-3xl font-bold text-center">TradeKeeper</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        {/* Content Sections */}
        {/* Hero Section */}
        <section className="bg-white shadow-lg p-8 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">About TradeKeeper</h2>
              <p>
                TradeKeeper is a cutting-edge platform for managing trades and
                investments efficiently. It provides real-time analytics,
                portfolio tracking, and trade optimization tools.
              </p>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/400"
                alt="TradeKeeper Image"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-white shadow-lg p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Trade Analytics</h2>
          <p>Explore real-time trade analytics with our advanced tools.</p>
          <img
            src="https://via.placeholder.com/400"
            alt="Trade Analytics Image"
            className="mx-auto max-w-full"
          />
        </section>

        {/* Free Service Section */}
        <section className="bg-white shadow-lg p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">Free Service</h2>
          <p>
            Discover our free service offering powerful tools for traders and
            investors.
          </p>
          <img
            src="https://via.placeholder.com/400"
            alt="Free Service Image"
            className="mx-auto max-w-full"
          />
        </section>

        {/* Price Section */}
        <section
          className={darkMode ? "bg-gray-800 text-white" : "bg-gray-200"}
        >
          <div className="container mx-auto py-8">
            <h2 className="text-2xl font-bold mb-4">Price Plans</h2>
            <p>Choose the best plan for your trading needs.</p>
            {/* Add pricing details here */}
          </div>
        </section>

        {/* Additional Descriptive Sections with Lazy Loading for Images */}
        {[1, 2, 3, 4, 5].map((section) => (
          <section
            key={section}
            className="bg-white shadow-lg p-8 rounded-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Section {section}</h2>
            <p>Description for Section {section}</p>
            <img
              src="https://via.placeholder.com/400"
              alt={`Section ${section} Image`}
              className="mx-auto max-w-full"
              loading="lazy" // Lazy loading attribute
            />
          </section>
        ))}

        {/* Footer */}
      </main>
    </div>
  );
};

export default TradeKeeperPage;
