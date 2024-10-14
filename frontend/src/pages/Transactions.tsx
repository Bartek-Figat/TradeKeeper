import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Pagination from "rc-pagination";
import "react-datepicker/dist/react-datepicker.css";
import "rc-pagination/assets/index.css";
import { useGetAllTradesQuery } from "../services/tradeApi"; // Adjust the import path as necessary

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

  // Fetch transactions using the hook
  const { data: transactions = [], isLoading, error } = useGetAllTradesQuery();

  console.log("transactions", transactions);

  const typeOptions = [
    { value: "stock", label: "Stock" },
    { value: "forex", label: "Forex" },
    { value: "crypto", label: "Crypto" },
    { value: "crypto spot", label: "Crypto Spot" },
  ];

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSymbol = transaction.symbol
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchesType = selectedType
      ? transaction.tradeType === selectedType
      : true;
    const matchesStatus = selectedStatus
      ? transaction.tradeOutcome === selectedStatus
      : true;
    const matchesDate = selectedDate
      ? new Date(transaction.entryDate).toISOString().split("T")[0] ===
        selectedDate.toISOString().split("T")[0]
      : true;
    const matchesMinWinRate =
      minWinRate !== null && transaction.profitLoss !== undefined
        ? transaction.profitLoss >= minWinRate
        : true;
    const matchesMaxWinRate =
      maxWinRate !== null && transaction.profitLoss !== undefined
        ? transaction.profitLoss <= maxWinRate
        : true;
    const matchesMinProfitLoss =
      minProfitLoss !== null && transaction.profitLoss !== undefined
        ? transaction.profitLoss >= minProfitLoss
        : true;
    const matchesMaxProfitLoss =
      maxProfitLoss !== null && transaction.profitLoss !== undefined
        ? transaction.profitLoss <= maxProfitLoss
        : true;
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
    currentPage * pageSize,
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

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
            onChange={(e) =>
              setMinWinRate(e.target.value ? parseFloat(e.target.value) : null)
            }
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Max Win Rate"
            value={maxWinRate !== null ? maxWinRate : ""}
            onChange={(e) =>
              setMaxWinRate(e.target.value ? parseFloat(e.target.value) : null)
            }
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Min Profit/Loss"
            value={minProfitLoss !== null ? minProfitLoss : ""}
            onChange={(e) =>
              setMinProfitLoss(
                e.target.value ? parseFloat(e.target.value) : null,
              )
            }
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
          <input
            type="number"
            placeholder="Max Profit/Loss"
            value={maxProfitLoss !== null ? maxProfitLoss : ""}
            onChange={(e) =>
              setMaxProfitLoss(
                e.target.value ? parseFloat(e.target.value) : null,
              )
            }
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
                  <div className="text-left font-semibold">Symbol</div>
                </th>
                <th className="whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5">
                  <div className="text-left font-semibold">Trade Type</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Outcome</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Quantity</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Entry Price</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Exit Price</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Profit/Loss</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Entry Date</div>
                </th>
                <th className="hidden whitespace-nowrap px-2 py-4 first:pl-5 last:pr-5 lg:table-cell">
                  <div className="text-left font-semibold">Exit Date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="divide-y divide-gray-200 text-sm dark:divide-gray-600">
  {paginatedTransactions.map((transaction, index) => {
    const formattedEntryDate = new Date(transaction.entryDate).toLocaleDateString();
    const formattedExitDate = new Date(transaction.exitDate).toLocaleDateString();

    return (
      <tr key={index} className="transition duration-200">
        <td className="w-full max-w-0 border-b border-gray-200 px-4 py-3 sm:max-w-none lg:w-auto">
          <div className="flex items-center space-x-2">
            <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-bold text-white">
              {transaction.symbol}
            </span>
          </div>
        </td>
        <td className="w-full px-4 py-3 lg:table-cell lg:w-auto">
          <span className="rounded p-1.5 text-xs font-bold">
            {transaction.tradeType}
          </span>
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          <span className="rounded-lg p-1.5 text-gray-800 dark:text-gray-200">
            {transaction.tradeOutcome}
          </span>
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {transaction.quantity}
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {transaction.entryPrice}
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {transaction.exitPrice}
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {transaction.profitLoss}
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {formattedEntryDate}
        </td>
        <td className="hidden px-4 py-3 lg:table-cell">
          {formattedExitDate}
        </td>
      </tr>
    );
  })}
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
    </div>
  );
};

export default TransactionTable;
