import React from "react";
import { Chart, Filler } from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { BellIcon } from "@heroicons/react/20/solid";

Chart.register(Filler);

// Registering the components we need to use from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

// Sample data for the Line Chart
const lineData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Sales",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const optionsLine = {
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
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
    y: {
      border: { dash: [4, 4] },
      grid: {
        color: "#aaa", // for the grid lines
        tickColor: "#000", // for the tick mark
        tickBorderDash: [2, 3], // also for the tick, if long enough
        tickLength: 10, // just to see the dotted line
        tickWidth: 2,
        offset: true,
        drawTicks: true, // true is default
        drawOnChartArea: true, // true is default
      },
    },
  },
};

// Sample data for the Bar Chart
const barData = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Signups",
      data: [47, 52, 67, 58, 9, 50],
      backgroundColor: ["#3C2C9F"],
      borderColor: 0,
      borderWidth: 0,
    },
  ],
};

// Sample data for the Doughnut Chart
const doughnutData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 0,
    },
  ],
};

const Content: React.FC = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-300 to-purple-500 p-6 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Section 1</h2>
          <p className="text-gray-600">
            Here's some interesting content for Section 1.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-300 to-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Section 2</h2>
          <p className="text-gray-600">Explore more about Section 2 here.</p>
        </div>
        <div className="bg-gradient-to-br from-green-300 to-green-500 p-6 rounded-lg shadow-lg hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-2">Section 3</h2>
          <p className="text-gray-600">
            Don't miss out on the details of Section 3.
          </p>
        </div>

        {/* Line Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Sales Over Time</h2>
          <Line data={lineData} options={optionsLine} />
        </div>
        {/* Bar Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Monthly Signups</h2>
          <Bar data={barData} />
        </div>
        {/* Doughnut Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Vote Distribution</h2>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </div>
  );
};

export default Content;
