import React, { useState } from "react";
// import Select from "react-select";
import DatePicker from "react-datepicker";
import Pagination from "rc-pagination";
import "react-datepicker/dist/react-datepicker.css";
import "rc-pagination/assets/index.css";
import { useFilterTradesQuery } from "../services/tradeApi"; // Adjust the import path as necessary

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
  const pageSize = 10;

  // Fetch filtered transactions using the hook
  const {
    data: transactions = [],
    isLoading,
    error,
  } = useFilterTradesQuery({
    filter: {
      symbol: filter,
      tradeType: selectedType,
      tradeOutcome: selectedStatus,
      entryDate: selectedDate
        ? selectedDate.toISOString().split("T")[0]
        : undefined,
      minWinRate,
      maxWinRate,
      minProfitLoss,
      maxProfitLoss,
    },
    page: currentPage,
    limit: pageSize,
  });

  // const typeOptions = [
  //   { value: "Buy", label: "Buy" },
  //   { value: "Sell", label: "Sell" },
  // ];

  // const statusOptions = [
  //   { value: "Pending", label: "Pending" },
  //   { value: "Completed", label: "Completed" },
  // ];

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <section className="container px-4 mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">Transactions</h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {transactions.length} records
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Filter and view transaction records.
          </p>
        </div>
        <div className="flex items-center mt-4 gap-x-3">
          <button
            onClick={clearFilters}
            className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="mt-6 md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-x-3">
          {/* <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === selectedType)}
            onChange={(option) => setSelectedType(option?.value || null)}
            placeholder="Select Type"
            className="w-40"
          />
          <Select
            options={statusOptions}
            value={statusOptions.find(option => option.value === selectedStatus)}
            onChange={(option) => setSelectedStatus(option?.value || null)}
            placeholder="Select Status"
            className="w-40"
          /> */}
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            placeholderText="Select Date"
            className="w-40 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={minWinRate || ""}
            onChange={(e) => setMinWinRate(e.target.value ? parseFloat(e.target.value) : null)}
            placeholder="Min Win Rate"
            className="w-40 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={maxWinRate || ""}
            onChange={(e) => setMaxWinRate(e.target.value ? parseFloat(e.target.value) : null)}
            placeholder="Max Win Rate"
            className="w-40 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={minProfitLoss || ""}
            onChange={(e) => setMinProfitLoss(e.target.value ? parseFloat(e.target.value) : null)}
            placeholder="Min Profit/Loss"
            className="w-40 px-2 py-1 border rounded"
          />
          <input
            type="number"
            value={maxProfitLoss || ""}
            onChange={(e) => setMaxProfitLoss(e.target.value ? parseFloat(e.target.value) : null)}
            placeholder="Max Profit/Loss"
            className="w-40 px-2 py-1 border rounded"
          />
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Symbol
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Trade Type
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Outcome
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Entry Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Exit Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Profit/Loss
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Exit Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {transactions.map((transaction, index) => {
                    const formattedEntryDate = new Date(
                      transaction.entryDate
                    ).toLocaleDateString();
                    const formattedExitDate = new Date(
                      transaction.exitDate
                    ).toLocaleDateString();

                    return (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          {transaction.symbol}
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          {transaction.tradeType}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {transaction.tradeOutcome}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {transaction.quantity}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {transaction.entryPrice}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {transaction.exitPrice}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {transaction.profitLoss}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {formattedEntryDate}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          {formattedExitDate}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:flex sm:items-center sm:justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Page <span className="font-medium text-gray-700 dark:text-gray-100">{currentPage} of {Math.ceil(transactions.length / pageSize)}</span>
        </div>

        <Pagination
          current={currentPage}
          total={transactions.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          className="flex items-center mt-4 gap-x-4 sm:mt-0"
        />
      </div>
    </section>
  );
};

export default TransactionTable;