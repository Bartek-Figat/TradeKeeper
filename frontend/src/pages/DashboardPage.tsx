import PortfolioOverview from "./PortfolioOverview";
import PriceTicker from "./PriceTicker";
import ChartComponent from "../components/chart/chartContentPage";
import ChartComponetTwo from "../components/chart/Aerachart";
import BarChartComponent from "../components/chart/BarChartComponent";
import LineChartComponent from "../components/chart/LineChartComponent";
import { staticData, staticData2 } from "../components/chart/priceData";
import { useSelector } from "react-redux";
import TransactionTable from "./Transactions";
import { PortfolioMetricsDisplay } from "./PortfolioMetricsDisplay";
import { BestTradesDisplay } from "./BestTradesDisplay";

const bestTrades = [
  {
    symbol: "ETH",
    entryPrice: 2590.8,
    exitPrice: 10000,
    profitLoss: "7409.20",
    gainPercentage: "99.31",
  },
  {
    symbol: "SYM895",
    entryPrice: 1.11,
    exitPrice: 87.54,
    profitLoss: "86.43",
    gainPercentage: "81.30",
  },
  {
    symbol: "SYM57",
    entryPrice: 0.2,
    exitPrice: 83.5,
    profitLoss: "83.30",
    gainPercentage: "0.00",
  },
  {
    symbol: "SYM606",
    entryPrice: 6.78,
    exitPrice: 81.54,
    profitLoss: "74.76",
    gainPercentage: "97.35",
  },
  {
    symbol: "SYM303",
    entryPrice: 6.73,
    exitPrice: 75.95,
    profitLoss: "69.22",
    gainPercentage: "97.53",
  },
  {
    symbol: "SYM572",
    entryPrice: 29.47,
    exitPrice: 98.03,
    profitLoss: "68.56",
    gainPercentage: "99.44",
  },
  {
    symbol: "SYM979",
    entryPrice: 23.33,
    exitPrice: 86.01,
    profitLoss: "62.68",
    gainPercentage: "99.35",
  },
  {
    symbol: "SYM320",
    entryPrice: 35.86,
    exitPrice: 96.88,
    profitLoss: "61.02",
    gainPercentage: "99.59",
  },
  {
    symbol: "SYM538",
    entryPrice: 21.98,
    exitPrice: 80.11,
    profitLoss: "58.13",
    gainPercentage: "99.37",
  },
  {
    symbol: "SYM968",
    entryPrice: 5.46,
    exitPrice: 62.14,
    profitLoss: "56.68",
    gainPercentage: "97.51",
  },
];

const barChartData = [
  { time: "2023-01-01", open: 100, high: 110, low: 90, close: 105 },
  { time: "2023-01-02", open: 105, high: 115, low: 95, close: 110 },
  { time: "2023-01-03", open: 110, high: 120, low: 100, close: 115 },
  { time: "2023-01-04", open: 115, high: 125, low: 105, close: 120 },
  { time: "2023-01-05", open: 120, high: 130, low: 110, close: 125 },
  { time: "2023-01-06", open: 125, high: 135, low: 115, close: 130 },
  { time: "2023-01-07", open: 130, high: 140, low: 120, close: 135 },
  { time: "2023-01-08", open: 135, high: 145, low: 125, close: 140 },
  { time: "2023-01-09", open: 140, high: 150, low: 130, close: 145 },
  { time: "2023-01-10", open: 145, high: 155, low: 135, close: 150 },
  { time: "2023-01-11", open: 150, high: 160, low: 140, close: 155 },
  { time: "2023-01-12", open: 155, high: 165, low: 145, close: 160 },
  { time: "2023-01-13", open: 160, high: 170, low: 150, close: 165 },
  { time: "2023-01-14", open: 165, high: 175, low: 155, close: 170 },
  { time: "2023-01-15", open: 170, high: 180, low: 160, close: 175 },
  { time: "2023-01-16", open: 175, high: 185, low: 165, close: 180 },
  { time: "2023-01-17", open: 180, high: 190, low: 170, close: 185 },
  { time: "2023-01-18", open: 185, high: 195, low: 175, close: 190 },
  { time: "2023-01-19", open: 190, high: 200, low: 180, close: 195 },
  { time: "2023-01-20", open: 195, high: 205, low: 185, close: 200 },
  { time: "2023-01-21", open: 200, high: 210, low: 190, close: 205 },
  { time: "2023-01-22", open: 205, high: 215, low: 195, close: 210 },
  { time: "2023-01-23", open: 210, high: 220, low: 200, close: 215 },
  { time: "2023-01-24", open: 215, high: 225, low: 205, close: 220 },
  { time: "2023-01-25", open: 220, high: 230, low: 210, close: 225 },
  { time: "2023-01-26", open: 225, high: 235, low: 215, close: 230 },
  { time: "2023-01-27", open: 230, high: 240, low: 220, close: 235 },
  { time: "2023-01-28", open: 235, high: 245, low: 225, close: 240 },
  { time: "2023-01-29", open: 240, high: 250, low: 230, close: 245 },
  { time: "2023-01-30", open: 245, high: 255, low: 235, close: 250 },
  { time: "2023-01-31", open: 250, high: 260, low: 240, close: 255 },
];

// Example usage
const portfolioMetrics = {
  totalInvested: "7592.14",
  totalExitValue: 15218.49,
  totalTrades: 103,
  returnRate: "100.00",
};
export interface Transaction {
  id: number;
  date: string;
  type: "Buy" | "Sell";
  amount: string;
  status: "Completed" | "Pending" | "Cancel";
  description?: string;
  notes?: string;
  relatedTransactions?: Array<{ id: string; amount: string; status: string }>;
}

const DashboardPage = () => {
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <div
        className={`flex w-full flex-col justify-center gap-6 p-10 ${darkMode ? "dark:bg-[#252729]" : "bg-[#f9f9f9]"}`}
      >
        <PriceTicker />
        <PortfolioOverview />
        <PortfolioMetricsDisplay portfolioMetrics={portfolioMetrics} />
        <div className="flex flex-col gap-4 lg:flex-row">
          <TransactionTable />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div
            className={`relative rounded-md p-1 ${darkMode ? "bg-[#1a1c1e]" : "bg-white"} p-2`}
          >
            <ChartComponent data={staticData} />
          </div>

          <div
            className={`relative rounded-md p-1 ${darkMode ? "bg-[#1a1c1e]" : "bg-white"} p-2`}
          >
            <ChartComponetTwo data1={staticData} data2={staticData2} />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
          <div
            className={`relative rounded-md p-1 ${darkMode ? "bg-[#1a1c1e]" : "bg-white"} p-2`}
          >
            <BarChartComponent data={barChartData} />
          </div>

          <div
            className={`relative rounded-md p-1 ${darkMode ? "bg-[#1a1c1e]" : "bg-white"} p-2`}
          >
            <LineChartComponent data={staticData} />
          </div>
        </div>
        <BestTradesDisplay bestTrades={bestTrades} />;
      </div>
    </div>
  );
};

export default DashboardPage;
