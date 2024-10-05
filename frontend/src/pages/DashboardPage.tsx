import Modal from "./Modal";
import PriceTicker from "./PriceTicker";
import { FaArrowRight } from "react-icons/fa";
import ChartComponent from "../components/chart/chartContentPage";
import { staticData } from "../components/chart/priceData";
import { useState } from "react";

const DashboardPage = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const myStocks = [
    { name: "Apple Inc.", quantity: 10, currentValue: "$1,116.90" },
    { name: "Twitter Inc.", quantity: 15, currentValue: "$993.21" },
    { name: "Netflix Inc.", quantity: 5, currentValue: "$161.72" },
    { name: "BS (Bootstrap, Inc.)", quantity: 5, currentValue: "$30,500.15" },
    {
      name: "TTR (Twitter.com, Inc.)",
      quantity: 5,
      currentValue: "$15,526.01",
    },
  ];

  const transactionHistory = [
    {
      id: 1,
      date: "2023-04-01",
      type: "Buy",
      amount: "$1,000",
      status: "Completed",
    },
    {
      id: 2,
      date: "2023-04-02",
      type: "Sell",
      amount: "$500",
      status: "Pending",
    },
  ];

  const topGainers = [
    { type: "Forex", name: "EUR/USD", price: "$1.12", gain: "+3.2%" },
    { type: "Crypto", name: "Bitcoin (BTC)", price: "$45,000", gain: "+4.5%" },
    { type: "Forex", name: "GBP/USD", price: "$1.35", gain: "+2.8%" },
    {
      type: "Crypto",
      name: "Ethereum (ETH)",
      price: "$3,200.00",
      gain: "+5.0%",
    },
    { type: "Forex", name: "USD/JPY", price: "$110.00", gain: "+1.5%" },
    { type: "Crypto", name: "Litecoin (LTC)", price: "$150.00", gain: "+2.0%" },
  ];

  const renderTable = (data) => (
    <table className="min-w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Date
          </th>
          <th scope="col" className="px-6 py-3">
            Type
          </th>
          <th scope="col" className="px-6 py-3">
            Amount
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((transaction) => (
          <tr
            key={transaction.id}
            className="border-b cursor-pointer"
            onClick={() => openModal(transaction)}
          >
            <td className="px-6 py-4">{transaction.date}</td>
            <td className="px-6 py-4">{transaction.type}</td>
            <td className="px-6 py-4">{transaction.amount}</td>
            <td className="px-6 py-4">{transaction.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="flex w-full flex-col justify-center gap-6 p-10">
      <PriceTicker />
      {/* Portfolio Overview */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex justify-center items-center"></div>
        <div className="flex flex-wrap justify-between gap-4">
          {[
            { label: "Total Value", value: "$8.89k", color: "text-primary" },
            { label: "Market Value", value: "$15.9k", color: "text-warning" },
            { label: "Yield", value: "3.4%", color: "text-danger" },
            { label: "Dividend", value: "$1.3k", color: "text-info" },
            { label: "Gain", value: "$116", color: "text-success" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white p-4 rounded-md shadow-md"
            >
              <span className="block font-semibold text-gray-700">
                {item.label}
              </span>
              <span className={`block ${item.color} text-lg font-bold`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Amount Invested", value: "$50,000" },
          { label: "Number of Investments", value: "25" },
          { label: "Portfolio Value", value: "$34,000" },
          { label: "Returns Rate", value: "7.5%" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-white p-4 rounded-md shadow-md"
          >
            <span className="block font-semibold text-gray-700">
              {item.label}
            </span>
            <span className="block text-primary text-lg font-bold">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Chart and My Stocks */}
      <div className="grid grid-cols-1 md:grid-cols-12 lg:gap-4 sm:gap-0">
        <div className="lg:col-span-8 md:col-span-6 p-2 rounded-lg shadow-md">
          <ChartComponent data={staticData} />
        </div>
        <div className="lg:col-span-4 md:col-span-6 p-2 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">My Stocks</h3>
          <div className="space-y-2">
            {myStocks.map((stock, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-2 rounded-md text-color-[#333]"
              >
                <div>
                  <h4 className="font-semibold text-blue-600">{stock.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{stock.currentValue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History and Market Movers */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Transaction History */}
        <div className="flex-1 shadow-lg p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          {renderTable(transactionHistory)}
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          transaction={selectedTransaction}
        />

        {/* Recent Transactions */}
        <div className="flex-1 shadow-lg p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <ul className="space-y-2">
            {transactionHistory.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <span className="block text-gray-700 font-semibold">
                    {transaction.type}
                  </span>
                  <span className="text-sm text-gray-500">
                    {transaction.date}
                  </span>
                </div>
                <span className="text-gray-800 font-bold">
                  {transaction.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="flex-1 shadow-lg p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Market Movers</h3>
          <ul className="space-y-2">
            {topGainers.map((gainer, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <span className="block text-gray-700 font-semibold">
                    {gainer.name}
                  </span>
                  <span className="text-sm text-gray-500">{gainer.type}</span>
                </div>
                <span className="text-gray-800 font-bold">{gainer.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Recent News Section */}
      <div className="shadow-lg p-4 rounded-lg bg-white">
        <h3 className="text-lg font-semibold mb-4">Recent News</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Stock News */}
          <div>
            <h4 className="font-semibold text-md mb-2">Stock News</h4>
            <ul className="space-y-4">
              {[
                {
                  date: "August 5, 2023",
                  title: "Market hits record high amid economic recovery",
                  tags: ["stocks", "market", "economy"],
                  description:
                    "The stock market reached a new high as investors remain optimistic about economic recovery.",
                },
                {
                  date: "July 20, 2023",
                  title: "Tech stocks surge as earnings reports roll in",
                  tags: ["tech", "earnings", "stocks"],
                  description:
                    "Major tech companies report better-than-expected earnings, driving stock prices higher.",
                },
                {
                  date: "July 15, 2023",
                  title: "Investors eye upcoming Federal Reserve meeting",
                  tags: ["federal reserve", "interest rates"],
                  description:
                    "Market participants are closely watching the Federal Reserve's next move on interest rates.",
                },
                {
                  date: "July 10, 2023",
                  title: "New regulations impact stock trading",
                  tags: ["regulations", "trading"],
                  description:
                    "New regulations are set to change the landscape of stock trading in the coming months.",
                },
              ].map((newsItem, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-gray-500 text-sm">{newsItem.date}</p>
                  <h4 className="font-semibold text-md">{newsItem.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {newsItem.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="flex items-center text-blue-500 text-sm mt-2 hover:underline"
                  >
                    Read more <FaArrowRight className="ml-1" />
                  </a>
                </div>
              ))}
            </ul>
          </div>

          {/* Forex News */}
          <div>
            <h4 className="font-semibold text-md mb-2">Forex News</h4>
            <ul className="space-y-4">
              {[
                {
                  date: "August 4, 2023",
                  title: "Dollar strengthens against major currencies",
                  tags: ["forex", "dollar", "currencies"],
                  description:
                    "The US dollar has gained strength against major currencies amid economic data releases.",
                },
                {
                  date: "July 30, 2023",
                  title: "Eurozone inflation hits record levels",
                  tags: ["euro", "inflation"],
                  description:
                    "Inflation in the Eurozone has reached unprecedented levels, impacting currency valuations.",
                },
                {
                  date: "July 25, 2023",
                  title: "GBP/USD volatility increases",
                  tags: ["GBP", "USD", "volatility"],
                  description:
                    "The GBP/USD pair experiences increased volatility due to political developments in the UK.",
                },
                {
                  date: "July 20, 2023",
                  title: "Central banks signal potential rate hikes",
                  tags: ["central banks", "interest rates"],
                  description:
                    "Several central banks are hinting at potential interest rate hikes, affecting forex markets.",
                },
              ].map((newsItem, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-gray-500 text-sm">{newsItem.date}</p>
                  <h4 className="font-semibold text-md">{newsItem.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {newsItem.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="flex items-center text-blue-500 text-sm mt-2 hover:underline"
                  >
                    Read more <FaArrowRight className="ml-1" />
                  </a>
                </div>
              ))}
            </ul>
          </div>

          {/* Crypto News */}
          <div>
            <h4 className="font-semibold text-md mb-2">Crypto News</h4>
            <ul className="space-y-4">
              {[
                {
                  date: "August 3, 2023",
                  title: "Bitcoin reaches new all-time high",
                  tags: ["bitcoin", "crypto", "all-time high"],
                  description:
                    "Bitcoin has surged to a new all-time high, attracting attention from investors worldwide.",
                },
                {
                  date: "July 28, 2023",
                  title: "Ethereum upgrades lead to increased adoption",
                  tags: ["ethereum", "upgrades", "adoption"],
                  description:
                    "Recent upgrades to the Ethereum network have led to increased adoption and usage.",
                },
                {
                  date: "July 22, 2023",
                  title: "Regulatory scrutiny on crypto exchanges intensifies",
                  tags: ["regulation", "crypto exchanges"],
                  description:
                    "Regulatory bodies are increasing scrutiny on cryptocurrency exchanges, impacting market dynamics.",
                },
                {
                  date: "July 18, 2023",
                  title: "Altcoins show significant growth",
                  tags: ["altcoins", "growth"],
                  description:
                    "Several altcoins have shown significant growth, attracting new investors to the market.",
                },
              ].map((newsItem, index) => (
                <div key={index} className="border-b pb-4">
                  <p className="text-gray-500 text-sm">{newsItem.date}</p>
                  <h4 className="font-semibold text-md">{newsItem.title}</h4>
                  <p className="text-gray-600 text-sm">
                    {newsItem.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="flex items-center text-blue-500 text-sm mt-2 hover:underline"
                  >
                    Read more <FaArrowRight className="ml-1" />
                  </a>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
