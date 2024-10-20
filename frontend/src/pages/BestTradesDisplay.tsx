import React from "react";
import { useSelector } from "react-redux";

// Define the type for a trade
interface Trade {
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  profitLoss: string;
  gainPercentage: string;
}

// Define the props for the component
interface BestTradesDisplayProps {
  bestTrades: Trade[];
}

export const BestTradesDisplay: React.FC<BestTradesDisplayProps> = ({
  bestTrades,
}) => {
  // Get the dark mode state from the Redux store
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row">
      <div
        className={`flex-1 rounded-lg p-4 shadow-lg ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"}`}
      >
        <h3
          className={`mb-4 text-lg font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
        >
          Best Trades
        </h3>
        <ul className="space-y-2">
          {bestTrades.map((trade, index) => (
            <li
              key={index}
              className={`flex items-center justify-between border-b p-2 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
            >
              <div>
                <span
                  className={`block font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                >
                  {trade.symbol}
                </span>
                <span
                  className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                >
                  Entry Price: ${trade.entryPrice.toFixed(2)} | Exit Price: $
                  {trade.exitPrice.toFixed(2)}
                </span>
              </div>
              <span
                className={`font-bold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
              >
                Profit/Loss: ${trade.profitLoss} ({trade.gainPercentage}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
