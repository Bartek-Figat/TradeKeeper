import React from "react";
import { useSelector } from "react-redux"; // Ensure you import useSelector

// Define the type for portfolio metrics
interface PortfolioMetrics {
  totalInvested: string;
  totalExitValue: number;
  totalTrades: number;
  returnRate: string;
}

// Define the props for the component
interface PortfolioMetricsDisplayProps {
  portfolioMetrics: PortfolioMetrics;
}

export const PortfolioMetricsDisplay: React.FC<
  PortfolioMetricsDisplayProps
> = ({ portfolioMetrics }) => {
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  return (
    <div className="grid grid-cols-12 gap-6">
      {[
        {
          label: "Total Amount Invested",
          value: `$${parseFloat(portfolioMetrics.totalInvested).toLocaleString()}`,
        },
        {
          label: "Number of Investments",
          value: portfolioMetrics.totalTrades.toString(),
        },
        {
          label: "Portfolio Value",
          value: `$${portfolioMetrics.totalExitValue.toLocaleString()}`,
        },
        { label: "Returns Rate", value: `${portfolioMetrics.returnRate}%` },
      ].map((item, index) => (
        <div
          key={index}
          className={`col-span-12 rounded p-4 shadow ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"} sm:col-span-6 lg:col-span-3`}
        >
          <h2
            className={`text-xl font-semibold ${darkMode ? "text-neutral-300" : "text-[#000080]"}`}
          >
            {item.label}
          </h2>
          <p
            className={`text-gray-600 ${darkMode ? "text-neutral-400" : "text-[#000080]"}`}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};
