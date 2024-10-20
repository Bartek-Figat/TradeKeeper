import React from "react";
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js"; // Import necessary elements
import { Line } from "react-chartjs-2";
import { FaBell, FaArrowRight } from "react-icons/fa";

// Register the necessary elements
Chart.register(Filler, LineElement, PointElement, LinearScale, CategoryScale);

const ProjectPage: React.FC = () => {
  const symbolData = [
    {
      symbol: "ABC",
      trades: 75,
      pnl: "+$300",
      pnlPercentage: "+3%",
      weightedPercentage: "8%",
    },
    {
      symbol: "DEF",
      trades: 92,
      pnl: "-$150",
      pnlPercentage: "-2%",
      weightedPercentage: "5%",
    },
    {
      symbol: "GHI",
      trades: 110,
      pnl: "+$500",
      pnlPercentage: "+5%",
      weightedPercentage: "10%",
    },
  ];

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Trade Performance",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: (context: { chart: { ctx: any } }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(67, 56, 202, 0.9)");
          gradient.addColorStop(0.5, "rgba(255, 0, 128, 0.5)");
          gradient.addColorStop(1, "rgba(255, 128, 0, 0)");
          return gradient;
        },
        fill: { target: "origin", below: "rgba(67, 56, 202, 0.8)" },
        borderWidth: 2,
        radius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    tension: 0.3,
    plugins: {
      legend: { display: false },
      filler: { propagate: true },
    },
    scales: {
      x: { display: true },
      y: { display: true },
    },
  };

  const getDaysSinceCreation = (creationDate: Date): number => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - creationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const trades = [
    {
      name: "Trade 1",
      roi: "+5%",
      color: "text-green-500",
      date: "2023-10-01",
    },
    { name: "Trade 2", roi: "-2%", color: "text-red-500", date: "2023-09-15" },
    {
      name: "Trade 3",
      roi: "+8%",
      color: "text-green-500",
      date: "2023-08-20",
    },
    { name: "Trade 4", roi: "+3%", color: "text-blue-500", date: "2023-07-10" },
    {
      name: "Trade 5",
      roi: "+10%",
      color: "text-purple-500",
      date: "2023-06-25",
    },
    {
      name: "Trade 6",
      roi: "-5%",
      color: "text-orange-500",
      date: "2023-05-20",
    },
  ];

  const TradeCard = ({
    name,
    roi,
    color,
    date,
  }: {
    name: string;
    roi: string;
    color: string;
    date: string;
  }) => (
    <div className="transform cursor-pointer rounded-lg bg-white p-6 text-center shadow-lg transition duration-100 hover:scale-105">
      <h2 className="mb-2 text-2xl font-bold">{name}</h2>
      <p className={`${color} font-semibold`}>Trade performance: {roi} ROI</p>
      <p className="text-gray-400">
        Created {getDaysSinceCreation(new Date(date))} days ago
      </p>
      <Line data={chartData} options={options} />
      <div className="mt-4 flex justify-between">
        <FaBell size={20} color="#FFA500" className="bell-icon" />
        <FaArrowRight size={20} color="#007bff" className="arrow-icon" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <header className="w-full bg-gray-800 p-4 text-center text-white">
        <h1 className="text-3xl font-bold">Project Page</h1>
      </header>
      <div className="mb-4 w-full rounded-md bg-white p-2 text-center shadow-lg">
        <table className="w-full">
          <thead className="w-full bg-blue-500 text-white">
            <tr>
              <th className="p-2">Symbol</th>
              <th className="p-2">Trades</th>
              <th className="p-2">PnL</th>
              <th className="p-2">PnL%</th>
              <th className="p-2">Weighted %</th>
            </tr>
          </thead>
          <tbody>
            {symbolData.map((data, index) => (
              <tr key={index}>
                <td className="bg-blue-50 p-2">{data.symbol}</td>
                <td className="bg-blue-50 p-2">{data.trades}</td>
                <td className="bg-blue-50 p-2">{data.pnl}</td>
                <td className="bg-blue-50 p-2">{data.pnlPercentage}</td>
                <td className="bg-blue-50 p-2">{data.weightedPercentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          "Win",
          "Losses",
          "Open",
          "Wash",
          "Avg Win",
          "Avg Losses",
          "PNL",
          "Cash Status",
        ].map((label, index) => (
          <div
            key={index}
            className="rounded-lg bg-white p-4 text-center shadow-lg"
          >
            <h3 className="text-lg font-semibold">{label}</h3>
            <p
              className={`font-semibold ${index % 2 === 0 ? "text-green-500" : "text-red-500"}`}
            >
              +10%
            </p>
          </div>
        ))}
      </div>
      <main className="flex-1 p-10">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade, index) => (
            <TradeCard key={index} {...trade} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
