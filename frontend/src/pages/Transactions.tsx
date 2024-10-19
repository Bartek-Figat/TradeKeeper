import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "rc-pagination";
import { useFilterTradesQuery } from "../services/tradeApi";
import { useSearchParams } from "react-router-dom";
import { Transaction } from "../services/type";

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("symbol") || "");
  const [selectedType, setSelectedType] = useState<string | null>(
    searchParams.get("tradeType") || null,
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(
    searchParams.get("tradeOutcome") || null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params: Record<string, string | number | null> = {
      symbol: filter.toUpperCase(),
      tradeType: selectedType,
      tradeOutcome: selectedStatus,
    };

    // Remove null values from params
    const paramsArray = Object.entries(params)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== null)
      .map(([key, value]) => [key, String(value)] as [string, string]);

    console.log(paramsArray);
    setSearchParams(paramsArray);
  };

  // Convert URLSearchParams to a plain object
  const filterObject = Object.fromEntries(searchParams.entries());

  console.log("FilterObject", filterObject);

  const {
    data: queryData = { tradesWithMetrics: [], dataLength: 0 },
    isLoading,
    error,
  } = useFilterTradesQuery({
    page: currentPage,
    ...filterObject,
  });

  console.log(searchParams);

  useEffect(() => {
    if (queryData) {
      setTotalPages(queryData.dataLength);
      setTransactions(queryData.tradesWithMetrics);
    }
  }, [queryData]);

  const clearFilters = () => {
    setFilter("");
    setSelectedType(null);
    setSelectedStatus(null);
    setSearchParams({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
    <section
      className={`container m-8 mx-auto w-full rounded-md px-14 ${darkMode ? "" : ""}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="">
            <div className="flex items-center gap-x-3">
              <h2
                className={`text-lg font-medium ${darkMode ? "text-white" : "text-[#000080]"}`}
              >
                Transactions per page:
              </h2>
              <span
                className={`px-3 py-1 text-xs ${darkMode ? "bg-gray-800 text-blue-400" : "bg-blue-100 text-blue-600"} rounded-full shadow-md`}
              >
                {transactions.length} records
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-x-3">
            <button
              type="button"
              onClick={clearFilters}
              className={`flex w-1/2 items-center justify-center gap-x-2 rounded-lg border px-5 py-2 text-sm transition-colors duration-200 sm:w-auto ${darkMode ? "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800" : "bg-white text-gray-700 hover:bg-gray-100"} shadow-lg hover:shadow-xl`}
            >
              Clear Filters
            </button>
            <button
              type="submit"
              className={`flex w-1/2 items-center justify-center gap-x-2 rounded-lg border px-5 py-2 text-sm transition-colors duration-200 sm:w-auto ${darkMode ? "border-gray-700 bg-gray-900 text-gray-200 hover:bg-gray-800" : "bg-white text-gray-700 hover:bg-gray-100"} shadow-lg hover:shadow-xl`}
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Symbol Input and Trade Type Dropdown */}
        <div className="mt-6 md:flex md:items-center md:justify-between">
          <div className="flex items-center gap-x-3">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Symbol"
              className={`w-40 rounded-lg border px-3 py-2 ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-gray-50 text-[#000080]"} transform shadow-md transition duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500`}
            />
            <select
              value={selectedType || ""}
              onChange={(e) => setSelectedType(e.target.value || null)}
              className={`w-40 rounded-lg border px-3 py-2 pr-8 ${darkMode ? "border-gray-700 bg-gray-800 text-white" : "border-gray-300 bg-gray-50 text-[#000080]"} transform shadow-md transition duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-blue-500`}
            >
              <option value="">Select Trade Type</option>
              <option value="stock">Stock</option>
              <option value="forex">Forex</option>
              <option value="crypto">Crypto</option>
              <option value="option">Option</option>
              <option value="crypto spot">Crypto Spot</option>
            </select>
          </div>
        </div>
      </form>

      {/* Table and Pagination */}
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div
              className={`overflow-hidden border ${darkMode ? "border-gray-700" : "border-gray-200"} md:rounded-lg`}
            >
              <table
                className={`min-w-full divide-y ${darkMode ? "divide-gray-700 bg-gray-900" : "divide-gray-200 bg-white"}`}
              >
                <thead
                  className={`bg-gray-50 ${darkMode ? "dark:bg-gray-800" : ""}`}
                >
                  <tr>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Symbol
                    </th>
                    <th
                      scope="col"
                      className={`px-12 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Trade Type
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Outcome
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Entry Price
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Exit Price
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Profit/Loss
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Entry Date
                    </th>
                    <th
                      scope="col"
                      className={`px-4 py-3.5 text-left text-sm font-normal rtl:text-right ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Exit Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map(
                    (transaction: Transaction, index: number) => {
                      const formattedEntryDate = new Date(
                        transaction.entryDate,
                      ).toLocaleDateString();
                      const formattedExitDate = new Date(
                        transaction.exitDate,
                      ).toLocaleDateString();

                      return (
                        <tr key={index}>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm font-medium ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.symbol}
                          </td>
                          <td
                            className={`whitespace-nowrap px-12 py-4 text-sm font-medium ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.tradeType}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.tradeOutcome}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.quantity}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.entryPrice}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.exitPrice}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {transaction.profitLoss}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {formattedEntryDate}
                          </td>
                          <td
                            className={`whitespace-nowrap px-4 py-4 text-sm ${darkMode ? "text-white" : "text-[#000080]"}`}
                          >
                            {formattedExitDate}
                          </td>
                        </tr>
                      );
                    },
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 mt-6 sm:flex sm:items-center sm:justify-between">
        <div
          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          Page{" "}
          <span
            className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-700"}`}
          >
            {currentPage} of {Math.ceil(totalPages / pageSize)}
          </span>
        </div>

        <Pagination
          className="pagination-data"
          current={currentPage}
          total={totalPages}
          pageSize={pageSize}
          onChange={handlePageChange}
          showLessItems
        />
      </div>
    </section>
  );
};

export default TransactionTable;
