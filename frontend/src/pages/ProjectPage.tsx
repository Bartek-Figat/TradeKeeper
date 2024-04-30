import React from "react";
import { Chart, Filler, ScriptableContext } from "chart.js";
import { Line } from "react-chartjs-2";
import { FaBell, FaArrowRight } from "react-icons/fa";

Chart.register(Filler);

const ProjectPage: React.FC = () => {
  // Fake data for the new card
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
        data: [65, 59, 80, 81, 56, 55, 40], // Example data values
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400); // Adjusted for a more dramatic effect
          // Modern gradient colors
          gradient.addColorStop(0, "rgba(67, 56, 202, 0.9)"); // Deep blue
          gradient.addColorStop(0.5, "rgba(255, 0, 128, 0.5)"); // Vibrant pink
          gradient.addColorStop(1, "rgba(255, 128, 0, 0)"); // Transparent orange
          return gradient;
        },
        fill: {
          target: "origin",
          below: "rgba(67, 56, 202, 0.8)", // Use the starting color of the gradient
        },
        borderWidth: 2,
        radius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    tension: 0.3,
    legend: {
      display: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: {
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        border: {
          display: false,
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
        },
      },
    },
    elements: {
      line: {
        fill: true, // Add fill color
        backgroundColor: "#9BD0F5", // Specify fill color
      },
    },
  };

  // Function to calculate days since creation
  const getDaysSinceCreation = (creationDate: Date): number => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - creationDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Sample creation dates for each trade
  const trade1CreationDate = new Date("2023-10-01");
  const trade2CreationDate = new Date("2023-09-15");
  const trade3CreationDate = new Date("2023-08-20");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white text-center p-4 w-full">
        <h1 className="text-3xl font-bold">Project Page</h1>
      </header>
      <div className="bg-white p-2 rounded-md shadow-lg text-center w-full mb-4">
        <table className="w-full">
          <thead className="bg-blue-500 text-white w-full">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Win</h3>
          <p className="text-green-500 font-semibold">+10%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Losses</h3>
          <p className="text-red-500 font-semibold">-5%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Open</h3>
          <p className="text-blue-500 font-semibold">20</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Wash</h3>
          <p className="text-purple-500 font-semibold">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Avg Win</h3>
          <p className="text-green-500 font-semibold">+8%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Avg Losses</h3>
          <p className="text-red-500 font-semibold">-3%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">PNL</h3>
          <p className="text-orange-500 font-semibold">+15%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Cash Status</h3>
          <p className="text-gray-500 font-semibold">$10,000</p>
        </div>
      </div>
      <main className="flex-1 p-10">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100  cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 1</h2>
            <p className="text-green-500 font-semibold">
              Trade performance: +5% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(trade1CreationDate)} days ago
            </p>
            <div className="flex w-full m-0">
              <Line
                data={chartData}
                options={options}
                className="flex w-full m-0"
              />
            </div>

            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FF6B6B" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#3498DB"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 2</h2>
            <p className="text-red-500 font-semibold">
              Trade performance: -2% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(trade2CreationDate)} days ago
            </p>
            <Line data={chartData} options={options} />
            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FFA500" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#007bff"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 3</h2>
            <p className="text-green-500 font-semibold">
              Trade performance: +8% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(trade3CreationDate)} days ago
            </p>
            <Line data={chartData} options={options} />
            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FFA500" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#007bff"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 4</h2>
            <p className="text-blue-500 font-semibold">
              Trade performance: +3% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(new Date("2023-07-10"))} days ago
            </p>
            <Line data={chartData} options={options} />
            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FFA500" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#007bff"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 5</h2>
            <p className="text-purple-500 font-semibold">
              Trade performance: +10% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(new Date("2023-06-25"))} days ago
            </p>
            <Line data={chartData} options={options} />
            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FFA500" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#007bff"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition duration-100 cursor-pointer">
            <h2 className="text-2xl font-bold mb-2">Trade 6</h2>
            <p className="text-orange-500 font-semibold">
              Trade performance: -5% ROI
            </p>
            <p className="text-gray-400">
              Created {getDaysSinceCreation(new Date("2023-05-20"))} days ago
            </p>
            <Line data={chartData} options={options} />
            <div className="flex justify-between mt-4">
              <div>
                <FaBell size={20} color="#FFA500" className="bell-icon" />
              </div>
              <div>
                <FaArrowRight
                  size={20}
                  color="#007bff"
                  className="arrow-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectPage;
