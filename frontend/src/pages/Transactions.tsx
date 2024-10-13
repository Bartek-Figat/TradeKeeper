import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Pagination from "rc-pagination";
import "react-datepicker/dist/react-datepicker.css";
import "rc-pagination/assets/index.css";

const TransactionTable: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [minWinRate, setMinWinRate] = useState<number | null>(null);
  const [maxWinRate, setMaxWinRate] = useState<number | null>(null);
  const [minProfitLoss, setMinProfitLoss] = useState<number | null>(null);
  const [maxProfitLoss, setMaxProfitLoss] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const transactions = [
    {
      symbol: "WIG",
      type: "Sell",
      status: "Canceled",
      quantity: 10,
      waitingTime: "1 day",
      return: 5,
      date: "2023-01-01",
      entryPrice: 150,
    },
    {
      symbol: "AAPL",
      type: "Buy",
      status: "Completed",
      quantity: 10,
      waitingTime: "1 day",
      return: 5,
      date: "2023-01-01",
      entryPrice: 150,
    },
    {
      symbol: "GOOGL",
      type: "Sell",
      status: "Completed",
      quantity: 5,
      waitingTime: "2 days",
      return: 3,
      date: "2023-01-02",
      entryPrice: 2800,
    },
    {
      symbol: "TSLA",
      type: "Buy",
      status: "Pending",
      quantity: 2,
      waitingTime: "3 days",
      return: 0,
      date: "2023-01-03",
      entryPrice: 700,
    },
    {
      symbol: "AMZN",
      type: "Sell",
      status: "Completed",
      quantity: 1,
      waitingTime: "1 week",
      return: 10,
      date: "2023-01-04",
      entryPrice: 3300,
    },
    {
      symbol: "MSFT",
      type: "Buy",
      status: "Completed",
      quantity: 8,
      waitingTime: "2 days",
      return: 4,
      date: "2023-01-05",
      entryPrice: 250,
    },
    {
      symbol: "FB",
      type: "Sell",
      status: "Pending",
      quantity: 3,
      waitingTime: "1 day",
      return: 0,
      date: "2023-01-06",
      entryPrice: 350,
    },
    {
      symbol: "NFLX",
      type: "Buy",
      status: "Completed",
      quantity: 4,
      waitingTime: "5 days",
      return: 6,
      date: "2023-01-07",
      entryPrice: 500,
    },
    {
      symbol: "NVDA",
      type: "Sell",
      status: "Completed",
      quantity: 6,
      waitingTime: "2 weeks",
      return: 8,
      date: "2023-01-08",
      entryPrice: 600,
    },
    {
      symbol: "TSM",
      type: "Buy",
      status: "Pending",
      quantity: 7,
      waitingTime: "1 day",
      return: 0,
      date: "2023-01-09",
      entryPrice: 100,
    },
    {
      symbol: "INTC",
      type: "Sell",
      status: "Completed",
      quantity: 9,
      waitingTime: "3 days",
      return: 2,
      date: "2023-01-10",
      entryPrice: 50,
    },
    // Additional transactions
    {
      symbol: "BTC/USD",
      type: "Buy",
      status: "Completed",
      quantity: 0.5,
      waitingTime: "1 day",
      return: 10,
      date: "2023-01-11",
      entryPrice: 40000,
    },
    {
      symbol: "ETH/USD",
      type: "Sell",
      status: "Pending",
      quantity: 1,
      waitingTime: "2 days",
      return: 5,
      date: "2023-01-12",
      entryPrice: 3000,
    },
    {
      symbol: "XRP/USD",
      type: "Buy",
      status: "Completed",
      quantity: 1000,
      waitingTime: "1 week",
      return: 15,
      date: "2023-01-13",
      entryPrice: 0.75,
    },
    {
      symbol: "EUR/USD",
      type: "Sell",
      status: "Canceled",
      quantity: 2000,
      waitingTime: "3 days",
      return: -5,
      date: "2023-01-14",
      entryPrice: 1.1,
    },
    {
      symbol: "GBP/USD",
      type: "Buy",
      status: "Completed",
      quantity: 1500,
      waitingTime: "2 days",
      return: 8,
      date: "2023-01-15",
      entryPrice: 1.3,
    },
    {
      symbol: "USD/JPY",
      type: "Sell",
      status: "Pending",
      quantity: 100000,
      waitingTime: "1 day",
      return: 2,
      date: "2023-01-16",
      entryPrice: 110,
    },
    {
      symbol: "LTC/USD",
      type: "Buy",
      status: "Completed",
      quantity: 2,
      waitingTime: "4 days",
      return: 12,
      date: "2023-01-17",
      entryPrice: 150,
    },
    {
      symbol: "ADA/USD",
      type: "Sell",
      status: "Completed",
      quantity: 500,
      waitingTime: "1 week",
      return: 20,
      date: "2023-01-18",
      entryPrice: 1.2,
    },
    {
      symbol: "DOT/USD",
      type: "Buy",
      status: "Pending",
      quantity: 100,
      waitingTime: "2 days",
      return: 5,
      date: "2023-01-19",
      entryPrice: 25,
    },
    {
      symbol: "LINK/USD",
      type: "Sell",
      status: "Completed",
      quantity: 50,
      waitingTime: "3 days",
      return: 10,
      date: "2023-01-20",
      entryPrice: 15,
    },
    {
      symbol: "BCH/USD",
      type: "Buy",
      status: "Canceled",
      quantity: 3,
      waitingTime: "1 day",
      return: 0,
      date: "2023-01-21",
      entryPrice: 500,
    },
    {
      symbol: "SOL/USD",
      type: "Sell",
      status: "Completed",
      quantity: 10,
      waitingTime: "2 days",
      return: 7,
      date: "2023-01-22",
      entryPrice: 100,
    },
    {
      symbol: "MATIC/USD",
      type: "Buy",
      status: "Pending",
      quantity: 200,
      waitingTime: "1 week",
      return: 3,
      date: "2023-01-23",
      entryPrice: 1.5,
    },
    {
      symbol: "DOGE/USD",
      type: "Sell",
      status: "Completed",
      quantity: 1000,
      waitingTime: "3 days",
      return: 5,
      date: "2023-01-24",
      entryPrice: 0.05,
    },
    {
      symbol: "SHIB/USD",
      type: "Buy",
      status: "Canceled",
      quantity: 500000,
      waitingTime: "1 day",
      return: 0,
      date: "2023-01-25",
      entryPrice: 0.00001,
    },
    {
      symbol: "XLM/USD",
      type: "Sell",
      status: "Completed",
      quantity: 300,
      waitingTime: "2 days",
      return: 4,
      date: "2023-01-26",
      entryPrice: 0.3,
    },
    {
      symbol: "TRX/USD",
      type: "Buy",
      status: "Pending",
      quantity: 1000,
      waitingTime: "1 week",
      return: 6,
      date: "2023-01-27",
      entryPrice: 0.1,
    },
    {
      symbol: "ZRX/USD",
      type: "Sell",
      status: "Completed",
      quantity: 200,
      waitingTime: "3 days",
      return: 8,
      date: "2023-01-28",
      entryPrice: 1.0,
    },
    {
      symbol: "BAT/USD",
      type: "Buy",
      status: "Canceled",
      quantity: 150,
      waitingTime: "1 day",
      return: 0,
      date: "2023-01-29",
      entryPrice: 0.5,
    },
    {
      symbol: "XEM/USD",
      type: "Sell",
      status: "Completed",
      quantity: 400,
      waitingTime: "2 days",
      return: 5,
      date: "2023-01-30",
      entryPrice: 0.2,
    },
    {
      symbol: "NANO/USD",
      type: "Buy",
      status: "Pending",
      quantity: 50,
      waitingTime: "1 week",
      return: 3,
      date: "2023-01-31",
      entryPrice: 2.0,
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Canceled":
        return "bg-red-200/60 text-red-800";
      case "Completed":
        return "bg-green-200/60 text-green-800";
      case "Pending":
        return "bg-yellow-200/60 text-yellow-800";
      default:
        return "";
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "Buy":
        return "bg-green-100 text-green-800";
      case "Sell":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  const typeOptions = [
    { value: "Buy", label: "Buy" },
    { value: "Sell", label: "Sell" },
  ];

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSymbol = transaction.symbol
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesType = selectedType ? transaction.type === selectedType : true;
    const matchesStatus = selectedStatus
      ? transaction.status === selectedStatus
      : true;
    const matchesDate = selectedDate
      ? transaction.date === selectedDate.toISOString().split("T")[0]
      : true;
    const matchesMinWinRate = minWinRate !== null ? transaction.return >= minWinRate : true;
    const matchesMaxWinRate = maxWinRate !== null ? transaction.return <= maxWinRate : true;
    const matchesMinProfitLoss = minProfitLoss !== null ? transaction.return >= minProfitLoss : true;
    const matchesMaxProfitLoss = maxProfitLoss !== null ? transaction.return <= maxProfitLoss : true;
    return (
      matchesSymbol &&
      matchesType &&
      matchesStatus &&
      matchesDate &&
      matchesMinWinRate &&
      matchesMaxWinRate &&
      matchesMinProfitLoss &&
      matchesMaxProfitLoss
    );
  });

  const clearFilters = () => {
    setFilter("");
    setSelectedType(null);
    setSelectedStatus(null);
    setSelectedDate(null);
    setMinWinRate(null);
    setMaxWinRate(null);
    setMinProfitLoss(null);
    setMaxProfitLoss(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-6xl">
        {/* Filter Header */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            type="text"
            placeholder="Filter by symbol..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <Select
            options={typeOptions}
            value={
              selectedType ? { value: selectedType, label: selectedType } : null
            }
            onChange={(newValue) =>
              setSelectedType(newValue ? newValue.value : null)
            }
            placeholder="Filter by type..."
            className="w-full"
          />
          <Select
            options={statusOptions}
            value={
              selectedStatus
                ? { value: selectedStatus, label: selectedStatus }
                : null
            }
            onChange={(newValue) =>
              setSelectedStatus(newValue ? newValue.value : null)
            }
            placeholder="Filter by status..."
            className="w-full"
          />
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Filter by date..."
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Min Win Rate"
            value={minWinRate !== null ? minWinRate : ""}
            onChange={(e) => setMinWinRate(e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Max Win Rate"
            value={maxWinRate !== null ? maxWinRate : ""}
            onChange={(e) => setMaxWinRate(e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Min Profit/Loss"
            value={minProfitLoss !== null ? minProfitLoss : ""}
            onChange={(e) => setMinProfitLoss(e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Max Profit/Loss"
            value={maxProfitLoss !== null ? maxProfitLoss : ""}
            onChange={(e) => setMaxProfitLoss(e.target.value ? parseFloat(e.target.value) : null)}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          onClick={clearFilters}
          className="mb-6 rounded-md bg-blue-600 p-2 text-white shadow-md hover:bg-blue-700"
        >
          Clear Filters
        </button>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow-md dark:bg-gray-700">
            {/* Table header */}
            <thead className="rounded-t-lg border-b border-gray-300 bg-gray-200 text-xs font-semibold uppercase text-gray-600 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-300">
              <tr>
                <th className="whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5">
                  <div className="text-left font-semibold">
                    Transaction Symbol
                  </div>
                </th>
                <th className="whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5">
                  <div className="text-left font-semibold">Purchase Type</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Status</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Quantity</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Waiting Time</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Return (%)</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">
                    Transaction Creation Date
                  </div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Entry Price</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="divide-y divide-gray-200 text-sm dark:divide-gray-600">
              {paginatedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className="transition duration-200" // Enhanced hover effect
                >
                  <td className="w-full max-w-0 border-b border-gray-200 px-4 py-3 sm:max-w-none lg:w-auto">
                    {/* Consistent padding and modern styling */}
                    <div className="flex items-center space-x-2">
                      <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
                        {transaction.symbol}
                      </span>
                      <span
                        className={`rounded-lg p-1.5 text-xs font-bold text-gray-800 dark:text-gray-200 lg:hidden ${getStatusStyles(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <dl className="mt-2 space-y-2 font-normal lg:hidden">
                      <div className="flex justify-between rounded-md bg-gray-100 p-2 shadow-sm">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <dt className="text-gray-600">Quantity:</dt>
                            <dd className="ml-1 text-gray-700">
                              {transaction.quantity}
                            </dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="text-gray-600">Waiting Time:</dt>
                            <dd className="ml-1 text-gray-700">
                              {transaction.waitingTime}
                            </dd>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between rounded-md bg-gray-100 p-2 shadow-sm">
                        <div className="flex space-x-4">
                          <div className="flex items-center">
                            <dt className="text-gray-600">Return:</dt>
                            <dd className="ml-1 text-gray-700">{`${transaction.return}%`}</dd>
                          </div>
                          <div className="flex items-center">
                            <dt className="text-gray-600">Entry Price:</dt>
                            <dd className="ml-1 text-gray-700">
                              ${transaction.entryPrice}
                            </dd>
                          </div>
                        </div>
                      </div>
                      <button className="rounded-md bg-blue-100 p-2 text-blue-600 shadow-sm hover:bg-blue-100 lg:hidden">
                        View Details
                      </button>
                    </dl>
                  </td>
                  <td className="w-full px-4 py-3 lg:table-cell lg:w-auto">
                    <span
                      className={`rounded p-1.5 text-xs font-bold ${getTypeStyles(transaction.type)}`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <span
                      className={`rounded-lg p-1.5 text-gray-800 dark:text-gray-200 ${getStatusStyles(transaction.status)}`}
                    >
                      {transaction.status}
                    </span>{" "}
                    {/* Added span for consistent styling */}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {transaction.quantity}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {transaction.waitingTime}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {transaction.return}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {transaction.date}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    {transaction.entryPrice}
                  </td>
                  <td className="hidden px-4 py-3 lg:table-cell">
                    <button className="rounded-md bg-blue-100 p-2 text-blue-600 shadow-sm hover:bg-blue-100">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={filteredTransactions.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          className="mt-4"
          showLessItems
        />
      </div>
      {/* Mobile View */}
    </div>
  );
};

export default TransactionTable;
