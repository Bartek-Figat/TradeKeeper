import React from "react";

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
    author: "John Doe",
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
    author: "Jane Smith",
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
    author: "Alice Johnson",
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
    author: "Bob Brown",
    changes: [
      { description: "Redesigned the dashboard for better usability." },
      { description: "Added tooltips for better user guidance." },
      { description: "Improved color contrast for better accessibility." },
    ],
  },
];

const ChangelogCard: React.FC = () => {
  return (
    <div className="flex min-h-screen items-baseline justify-center p-8">
      {" "}
      {/* Centering the card on the page */}
      <div className="grid max-w-[1000px] grid-cols-1 items-center justify-center gap-4 sm:grid-cols-4">
        {changelogEntries.map((entry) => (
          <div
            className="mb-4 max-h-[400px] max-w-xs transform-gpu overflow-hidden rounded-lg bg-white p-4 shadow-md transition-transform duration-300" // Added max width and height
            key={entry.version}
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {entry.title}
            </h3>
            <p className="text-sm text-gray-500">
              {entry.date} | Version: {entry.version} | Author: {entry.author}
            </p>
            <h4 className="text-md mt-2 font-semibold text-gray-700">
              Changes:
            </h4>
            <ul className="mt-1 list-inside list-disc text-gray-700">
              {entry.changes.map((change, index) => (
                <li key={index}>{change.description}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangelogCard;
