import ChartComponent from "../components/chart/chartContentPage";
import { staticData } from "../components/chart/priceData";

const Content = () => {
  const myStocks = [
    { name: "Apple Inc.", quantity: 10, currentValue: "$1,116.90" },
    { name: "Twitter Inc.", quantity: 15, currentValue: "$993.21" },
    { name: "Netflix Inc.", quantity: 5, currentValue: "$161.72" },
    { name: "BS (Boostrap, Inc.)", quantity: 5, currentValue: "$30,500.15" },
    { name: "TTR (Twiter.com, Inc.)", quantity: 5, currentValue: "$15,526.01" },
    { name: "Netflix Inc.", quantity: 5, currentValue: "$161.72" },
    { name: "BS (Boostrap, Inc.)", quantity: 5, currentValue: "$30,500.15" },
    { name: "TTR (Twiter.com, Inc.)", quantity: 5, currentValue: "$15,526.01" },
    { name: "TTR (Twiter.com, Inc.)", quantity: 5, currentValue: "$15,526.01" },
    { name: "Netflix Inc.", quantity: 5, currentValue: "$161.72" },
    { name: "BS (Boostrap, Inc.)", quantity: 5, currentValue: "$30,500.15" },
    { name: "TTR (Twiter.com, Inc.)", quantity: 5, currentValue: "$15,526.01" },
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
    {
      id: 3,
      date: "2023-04-01",
      type: "Buy",
      amount: "$1,000",
      status: "Completed",
    },
    {
      id: 4,
      date: "2023-04-02",
      type: "Sell",
      amount: "$500",
      status: "Pending",
    },
    {
      id: 5,
      date: "2023-04-02",
      type: "Sell",
      amount: "$500",
      status: "Pending",
    },
    {
      id: 6,
      date: "2023-04-02",
      type: "Sell",
      amount: "$500",
      status: "Pending",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* row 1 Portfolio*/}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 justify-center items-center">
          <div className="flex w-52 justify-center items-center h-full bg-green-600 p-2 rounded-md text-white">
            Portfolio $34,000.00
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <span className="block font-semibold">Total Value</span>
            <span className="!text-primary">$8.89k</span>
          </div>
          <div>
            <span className="block font-semibold">Market Value</span>
            <span className="!text-warning">$15.9k</span>
          </div>
          <div>
            <span className="block font-semibold">Yield</span>
            <span className="!text-danger">3.4%</span>
          </div>
          <div>
            <span className="block font-semibold">Dividend</span>
            <span className="!text-info">$1.3k</span>
          </div>
          <div>
            <span className="block font-semibold">Gain</span>
            <span className="!text-success">$116</span>
          </div>
        </div>
      </div>
      {/* row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="shadow p-4">Total amount Invested</div>
        <div className="shadow p-4">No Of Investments</div>
        <div className="shadow p-4">Portfolio Value</div>
        <div className="shadow p-4">Returns Rate</div>
      </div>
      {/* row 3 Chart - My Stocks*/}
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
      {/* row 4 - Transaction History - Top Gainers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg p-4 flex flex-col items-center justify-center"
          >
            <span className="font-semibold text-lg">
              Top Gainer {index + 1}
            </span>
            <span className="text-sm text-gray-500">Company Name</span>
            <div className="mt-2">
              <span className="block text-primary font-semibold">$Price</span>
              <span className="block text-success">+Gain%</span>
            </div>
          </div>
        ))}
      </div>
      {/* row 5 Market Movers - */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
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
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.type}</td>
                  <td className="px-6 py-4">{transaction.amount}</td>
                  <td className="px-6 py-4">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex-1 shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Market Movers</h3>
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
              {transactionHistory.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td className="px-6 py-4">{transaction.date}</td>
                  <td className="px-6 py-4">{transaction.type}</td>
                  <td className="px-6 py-4">{transaction.amount}</td>
                  <td className="px-6 py-4">{transaction.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Content;
