import Modal from "./Modal";
import PortfolioOverview from "./PortfolioOverview";
import PriceTicker from "./PriceTicker";
import { FaArrowRight } from "react-icons/fa";
import ChartComponent from "../components/chart/chartContentPage";
import { staticData } from "../components/chart/priceData";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

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

  const transactionHistory: Transaction[] = [
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
    {
      id: 3,
      date: "2023-04-01",
      type: "Buy",
      amount: "$1,000",
      status: "Completed",
    },
    {
      id: 4,
      date: "2021-04-02",
      type: "Sell",
      amount: "$200",
      status: "Cancel",
    },
    {
      id: 5,
      date: "2020-04-01",
      type: "Buy",
      amount: "$5,000",
      status: "Completed",
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

  const openModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <div
        className={`flex w-full flex-col justify-center gap-6 p-10 ${darkMode ? "dark:bg-[#252729]" : "bg-[#f9f9f9]"}`}
      >
        <PriceTicker />
        <PortfolioOverview />

        <div className="grid grid-cols-12 gap-6">
          {[
            { label: "Total Amount Invested", value: "$50,000" },
            { label: "Number of Investments", value: "25" },
            { label: "Portfolio Value", value: "$34,000" },
            { label: "Returns Rate", value: "7.5%" },
          ].map((item, index) => (
            <div
              key={index}
              className={`col-span-12 rounded p-4 shadow ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"} sm:col-span-6 lg:col-span-3`}
            >
              <h2
                className={`text-xl font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
              >
                {item.label}
              </h2>
              <p
                className={`text-gray-600 ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            className={`relative rounded-md p-1 ${darkMode ? "bg-[#1a1c1e]" : "bg-white"} p-2 md:col-span-2 lg:col-span-2`}
          >
            <ChartComponent data={staticData} />
          </div>
          <div
            className={`rounded-lg p-2 shadow-md ${darkMode ? "bg-[#1a1c1e]" : "bg-white"}`}
          >
            <h3
              className={`mb-2 text-lg font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
            >
              My Stocks
            </h3>
            <div className="space-y-2">
              {myStocks.map((stock, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between rounded-md p-2 ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                >
                  <div>
                    <h4
                      className={`font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                    >
                      {stock.name}
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                  >
                    {stock.currentValue}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row">
          <div
            className={`custom-scrollbar flex-1 rounded-lg p-4 shadow-lg ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"}`}
          >
            <h3
              className={`mb-4 text-lg font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
            >
              Transaction History
            </h3>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <table
                  className={`min-w-full text-left text-sm ${darkMode ? "text-neutral-300" : "text-[#000080]"}`}
                >
                  <thead
                    className={`text-xs uppercase ${darkMode ? "bg-[#2a2c2e] text-neutral-400" : "bg-gray-50 text-[#000080]"}`}
                  >
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
                      <th scope="col" className="px-6 py-3"></th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${darkMode ? "divide-neutral-700 bg-[#1a1c1e]" : "divide-gray-200 bg-white"}`}
                  >
                    {transactionHistory.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className={`cursor-pointer border-b ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                      >
                        <td className="px-6 py-4">{transaction.date}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2 py-1 text-white ${
                              transaction.type === "Buy"
                                ? "bg-[#2aa0698f]"
                                : transaction.type === "Sell"
                                  ? "bg-[#a02a2ab0]"
                                  : "bg-gray-500"
                            }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">{transaction.amount}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`rounded-full px-2 py-1 text-white ${
                              transaction.status === "Completed"
                                ? "bg-green-500"
                                : transaction.status === "Pending"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                            }`}
                          >
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                            onClick={() => openModal(transaction)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            transaction={selectedTransaction}
          />

          <div
            className={`flex-1 rounded-lg p-4 shadow-lg ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"}`}
          >
            <h3
              className={`mb-4 text-lg font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
            >
              Recent Transactions
            </h3>
            <ul className="space-y-2">
              {transactionHistory.map((transaction) => (
                <li
                  key={transaction.id}
                  className={`flex items-center justify-between border-b p-2 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                >
                  <div>
                    <span
                      className={`block text-sm font-semibold ${
                        transaction.type === "Buy"
                          ? "text-green-500"
                          : transaction.type === "Sell"
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {transaction.type}
                    </span>
                    <span
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {transaction.date}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                  >
                    {transaction.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 md:flex-row">
          <div
            className={`flex-1 rounded-lg p-4 shadow-lg ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"}`}
          >
            <h3
              className={`mb-4 text-lg font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
            >
              Market Movers
            </h3>
            <ul className="space-y-2">
              {topGainers.map((gainer, index) => (
                <li
                  key={index}
                  className={`flex items-center justify-between border-b p-2 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                >
                  <div>
                    <span
                      className={`block font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                    >
                      {gainer.name}
                    </span>
                    <span
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {gainer.type}
                    </span>
                  </div>
                  <span
                    className={`font-bold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                  >
                    {gainer.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`rounded-lg p-4 shadow-lg ${darkMode ? "bg-[#1a1c1e] text-neutral-300" : "bg-white text-[#000080]"}`}
        >
          <div className="flex flex-wrap gap-4">
            <div className="min-w-[250px] flex-1">
              <h4
                className={`text-md mb-2 font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
              >
                Stock News
              </h4>
              <ul className="space-y-4">
                {[
                  {
                    date: "August 5, 2023",
                    title: "Market hits record high amid economic recovery",
                    tags: ["stocks", "market", "economy"],
                    description:
                      "The stock market reached a new high as investors remain optimistic about economic recovery.",
                  },
                  // ... other news items ...
                ].map((newsItem, index) => (
                  <div
                    key={index}
                    className={`border-b pb-4 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                  >
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.date}
                    </p>
                    <h4
                      className={`text-md font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                    >
                      {newsItem.title}
                    </h4>
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newsItem.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`rounded-full px-2 py-1 text-xs font-medium ${darkMode ? "bg-neutral-600 text-neutral-300" : "bg-gray-200 text-[#000080]"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className={`mt-2 flex items-center text-sm hover:underline ${darkMode ? "dark:text-blue-400" : "text-blue-500"}`}
                    >
                      Read more <FaArrowRight className="ml-1" />
                    </a>
                  </div>
                ))}
              </ul>
            </div>

            {/* Forex News */}
            <div className="min-w-[250px] flex-1">
              <h4
                className={`text-md mb-2 font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
              >
                Forex News
              </h4>
              <ul className="space-y-4">
                {[
                  {
                    date: "August 4, 2023",
                    title: "Dollar strengthens against major currencies",
                    tags: ["forex", "dollar", "currencies"],
                    description:
                      "The US dollar has gained strength against major currencies amid economic data releases.",
                  },
                  // ... other news items ...
                ].map((newsItem, index) => (
                  <div
                    key={index}
                    className={`border-b pb-4 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                  >
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.date}
                    </p>
                    <h4
                      className={`text-md font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                    >
                      {newsItem.title}
                    </h4>
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newsItem.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`rounded-full px-2 py-1 text-xs font-medium ${darkMode ? "bg-neutral-600 text-neutral-300" : "bg-gray-200 text-[#000080]"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className={`mt-2 flex items-center text-sm hover:underline ${darkMode ? "dark:text-blue-400" : "text-blue-500"}`}
                    >
                      Read more <FaArrowRight className="ml-1" />
                    </a>
                  </div>
                ))}
              </ul>
            </div>

            {/* Crypto News */}
            <div className="min-w-[250px] flex-1">
              <h4
                className={`text-md mb-2 font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
              >
                Crypto News
              </h4>
              <ul className="space-y-4">
                {[
                  {
                    date: "August 3, 2023",
                    title: "Bitcoin reaches new all-time high",
                    tags: ["bitcoin", "crypto", "all-time high"],
                    description:
                      "Bitcoin has surged to a new all-time high, attracting attention from investors worldwide.",
                  },
                  // ... other news items ...
                ].map((newsItem, index) => (
                  <div
                    key={index}
                    className={`border-b pb-4 ${darkMode ? "dark:border-neutral-700" : "border-gray-200"}`}
                  >
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.date}
                    </p>
                    <h4
                      className={`text-md font-semibold ${darkMode ? "dark:text-neutral-300" : "text-[#000080]"}`}
                    >
                      {newsItem.title}
                    </h4>
                    <p
                      className={`text-sm ${darkMode ? "dark:text-neutral-400" : "text-[#000080]"}`}
                    >
                      {newsItem.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newsItem.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`rounded-full px-2 py-1 text-xs font-medium ${darkMode ? "bg-neutral-600 text-neutral-300" : "bg-gray-200 text-[#000080]"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#"
                      className={`mt-2 flex items-center text-sm hover:underline ${darkMode ? "dark:text-blue-400" : "text-blue-500"}`}
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
    </div>
  );
};

export default DashboardPage;
