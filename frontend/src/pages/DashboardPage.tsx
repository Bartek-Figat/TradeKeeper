import Modal from "./Modal";
import PortfolioOverview from "./PortfolioOverview";
import PriceTicker from "./PriceTicker";
import { FaArrowRight } from "react-icons/fa";
import ChartComponent from "../components/chart/chartContentPage";
import { staticData } from "../components/chart/priceData";
import { useState } from "react";

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
    <div className="flex w-full flex-col justify-center gap-6 p-10">
      <PriceTicker />
      {/* Portfolio Overview */}
      <PortfolioOverview />

      {/* Investment Summary */}
      <div className="grid grid-cols-12 gap-6">
        {[
          { label: "Total Amount Invested", value: "$50,000" },
          { label: "Number of Investments", value: "25" },
          { label: "Portfolio Value", value: "$34,000" },
          { label: "Returns Rate", value: "7.5%" },
        ].map((item, index) => (
          <div
            key={index}
            className="col-span-12 rounded bg-white p-4 shadow sm:col-span-6 lg:col-span-3"
          >
            <h2 className="text-xl font-semibold">{item.label}</h2>
            <p className="text-gray-600">{item.value}</p>
          </div>
        ))}
      </div>
      {/* Chart and My Stocks */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-2 shadow-md md:col-span-2 lg:col-span-2">
          <ChartComponent data={staticData} />
        </div>
        <div className="rounded-lg bg-white p-2 shadow-md">
          <h3 className="mb-2 text-lg font-semibold">My Stocks</h3>
          <div className="space-y-2">
            {myStocks.map((stock, index) => (
              <div
                key={index}
                className="text-color-[#333] flex items-center justify-between rounded-md p-2"
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

      {/* Transaction History  */}
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="custom-scrollbar flex-1 rounded-lg bg-white p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Transaction History</h3>
          <div className="flex flex-col">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactionHistory.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="cursor-pointer border-b"
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

        {/* Recent Transactions */}
        <div className="flex-1 rounded-lg bg-white p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
          <ul className="space-y-2">
            {transactionHistory.map((transaction) => (
              <li
                key={transaction.id}
                className="flex items-center justify-between border-b p-2"
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
                  <span className="text-sm text-gray-500">
                    {transaction.date}
                  </span>
                </div>
                <span className="font-bold text-gray-800">
                  {transaction.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <div className="flex-1 rounded-lg bg-white p-4 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold">Market Movers</h3>
          <ul className="space-y-2">
            {topGainers.map((gainer, index) => (
              <li
                key={index}
                className="flex items-center justify-between border-b p-2"
              >
                <div>
                  <span className="block font-semibold text-gray-700">
                    {gainer.name}
                  </span>
                  <span className="text-sm text-gray-500">{gainer.type}</span>
                </div>
                <span className="font-bold text-gray-800">{gainer.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Recent News Section */}
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <div className="flex flex-wrap gap-4">
          {/* Stock News */}
          <div className="min-w-[250px] flex-1">
            <h4 className="text-md mb-2 font-semibold">Stock News</h4>
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
                  <p className="text-sm text-gray-500">{newsItem.date}</p>
                  <h4 className="text-md font-semibold">{newsItem.title}</h4>
                  <p className="text-sm text-gray-600">
                    {newsItem.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-2 flex items-center text-sm text-blue-500 hover:underline"
                  >
                    Read more <FaArrowRight className="ml-1" />
                  </a>
                </div>
              ))}
            </ul>
          </div>

          {/* Forex News */}
          <div className="min-w-[250px] flex-1">
            <h4 className="text-md mb-2 font-semibold">Forex News</h4>
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
                  <p className="text-sm text-gray-500">{newsItem.date}</p>
                  <h4 className="text-md font-semibold">{newsItem.title}</h4>
                  <p className="text-sm text-gray-600">
                    {newsItem.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-2 flex items-center text-sm text-blue-500 hover:underline"
                  >
                    Read more <FaArrowRight className="ml-1" />
                  </a>
                </div>
              ))}
            </ul>
          </div>

          {/* Crypto News */}
          <div className="min-w-[250px] flex-1">
            <h4 className="text-md mb-2 font-semibold">Crypto News</h4>
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
                  <p className="text-sm text-gray-500">{newsItem.date}</p>
                  <h4 className="text-md font-semibold">{newsItem.title}</h4>
                  <p className="text-sm text-gray-600">
                    {newsItem.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="mt-2 flex items-center text-sm text-blue-500 hover:underline"
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
