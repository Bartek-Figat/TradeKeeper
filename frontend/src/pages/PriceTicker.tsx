const PriceTicker = () => {
  const prices = [
    {
      symbol: "ETH",
      entryPrice: 2590.8,
      exitPrice: 10000,
      gainPercentage: "100.00",
    },
    {
      symbol: "TMC",
      entryPrice: 0.211,
      exitPrice: 0.98,
      gainPercentage: "100.00",
    },
    {
      symbol: "ABB",
      entryPrice: 1.28,
      exitPrice: 1.5,
      gainPercentage: "17.19",
    },
    {
      symbol: "SYM590",
      entryPrice: 46.75,
      exitPrice: 93.24,
      gainPercentage: "99.44",
    },
    {
      symbol: "SYM518",
      entryPrice: 94.09,
      exitPrice: 58.93,
      gainPercentage: "-37.37",
    },
    {
      symbol: "SYM91",
      entryPrice: 98.55,
      exitPrice: 27.26,
      gainPercentage: "-72.34",
    },
    {
      symbol: "SYM601",
      entryPrice: 21.65,
      exitPrice: 40.39,
      gainPercentage: "86.56",
    },
    {
      symbol: "SYM523",
      entryPrice: 13.09,
      exitPrice: 24.8,
      gainPercentage: "89.46",
    },
    {
      symbol: "SYM643",
      entryPrice: 81.2,
      exitPrice: 89.56,
      gainPercentage: "10.30",
    },
    {
      symbol: "SYM225",
      entryPrice: 50.34,
      exitPrice: 19.97,
      gainPercentage: "-60.33",
    },
    {
      symbol: "SYM477",
      entryPrice: 59.4,
      exitPrice: 89.41,
      gainPercentage: "50.52",
    },
    {
      symbol: "SYM625",
      entryPrice: 81.95,
      exitPrice: 57.48,
      gainPercentage: "-29.86",
    },
    {
      symbol: "SYM912",
      entryPrice: 64.32,
      exitPrice: 61.69,
      gainPercentage: "-4.09",
    },
    {
      symbol: "SYM34",
      entryPrice: 3.77,
      exitPrice: 25.32,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM421",
      entryPrice: 40.81,
      exitPrice: 43.89,
      gainPercentage: "7.55",
    },
    {
      symbol: "SYM885",
      entryPrice: 92.02,
      exitPrice: 34.6,
      gainPercentage: "-62.40",
    },
    {
      symbol: "SYM538",
      entryPrice: 21.98,
      exitPrice: 80.11,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM630",
      entryPrice: 83.71,
      exitPrice: 21.14,
      gainPercentage: "-74.75",
    },
    {
      symbol: "SYM343",
      entryPrice: 39.73,
      exitPrice: 8.77,
      gainPercentage: "-77.93",
    },
    {
      symbol: "SYM797",
      entryPrice: 42.93,
      exitPrice: 78.54,
      gainPercentage: "82.95",
    },
    {
      symbol: "SYM965",
      entryPrice: 95.74,
      exitPrice: 77.41,
      gainPercentage: "-19.15",
    },
    {
      symbol: "SYM4",
      entryPrice: 57.31,
      exitPrice: 3.28,
      gainPercentage: "-94.28",
    },
    {
      symbol: "SYM756",
      entryPrice: 93.83,
      exitPrice: 35.44,
      gainPercentage: "-62.23",
    },
    {
      symbol: "SYM823",
      entryPrice: 94.09,
      exitPrice: 59.39,
      gainPercentage: "-36.88",
    },
    {
      symbol: "SYM970",
      entryPrice: 56.04,
      exitPrice: 10.88,
      gainPercentage: "-80.59",
    },
    {
      symbol: "SYM140",
      entryPrice: 92.25,
      exitPrice: 69.48,
      gainPercentage: "-24.68",
    },
    {
      symbol: "SYM72",
      entryPrice: 61.16,
      exitPrice: 55.93,
      gainPercentage: "-8.55",
    },
    {
      symbol: "SYM813",
      entryPrice: 47.75,
      exitPrice: 74.04,
      gainPercentage: "55.06",
    },
    {
      symbol: "SYM340",
      entryPrice: 68.1,
      exitPrice: 52.81,
      gainPercentage: "-22.45",
    },
    {
      symbol: "SYM247",
      entryPrice: 12.09,
      exitPrice: 66.58,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM655",
      entryPrice: 45.22,
      exitPrice: 5.99,
      gainPercentage: "-86.75",
    },
    {
      symbol: "SYM57",
      entryPrice: 0.2,
      exitPrice: 83.5,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM600",
      entryPrice: 61.48,
      exitPrice: 38.09,
      gainPercentage: "-38.04",
    },
    {
      symbol: "SYM964",
      entryPrice: 60.43,
      exitPrice: 62.54,
      gainPercentage: "3.49",
    },
    {
      symbol: "SYM979",
      entryPrice: 23.33,
      exitPrice: 86.01,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM808",
      entryPrice: 63.94,
      exitPrice: 37.87,
      gainPercentage: "-40.77",
    },
    {
      symbol: "SYM606",
      entryPrice: 6.78,
      exitPrice: 81.54,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM970",
      entryPrice: 32.12,
      exitPrice: 44.62,
      gainPercentage: "38.92",
    },
    {
      symbol: "SYM340",
      entryPrice: 63.34,
      exitPrice: 82.1,
      gainPercentage: "29.62",
    },
    {
      symbol: "SYM814",
      entryPrice: 54.26,
      exitPrice: 24.76,
      gainPercentage: "-54.37",
    },
    {
      symbol: "SYM801",
      entryPrice: 35.5,
      exitPrice: 39.8,
      gainPercentage: "12.11",
    },
    {
      symbol: "SYM248",
      entryPrice: 39.82,
      exitPrice: 96.35,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM226",
      entryPrice: 10.73,
      exitPrice: 57.22,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM887",
      entryPrice: 69.06,
      exitPrice: 78.1,
      gainPercentage: "13.09",
    },
    {
      symbol: "SYM775",
      entryPrice: 95.54,
      exitPrice: 24.43,
      gainPercentage: "-74.43",
    },
    {
      symbol: "SYM200",
      entryPrice: 70.13,
      exitPrice: 70.99,
      gainPercentage: "1.23",
    },
    {
      symbol: "SYM350",
      entryPrice: 74.85,
      exitPrice: 26.52,
      gainPercentage: "-64.57",
    },
    {
      symbol: "SYM877",
      entryPrice: 77.3,
      exitPrice: 17.93,
      gainPercentage: "-76.80",
    },
    {
      symbol: "SYM580",
      entryPrice: 54.22,
      exitPrice: 38.42,
      gainPercentage: "-29.14",
    },
    {
      symbol: "SYM678",
      entryPrice: 3.31,
      exitPrice: 11.08,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM491",
      entryPrice: 35.39,
      exitPrice: 73.41,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM601",
      entryPrice: 25.55,
      exitPrice: 40.6,
      gainPercentage: "58.90",
    },
    {
      symbol: "SYM535",
      entryPrice: 1.24,
      exitPrice: 27.44,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM992",
      entryPrice: 41.92,
      exitPrice: 21.58,
      gainPercentage: "-48.52",
    },
    {
      symbol: "SYM142",
      entryPrice: 43.66,
      exitPrice: 61.06,
      gainPercentage: "39.85",
    },
    {
      symbol: "SYM282",
      entryPrice: 44.59,
      exitPrice: 40.06,
      gainPercentage: "-10.16",
    },
    {
      symbol: "SYM84",
      entryPrice: 36.13,
      exitPrice: 53.02,
      gainPercentage: "46.75",
    },
    {
      symbol: "SYM761",
      entryPrice: 80.22,
      exitPrice: 99.45,
      gainPercentage: "23.97",
    },
    {
      symbol: "SYM471",
      entryPrice: 56.08,
      exitPrice: 37.4,
      gainPercentage: "-33.31",
    },
    {
      symbol: "SYM572",
      entryPrice: 29.47,
      exitPrice: 98.03,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM213",
      entryPrice: 40.38,
      exitPrice: 72.42,
      gainPercentage: "79.35",
    },
    {
      symbol: "SYM721",
      entryPrice: 61.03,
      exitPrice: 72.38,
      gainPercentage: "18.60",
    },
    {
      symbol: "SYM735",
      entryPrice: 30.81,
      exitPrice: 34.34,
      gainPercentage: "11.46",
    },
    {
      symbol: "SYM320",
      entryPrice: 35.86,
      exitPrice: 96.88,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM399",
      entryPrice: 54.41,
      exitPrice: 2.79,
      gainPercentage: "-94.87",
    },
    {
      symbol: "SYM931",
      entryPrice: 90.36,
      exitPrice: 96.14,
      gainPercentage: "6.40",
    },
    {
      symbol: "SYM831",
      entryPrice: 59.53,
      exitPrice: 83.84,
      gainPercentage: "40.84",
    },
    {
      symbol: "SYM652",
      entryPrice: 3.79,
      exitPrice: 3.41,
      gainPercentage: "-10.03",
    },
    {
      symbol: "SYM759",
      entryPrice: 28.38,
      exitPrice: 77.68,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM858",
      entryPrice: 66.58,
      exitPrice: 79.27,
      gainPercentage: "19.06",
    },
    {
      symbol: "SYM677",
      entryPrice: 42.93,
      exitPrice: 83.8,
      gainPercentage: "95.20",
    },
    {
      symbol: "SYM962",
      entryPrice: 66.34,
      exitPrice: 11.64,
      gainPercentage: "-82.45",
    },
    {
      symbol: "SYM99",
      entryPrice: 60.15,
      exitPrice: 63.99,
      gainPercentage: "6.38",
    },
    {
      symbol: "SYM180",
      entryPrice: 69.36,
      exitPrice: 17.57,
      gainPercentage: "-74.67",
    },
    {
      symbol: "SYM592",
      entryPrice: 69.82,
      exitPrice: 77.02,
      gainPercentage: "10.31",
    },
    {
      symbol: "SYM949",
      entryPrice: 15.06,
      exitPrice: 43.87,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM268",
      entryPrice: 35.74,
      exitPrice: 89.21,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM763",
      entryPrice: 30.34,
      exitPrice: 29.92,
      gainPercentage: "-1.38",
    },
    {
      symbol: "SYM428",
      entryPrice: 87.99,
      exitPrice: 21.26,
      gainPercentage: "-75.84",
    },
    {
      symbol: "SYM303",
      entryPrice: 6.73,
      exitPrice: 75.95,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM258",
      entryPrice: 85.42,
      exitPrice: 71.54,
      gainPercentage: "-16.25",
    },
    {
      symbol: "SYM689",
      entryPrice: 56.09,
      exitPrice: 67.93,
      gainPercentage: "21.11",
    },
    {
      symbol: "SYM460",
      entryPrice: 57.49,
      exitPrice: 6.8,
      gainPercentage: "-88.17",
    },
    {
      symbol: "SYM935",
      entryPrice: 49.87,
      exitPrice: 69.75,
      gainPercentage: "39.86",
    },
    {
      symbol: "SYM688",
      entryPrice: 92.47,
      exitPrice: 38.03,
      gainPercentage: "-58.87",
    },
    {
      symbol: "SYM659",
      entryPrice: 61.39,
      exitPrice: 45.51,
      gainPercentage: "-25.87",
    },
    {
      symbol: "SYM895",
      entryPrice: 1.11,
      exitPrice: 87.54,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM968",
      entryPrice: 5.46,
      exitPrice: 62.14,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM546",
      entryPrice: 27.84,
      exitPrice: 29.09,
      gainPercentage: "4.49",
    },
    {
      symbol: "SYM332",
      entryPrice: 13.02,
      exitPrice: 65.55,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM55",
      entryPrice: 77.56,
      exitPrice: 3.66,
      gainPercentage: "-95.28",
    },
    {
      symbol: "SYM970",
      entryPrice: 83.61,
      exitPrice: 75.26,
      gainPercentage: "-9.99",
    },
    {
      symbol: "SYM374",
      entryPrice: 22.5,
      exitPrice: 33.54,
      gainPercentage: "49.07",
    },
    {
      symbol: "SYM123",
      entryPrice: 20.72,
      exitPrice: 22.49,
      gainPercentage: "8.54",
    },
    {
      symbol: "SYM111",
      entryPrice: 13.64,
      exitPrice: 58.66,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM115",
      entryPrice: 7.22,
      exitPrice: 55.01,
      gainPercentage: "100.00",
    },
    {
      symbol: "SYM291",
      entryPrice: 36.3,
      exitPrice: 30.93,
      gainPercentage: "-14.79",
    },
    {
      symbol: "SYM59",
      entryPrice: 84.53,
      exitPrice: 36.47,
      gainPercentage: "-56.86",
    },
    {
      symbol: "SYM589",
      entryPrice: 85.05,
      exitPrice: 98.96,
      gainPercentage: "16.36",
    },
    {
      symbol: "SYM929",
      entryPrice: 19.3,
      exitPrice: 6.13,
      gainPercentage: "-68.24",
    },
    {
      symbol: "SYM142",
      entryPrice: 53.28,
      exitPrice: 95.88,
      gainPercentage: "79.95",
    },
    {
      symbol: "SYM356",
      entryPrice: 52.95,
      exitPrice: 66.55,
      gainPercentage: "25.68",
    },
    {
      symbol: "SYM142",
      entryPrice: 86.98,
      exitPrice: 34.96,
      gainPercentage: "-59.81",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-screen-lg overflow-hidden whitespace-nowrap rounded-md bg-[#000000] p-4 text-white dark:bg-[#1a1c1e]">
      <div className="mb-6 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 p-4 shadow-md">
        <h2 className="text-center text-2xl font-bold">
          Stay updated with your latest trades
        </h2>
      </div>
      <div className="animate-scroll flex">
        {prices.map((item, index) => (
          <div key={index} className="mx-4 flex flex-col items-center">
            <span className="text-sm">{item.symbol}</span>
            <span className="text-lg font-bold">
              {item.exitPrice.toFixed(2)}
            </span>
            <span
              className={`text-xs ${
                parseFloat(item.gainPercentage) > 0
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {item.gainPercentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTicker;
