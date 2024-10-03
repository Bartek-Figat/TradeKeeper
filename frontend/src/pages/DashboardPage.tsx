import ChartComponent from "../components/chart/chartContentPage";
import { staticData } from "../components/chart/priceData";

const DashboardPage = () => {
  const myStocks = [
    { name: "Apple Inc.", quantity: 10, currentValue: "$1,116.90" },
    { name: "Twitter Inc.", quantity: 15, currentValue: "$993.21" },
    { name: "Netflix Inc.", quantity: 5, currentValue: "$161.72" },
    { name: "BS (Bootstrap, Inc.)", quantity: 5, currentValue: "$30,500.15" },
    { name: "TTR (Twitter.com, Inc.)", quantity: 5, currentValue: "$15,526.01" },
  ];

  const transactionHistory = [
    { id: 1, date: "2023-04-01", type: "Buy", amount: "$1,000", status: "Completed" },
    { id: 2, date: "2023-04-02", type: "Sell", amount: "$500", status: "Pending" },
  ];

  const topGainers = [
    { name: "Company A", price: "$120.00", gain: "+5%" },
    { name: "Company B", price: "$98.50", gain: "+3.2%" },
    { name: "Company C", price: "$150.75", gain: "+4.5%" },
    { name: "Company D", price: "$200.00", gain: "+6.1%" },
    { name: "Company E", price: "$175.25", gain: "+2.8%" },
    { name: "Company F", price: "$130.00", gain: "+3.9%" },
  ];

  const renderTable = (data: typeof transactionHistory) => (
    <table className="min-w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Date</th>
          <th scope="col" className="px-6 py-3">Type</th>
          <th scope="col" className="px-6 py-3">Amount</th>
          <th scope="col" className="px-6 py-3">Status</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((transaction) => (
          <tr key={transaction.id} className="border-b">
            <td className="px-6 py-4">{transaction.date}</td>
            <td className="px-6 py-4">{transaction.type}</td>
            <td className="px-6 py-4">{transaction.amount}</td>
            <td className="px-6 py-4">{transaction.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Portfolio Overview */}
      <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1 flex justify-center items-center">
        <div className="flex w-52 justify-center items-center h-full bg-green-600 p-4 rounded-md text-white shadow-md">
          <span className="text-lg font-bold">Portfolio</span>
          <span className="text-xl font-semibold ml-2">$34,000.00</span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        {[
          { label: "Total Value", value: "$8.89k", color: "text-primary" },
          { label: "Market Value", value: "$15.9k", color: "text-warning" },
          { label: "Yield", value: "3.4%", color: "text-danger" },
          { label: "Dividend", value: "$1.3k", color: "text-info" },
          { label: "Gain", value: "$116", color: "text-success" },
        ].map((item, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
            <span className="block font-semibold text-gray-700">{item.label}</span>
            <span className={`block ${item.color} text-lg font-bold`}>{item.value}</span>
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
        <div key={index} className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
          <span className="block font-semibold text-gray-700">{item.label}</span>
          <span className="block text-primary text-lg font-bold">{item.value}</span>
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
              <div key={index} className="flex justify-between items-center p-2 rounded-md text-color-[#333]">
                <div>
                  <h4 className="font-semibold text-blue-600">{stock.name}</h4>
                </div>
                <p className="text-sm text-gray-600">{stock.currentValue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Gainers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
  {topGainers.map((gainer, index) => (
    <div key={index} className="shadow-lg rounded-lg p-4 flex flex-col items-center justify-center bg-white">
      <span className="font-semibold text-lg">{gainer.name}</span>
      <span className="text-sm text-gray-500">Top Gainer {index + 1}</span>
      <div className="mt-2">
        <span className="block text-primary font-semibold">{gainer.price}</span>
        <span className="block text-success">{gainer.gain}</span>
      </div>
    </div>
  ))}
</div>
      {/* Transaction History and Market Movers */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Transaction History</h3>
          {renderTable(transactionHistory)}
        </div>
        <div className="flex-1 shadow-lg p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Market Movers</h3>
          {renderTable(transactionHistory)}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;