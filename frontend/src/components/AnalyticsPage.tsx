// src/AnalyticsPage.tsx
import React from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const userGrowthDataset = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "User Growth",
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const revenueDataset = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12000, 19000, 3000, 5000, 2000, 3000],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const trafficSourcesDataset = {
  labels: ["Direct", "Referral", "Social"],
  datasets: [
    {
      label: "Traffic Sources",
      data: [55, 25, 20],
      backgroundColor: [
        "rgba(255, 205, 86, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
      ],
      borderColor: [
        "rgba(255, 205, 86, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
      ],
    },
  ],
};

// Sample data for the charts
const dataSets = {
  userGrowth: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [65, 59, 80, 81, 56, 55],
        fill: true,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  },
  revenue: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue",
        data: [12000, 19000, 3000, 5000, 2000, 3000],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  },
  trafficSources: {
    labels: ["Direct", "Referral", "Social"],
    datasets: [
      {
        label: "Traffic Sources",
        data: [55, 25, 20],
        backgroundColor: [
          "rgba(255, 205, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        borderColor: [
          "rgba(255, 205, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
      },
    ],
  },
  costAnalysis: {
    labels: ["Materials", "Labor", "Manufacturing", "Marketing"],
    datasets: [
      {
        label: "Cost Breakdown",
        data: [3000, 1500, 5000, 2500],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  },
  salesFunnel: {
    labels: ["Leads", "Prospects", "Negotiations", "Closes"],
    datasets: [
      {
        label: "Sales Funnel",
        data: [200, 150, 100, 70],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  },
  // Reusing datasets for simplicity
  operationalEfficiency: userGrowthDataset,
  marketTrends: trafficSourcesDataset,
  productPerformance: userGrowthDataset,
  competitiveAnalysis: revenueDataset,
};

const analyticsWidgets = [
  {
    id: 1,
    name: "Revenue Insights",
    component: <Bar data={dataSets.revenue} />,
  },
  {
    id: 2,
    name: "User Growth",
    component: <Line data={dataSets.userGrowth} />,
  },
  {
    id: 3,
    name: "Traffic Sources",
    component: <Doughnut data={dataSets.trafficSources} />,
  },
  {
    id: 4,
    name: "Cost Analysis",
    component: <Bar data={dataSets.costAnalysis} />,
  },
  {
    id: 5,
    name: "Sales Funnel",
    component: <Line data={dataSets.salesFunnel} />,
  },
  {
    id: 6,
    name: "Customer Satisfaction",
    component: <p>92% Positive Feedback</p>,
  },
  {
    id: 7,
    name: "Operational Efficiency",
    component: <Doughnut data={dataSets.operationalEfficiency} />,
  },
  {
    id: 8,
    name: "Market Trends",
    component: <Bar data={dataSets.marketTrends} />,
  },
  {
    id: 9,
    name: "Product Performance",
    component: <Line data={dataSets.productPerformance} />,
  },
  {
    id: 10,
    name: "Competitive Analysis",
    component: <Bar data={dataSets.competitiveAnalysis} />,
  },
  {
    id: 11,
    name: "Referrals",
    component: (
      <>
        <Doughnut data={dataSets.trafficSources} />
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Referral Source</th>
              <th className="px-4 py-2">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">Source 1</td>
              <td className="px-4 py-2">25</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Source 2</td>
              <td className="px-4 py-2">15</td>
            </tr>
            <tr>
              <td className="px-4 py-2">Source 3</td>
              <td className="px-4 py-2">10</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },
  {
    id: 12,
    name: "Socials Progress",
    component: (
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <p>Facebook</p>
          </div>
          <p>70%</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-indigo-500 rounded-md  mb-2"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <p>Twitter</p>
          </div>
          <p>50%</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-green-200 rounded-full mb-2"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p>Instagram</p>
          </div>
          <p>40%</p>
        </div>
        <div className="h-2 bg-gradient-to-r from-red-200 rounded-full"></div>
      </div>
    ),
  },
];

const AnalyticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {analyticsWidgets.map((widget) => (
            <div
              key={widget.id}
              className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {widget.name}
              </h2>
              <div className="h-40 flex items-center justify-center">
                {widget.component}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
