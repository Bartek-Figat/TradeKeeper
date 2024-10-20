// src/components/ProfitLossChart.tsx
import React from "react";
import { Bar, Line, Pie, Doughnut, Radar, Bubble } from "react-chartjs-2"; // Import Radar and Bubble charts
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement, // Register PointElement for Bubble chart
  RadialLinearScale, // Register RadialLinearScale for Radar chart
);

// Sample data with more entries
const data = {
  wins: [
    { symbol: "SYM759", entryDate: 1721260663020, profitLoss: 49.3 },
    { symbol: "SYM979", entryDate: 1722869789523, profitLoss: 62.68 },
    { symbol: "SYM572", entryDate: 1724786650092, profitLoss: 68.56 },
    { symbol: "SYM001", entryDate: 1725869789523, profitLoss: 30.5 },
    { symbol: "SYM002", entryDate: 1726869789523, profitLoss: 75.0 },
    { symbol: "SYM003", entryDate: 1727869789523, profitLoss: 55.2 },
    { symbol: "SYM004", entryDate: 1728869789523, profitLoss: 40.0 },
    { symbol: "SYM005", entryDate: 1729869789523, profitLoss: 90.1 },
    { symbol: "SYM006", entryDate: 1730869789523, profitLoss: 20.0 },
    { symbol: "SYM007", entryDate: 1731869789523, profitLoss: 85.5 },
    { symbol: "SYM008", entryDate: 1732869789523, profitLoss: 60.0 },
    { symbol: "SYM009", entryDate: 1733869789523, profitLoss: 70.0 },
    { symbol: "SYM010", entryDate: 1734869789523, profitLoss: 45.0 },
    { symbol: "SYM011", entryDate: 1735869789523, profitLoss: 80.0 },
    { symbol: "SYM012", entryDate: 1736869789523, profitLoss: 25.0 },
    { symbol: "SYM013", entryDate: 1737869789523, profitLoss: 95.0 },
    { symbol: "SYM014", entryDate: 1738869789523, profitLoss: 35.0 },
    { symbol: "SYM015", entryDate: 1739869789523, profitLoss: 50.0 },
    { symbol: "SYM016", entryDate: 1740869789523, profitLoss: 65.0 },
    { symbol: "SYM017", entryDate: 1741869789523, profitLoss: 72.0 },
    { symbol: "SYM018", entryDate: 1742869789523, profitLoss: 88.0 },
    { symbol: "SYM019", entryDate: 1743869789523, profitLoss: 10.0 },
    { symbol: "SYM020", entryDate: 1744869789523, profitLoss: 15.0 },
    { symbol: "SYM021", entryDate: 1745869789523, profitLoss: 20.0 },
    { symbol: "SYM022", entryDate: 1746869789523, profitLoss: 25.0 },
    { symbol: "SYM023", entryDate: 1747869789523, profitLoss: 30.0 },
    { symbol: "SYM024", entryDate: 1748869789523, profitLoss: 35.0 },
    { symbol: "SYM025", entryDate: 1749869789523, profitLoss: 40.0 },
    { symbol: "SYM026", entryDate: 1750869789523, profitLoss: 45.0 },
    { symbol: "SYM027", entryDate: 1751869789523, profitLoss: 50.0 },
    { symbol: "SYM028", entryDate: 1752869789523, profitLoss: 55.0 },
    { symbol: "SYM029", entryDate: 1753869789523, profitLoss: 60.0 },
    { symbol: "SYM030", entryDate: 1754869789523, profitLoss: 65.0 },
    { symbol: "SYM031", entryDate: 1755869789523, profitLoss: 70.0 },
    { symbol: "SYM032", entryDate: 1756869789523, profitLoss: 75.0 },
    { symbol: "SYM033", entryDate: 1757869789523, profitLoss: 80.0 },
    { symbol: "SYM034", entryDate: 1758869789523, profitLoss: 85.0 },
    { symbol: "SYM035", entryDate: 1759869789523, profitLoss: 90.0 },
    { symbol: "SYM036", entryDate: 1760869789523, profitLoss: 95.0 },
    { symbol: "SYM037", entryDate: 1761869789523, profitLoss: 100.0 },
    { symbol: "SYM038", entryDate: 1762869789523, profitLoss: 105.0 },
    { symbol: "SYM039", entryDate: 1763869789523, profitLoss: 110.0 },
    { symbol: "SYM040", entryDate: 1764869789523, profitLoss: 115.0 },
    { symbol: "SYM041", entryDate: 1765869789523, profitLoss: 120.0 },
    { symbol: "SYM042", entryDate: 1766869789523, profitLoss: 125.0 },
    { symbol: "SYM043", entryDate: 1767869789523, profitLoss: 130.0 },
    { symbol: "SYM044", entryDate: 1768869789523, profitLoss: 135.0 },
    { symbol: "SYM045", entryDate: 1769869789523, profitLoss: 140.0 },
    { symbol: "SYM046", entryDate: 1770869789523, profitLoss: 145.0 },
    { symbol: "SYM047", entryDate: 1771869789523, profitLoss: 150.0 },
    { symbol: "SYM048", entryDate: 1772869789523, profitLoss: 155.0 },
    { symbol: "SYM049", entryDate: 1773869789523, profitLoss: 160.0 },
    { symbol: "SYM050", entryDate: 1774869789523, profitLoss: 165.0 },
  ],
  losses: [
    { symbol: "SYM142", entryDate: 1723900973994, profitLoss: -52.02 },
    { symbol: "SYM291", entryDate: 1724942570083, profitLoss: -5.37 },
    { symbol: "SYM929", entryDate: 1724931822893, profitLoss: -13.17 },
    { symbol: "SYM051", entryDate: 1743869789523, profitLoss: -60.0 },
    { symbol: "SYM052", entryDate: 1744869789523, profitLoss: -65.0 },
    { symbol: "SYM053", entryDate: 1745869789523, profitLoss: -70.0 },
    { symbol: "SYM054", entryDate: 1746869789523, profitLoss: -75.0 },
    { symbol: "SYM055", entryDate: 1747869789523, profitLoss: -80.0 },
    { symbol: "SYM056", entryDate: 1748869789523, profitLoss: -85.0 },
    { symbol: "SYM057", entryDate: 1749869789523, profitLoss: -90.0 },
    { symbol: "SYM058", entryDate: 1750869789523, profitLoss: -95.0 },
    { symbol: "SYM059", entryDate: 1751869789523, profitLoss: -100.0 },
    { symbol: "SYM060", entryDate: 1752869789523, profitLoss: -105.0 },
    { symbol: "SYM061", entryDate: 1753869789523, profitLoss: -110.0 },
    { symbol: "SYM062", entryDate: 1754869789523, profitLoss: -115.0 },
    { symbol: "SYM063", entryDate: 1755869789523, profitLoss: -120.0 },
    { symbol: "SYM064", entryDate: 1756869789523, profitLoss: -125.0 },
    { symbol: "SYM065", entryDate: 1757869789523, profitLoss: -130.0 },
    { symbol: "SYM066", entryDate: 1758869789523, profitLoss: -135.0 },
    { symbol: "SYM067", entryDate: 1759869789523, profitLoss: -140.0 },
    { symbol: "SYM068", entryDate: 1760869789523, profitLoss: -145.0 },
    { symbol: "SYM069", entryDate: 1761869789523, profitLoss: -150.0 },
    { symbol: "SYM070", entryDate: 1762869789523, profitLoss: -155.0 },
    { symbol: "SYM071", entryDate: 1763869789523, profitLoss: -160.0 },
    { symbol: "SYM072", entryDate: 1764869789523, profitLoss: -165.0 },
    { symbol: "SYM073", entryDate: 1765869789523, profitLoss: -170.0 },
    { symbol: "SYM074", entryDate: 1766869789523, profitLoss: -175.0 },
    { symbol: "SYM075", entryDate: 1767869789523, profitLoss: -180.0 },
    { symbol: "SYM076", entryDate: 1768869789523, profitLoss: -185.0 },
    { symbol: "SYM077", entryDate: 1769869789523, profitLoss: -190.0 },
    { symbol: "SYM078", entryDate: 1770869789523, profitLoss: -195.0 },
    { symbol: "SYM079", entryDate: 1771869789523, profitLoss: -200.0 },
    { symbol: "SYM080", entryDate: 1772869789523, profitLoss: -205.0 },
    { symbol: "SYM081", entryDate: 1773869789523, profitLoss: -210.0 },
    { symbol: "SYM082", entryDate: 1774869789523, profitLoss: -215.0 },
    { symbol: "SYM083", entryDate: 1775869789523, profitLoss: -220.0 },
    { symbol: "SYM084", entryDate: 1776869789523, profitLoss: -225.0 },
    { symbol: "SYM085", entryDate: 1777869789523, profitLoss: -230.0 },
    { symbol: "SYM086", entryDate: 1778869789523, profitLoss: -235.0 },
    { symbol: "SYM087", entryDate: 1779869789523, profitLoss: -240.0 },
    { symbol: "SYM088", entryDate: 1780869789523, profitLoss: -245.0 },
    { symbol: "SYM089", entryDate: 1781869789523, profitLoss: -250.0 },
    { symbol: "SYM090", entryDate: 1782869789523, profitLoss: -255.0 },
    { symbol: "SYM091", entryDate: 1783869789523, profitLoss: -260.0 },
    { symbol: "SYM092", entryDate: 1784869789523, profitLoss: -265.0 },
    { symbol: "SYM093", entryDate: 1785869789523, profitLoss: -270.0 },
    { symbol: "SYM094", entryDate: 1786869789523, profitLoss: -275.0 },
    { symbol: "SYM095", entryDate: 1787869789523, profitLoss: -280.0 },
    { symbol: "SYM096", entryDate: 1788869789523, profitLoss: -285.0 },
    { symbol: "SYM097", entryDate: 1789869789523, profitLoss: -290.0 },
    { symbol: "SYM098", entryDate: 1790869789523, profitLoss: -295.0 },
    { symbol: "SYM099", entryDate: 1791869789523, profitLoss: -300.0 },
    { symbol: "SYM100", entryDate: 1792869789523, profitLoss: -305.0 },
  ],
};

// Average trade duration data
const averageTradeDurationData = [
  {
    tradeType: "forex",
    averageTradeDuration: 4989879532.05,
    averageTradeDurationDays: "57.75",
  },
  {
    tradeType: "crypto spot",
    averageTradeDuration: 4665779369.619047,
    averageTradeDurationDays: "54.00",
  },
  {
    tradeType: "crypto",
    averageTradeDuration: 4540848556.6,
    averageTradeDurationDays: "52.56",
  },
  {
    tradeType: "option",
    averageTradeDuration: 5895705550.285714,
    averageTradeDurationDays: "68.24",
  },
  {
    tradeType: "stock",
    averageTradeDuration: 6490424095.857142,
    averageTradeDurationDays: "75.12",
  },
];

// Function to group data by month
const groupDataByMonth = (
  data: { symbol: string; entryDate: number; profitLoss: number }[],
) => {
  const groupedData: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = new Date(item.entryDate);
    const options = { year: "numeric", month: "short" } as const; // Format options
    const monthYear = date.toLocaleDateString("en-US", options); // Format: "MMM YYYY"

    if (!groupedData[monthYear]) {
      groupedData[monthYear] = 0;
    }
    groupedData[monthYear] += item.profitLoss;
  });

  return groupedData;
};

const ProfitLossChart: React.FC = () => {
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  ); // Get dark mode state

  const groupedWins = groupDataByMonth(data.wins);
  const groupedLosses = groupDataByMonth(data.losses);

  const labels = Object.keys({ ...groupedWins, ...groupedLosses });
  const winData = labels.map((label) => groupedWins[label] || 0);
  const lossData = labels.map((label) => groupedLosses[label] || 0);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Wins",
        data: winData,
        backgroundColor: darkMode
          ? "rgba(75, 192, 192, 1)"
          : "rgba(75, 192, 192, 0.8)",
      },
      {
        label: "Losses",
        data: lossData,
        backgroundColor: darkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 99, 132, 0.8)",
      },
    ],
  };

  // Prepare data for the average trade duration chart
  const durationLabels = averageTradeDurationData.map((item) => item.tradeType);
  const durationData = averageTradeDurationData.map(
    (item) => item.averageTradeDurationDays,
  );
  const durationChartData = {
    labels: durationLabels,
    datasets: [
      {
        label: "Average Trade Duration (Days)",
        data: durationData,
        backgroundColor: darkMode ? "#9966FF" : "#9966FFCC",
      },
    ],
  };

  // Prepare data for the Pie chart
  const pieChartData = {
    labels: ["Total Wins", "Total Losses"],
    datasets: [
      {
        data: [
          data.wins.reduce((acc, win) => acc + win.profitLoss, 0),
          data.losses.reduce((acc, loss) => acc + loss.profitLoss, 0),
        ],
        backgroundColor: [
          darkMode ? "#36A2EB" : "#FF6384",
          darkMode ? "#FF6384" : "#36A2EB",
        ],
      },
    ],
  };

  // Prepare data for the Line chart
  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Wins Over Time",
        data: winData,
        borderColor: darkMode
          ? "rgba(75, 192, 192, 1)"
          : "rgba(75, 192, 192, 0.8)",
        fill: false,
      },
      {
        label: "Losses Over Time",
        data: lossData,
        borderColor: darkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 99, 132, 0.8)",
        fill: false,
      },
    ],
  };

  // Prepare data for the Doughnut chart
  const doughnutChartData = {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        data: [
          winData.reduce((a, b) => a + b, 0),
          lossData.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: [
          darkMode ? "#FFCE56" : "#FFCE56CC",
          darkMode ? "#FF6384" : "#FF6384CC",
        ],
      },
    ],
  };

  // Prepare data for the Radar chart
  const radarChartData = {
    labels: durationLabels,
    datasets: [
      {
        label: "Average Trade Duration (Radar)",
        data: durationData,
        backgroundColor: darkMode
          ? "rgba(255, 99, 132, 0.2)"
          : "rgba(255, 99, 132, 0.5)",
        borderColor: darkMode
          ? "rgba(255, 99, 132, 1)"
          : "rgba(255, 99, 132, 1)",
        borderWidth: 2,
      },
    ],
  };

  // Prepare data for the Bubble chart
  const bubbleChartData = {
    datasets: [
      {
        label: "Wins",
        data: data.wins.map((win, index) => ({
          x: index, // Use index as x value
          y: win.profitLoss, // Profit/Loss as y value
          r: 10, // Radius of the bubble
        })),
        backgroundColor: "rgba(75, 192, 192, 1)",
      },
      {
        label: "Losses",
        data: data.losses.map((loss, index) => ({
          x: index, // Use index as x value
          y: loss.profitLoss, // Profit/Loss as y value
          r: 10, // Radius of the bubble
        })),
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return (
    <div
      className={`rounded-lg p-14 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* New Charts */}
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Pie data={pieChartData} options={{ responsive: true }} />
        </div>

        <div className="overflow-hidden rounded-lg shadow-xl">
          <Doughnut data={doughnutChartData} options={{ responsive: true }} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Radar data={radarChartData} options={{ responsive: true }} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Bubble data={bubbleChartData} options={{ responsive: true }} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Bar data={durationChartData} options={{ responsive: true }} />
        </div>
        <div className="overflow-hidden rounded-lg shadow-xl">
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default ProfitLossChart;
