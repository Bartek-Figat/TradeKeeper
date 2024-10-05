const PriceTicker = () => {
  const prices = [
    { label: "AAPL", price: "$175.00", change: "+1.5%" },
    { label: "EUR/USD", price: "$1.12", change: "-0.2%" },
    { label: "BTC", price: "$45,000", change: "+3.0%" },
    { label: "TSLA", price: "$720.00", change: "+2.1%" },
    { label: "GOOGL", price: "$2,850.00", change: "+0.5%" },
    { label: "AMZN", price: "$3,300.00", change: "-1.0%" },
    { label: "NFLX", price: "$550.00", change: "+4.0%" },
    { label: "MSFT", price: "$300.00", change: "+1.8%" },
    { label: "FB", price: "$350.00", change: "+2.5%" },
    { label: "TSM", price: "$120.00", change: "+3.2%" },
    { label: "NVDA", price: "$220.00", change: "+4.0%" },
    { label: "NFLX", price: "$550.00", change: "+4.0%" },
    { label: "DIS", price: "$180.00", change: "+1.0%" },
    { label: "V", price: "$250.00", change: "+2.0%" },
    { label: "PYPL", price: "$100.00", change: "-0.5%" },
    { label: "ADBE", price: "$500.00", change: "+3.5%" },
    { label: "NFLX", price: "$550.00", change: "+4.0%" },
    { label: "INTC", price: "$50.00", change: "-1.2%" },
    { label: "CSCO", price: "$55.00", change: "+0.8%" },
    { label: "ETH", price: "$3,200.00", change: "+5.0%" },
    { label: "LTC", price: "$150.00", change: "+2.0%" },
    { label: "XRP", price: "$0.75", change: "+1.5%" },
    { label: "GBP/USD", price: "$1.35", change: "+0.3%" },
    { label: "USD/JPY", price: "$110.00", change: "-0.1%" },
    { label: "AUD/USD", price: "$0.74", change: "+0.2%" },
    { label: "NFLX", price: "$550.00", change: "+4.0%" },
    { label: "DIS", price: "$180.00", change: "+1.0%" },
    { label: "NVDA", price: "$220.00", change: "+4.0%" },
    { label: "TSLA", price: "$720.00", change: "+2.1%" },
  ];

  return (
    <div className="bg-[#000000] rounded-md text-white p-2 overflow-hidden whitespace-nowrap w-full max-w-screen-lg mx-auto">
      <div className="flex animate-scroll">
        {prices.concat(prices).map((item, index) => (
          <div key={index} className="flex flex-col items-center mx-4">
            <span className="text-sm">{item.label}</span>
            <span className="font-bold">{item.price}</span>
            <span
              className={`text-xs ${
                item.change.startsWith("+") ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
