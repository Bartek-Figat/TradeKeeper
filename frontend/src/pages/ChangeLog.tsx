import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector for dark mode
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css"; // Import pagination styles

interface Change {
  description: string;
}

interface ChangelogEntry {
  title: string;
  date: string;
  version: string;
  author: string;
  changes: Change[];
}

const changelogEntries: ChangelogEntry[] = [
  {
    title: "Feature Update: User Authentication",
    date: "2023-10-01",
    version: "1.2.0",
    author: "TradeKeep Administrator",
    changes: [
      { description: "Added OAuth2 support for Google and Facebook logins." },
      { description: "Implemented password recovery feature via email." },
      { description: "Enhanced security measures for user data." },
    ],
  },
  {
    title: "Performance Improvements",
    date: "2023-09-25",
    version: "1.1.5",
    author: "TradeKeep Administrator",
    changes: [
      { description: "Optimized database queries to reduce load times." },
      { description: "Improved caching mechanisms for static assets." },
      { description: "Reduced bundle size by removing unused dependencies." },
    ],
  },
  {
    title: "Bug Fixes and Enhancements",
    date: "2023-09-15",
    version: "1.1.0",
    author: "TradeKeep Administrator",
    changes: [
      { description: "Fixed an issue causing crashes on mobile devices." },
      { description: "Resolved a bug in the payment processing module." },
      {
        description: "Updated third-party libraries to their latest versions.",
      },
    ],
  },
  {
    title: "UI/UX Improvements",
    date: "2023-08-30",
    version: "1.0.5",
    author: "TradeKeep Administrator",
    changes: [
      { description: "Redesigned the dashboard for better usability." },
      { description: "Added tooltips for better user guidance." },
      { description: "Improved color contrast for better accessibility." },
    ],
  },
];

const ChangelogCard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Number of entries per page
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  ); // Get dark mode state

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the entries to display based on the current page
  const paginatedEntries = changelogEntries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div
      className={`flex min-h-screen items-baseline justify-center p-8 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Centering the card on the page */}
      <div
        className={`mt-4 flex-1 p-8 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <h4
          className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          Changelog
        </h4>
        <div
          className={`relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px ${darkMode ? "before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent" : "before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent"} md:before:ml-[8.75rem] md:before:translate-x-0`}
        >
          {paginatedEntries.map((entry) => (
            <div className="relative" key={entry.version}>
              <div className="mb-3 items-center md:flex md:space-x-4">
                <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full shadow md:order-1 ${darkMode ? "bg-gray-700" : "bg-white"}`}
                  >
                    <svg
                      className="fill-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                    >
                      <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
                    </svg>
                  </div>
                  {/* Date */}
                  <time
                    className={`font-caveat text-xl font-medium ${darkMode ? "text-indigo-300" : "text-indigo-500"} md:w-28`}
                  >
                    {entry.date}
                  </time>
                </div>
                {/* Title */}
                <div
                  className={`ml-14 ${darkMode ? "text-gray-400" : "text-slate-500"}`}
                >
                  <span
                    className={`font-bold ${darkMode ? "text-white" : "text-slate-900"}`}
                  >
                    {entry.author}
                  </span>{" "}
                  updated the changelog
                </div>
              </div>
              {/* Card */}
              <div
                className={`ml-14 rounded border ${darkMode ? "border-gray-600 bg-gray-800" : "border-slate-200 bg-white"} p-4 text-slate-500 shadow md:ml-44`}
              >
                <h3
                  className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}
                >
                  {entry.title}
                </h3>
                <p
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                >
                  Version: {entry.version}
                </p>
                <h4
                  className={`text-md mt-2 font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Changes:
                </h4>
                <ul className="mt-1 list-inside list-disc">
                  {entry.changes.map((change, index) => (
                    <li
                      key={index}
                      className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      {change.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={changelogEntries.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          className="mt-4"
          showLessItems
        />
      </div>
    </div>
  );
};

export default ChangelogCard;
