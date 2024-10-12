import React, { useState } from "react";
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Calculate the entries to display based on the current page
  const paginatedEntries = changelogEntries.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <div className="flex min-h-screen items-baseline justify-center p-8">
      {/* Centering the card on the page */}
      <div className="mt-4 flex-1 rounded-lg bg-white p-8 shadow-xl">
        <h4 className="text-xl font-bold text-gray-900">Changelog</h4>
        <div className="relative px-4">
          <div className="absolute h-full border border-dashed border-gray-400 border-opacity-20"></div>
          {paginatedEntries.map((entry) => (
            <div
              className="my-6 -ml-1.5 flex w-full items-center"
              key={entry.version}
            >
              <div className="z-10 w-1/12">
                <div className="h-3.5 w-3.5 rounded-full bg-blue-600"></div>
              </div>
              <div className="w-11/12">
                <h3 className="text-lg font-semibold text-gray-800">
                  {entry.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Version: {entry.version} | Author: {entry.author}
                </p>
                <h4 className="text-md mt-2 font-semibold text-gray-700">
                  Changes:
                </h4>
                <ul className="mt-1 list-inside list-disc text-gray-700">
                  {entry.changes.map((change, index) => (
                    <li key={index}>{change.description}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500">{entry.date}</p>
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
