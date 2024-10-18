import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/20/solid"; // Importing icons
import "react-big-calendar/lib/css/react-big-calendar.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { AnimatePresence, motion } from "framer-motion";

// Initialize moment localizer
const localizer = momentLocalizer(moment);

// Define types for trade frequency data
interface TradeFrequency {
  _id: string;
  tradeCount: number;
  start: string; // ISO date string
  end: string; // ISO date string
  totalProfit?: number;
  averageDuration?: number;
  trades?: Array<{
    tradeId: string;
    entryDate: string;
    exitDate: string;
    profit: number;
  }>;
}

interface TradeFrequencies {
  weekly: TradeFrequency[];
}

// Sample trade frequency data
const tradeFrequencies = {
  weekly: [
    {
      _id: "2024-41",
      tradeCount: 10,
      start: "2024-05-15T00:00:00.000Z",
      end: "2024-10-14T00:00:00.000Z",
      totalProfit: 0,
      averageDuration: 6912000000,
      trades: [
        {
          tradeId: "ETH",
          entryDate: "2024-05-15T00:00:00.000Z",
          exitDate: "2024-10-13T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000), // Random profit
        },
        {
          tradeId: "BTC",
          entryDate: "2024-05-16T00:00:00.000Z",
          exitDate: "2024-10-14T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "LTC",
          entryDate: "2024-05-17T00:00:00.000Z",
          exitDate: "2024-10-15T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "XRP",
          entryDate: "2024-05-18T00:00:00.000Z",
          exitDate: "2024-10-16T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "ADA",
          entryDate: "2024-05-19T00:00:00.000Z",
          exitDate: "2024-10-17T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "SOL",
          entryDate: "2024-05-20T00:00:00.000Z",
          exitDate: "2024-10-18T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "DOT",
          entryDate: "2024-05-21T00:00:00.000Z",
          exitDate: "2024-10-19T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "LINK",
          entryDate: "2024-05-22T00:00:00.000Z",
          exitDate: "2024-10-20T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "MATIC",
          entryDate: "2024-05-23T00:00:00.000Z",
          exitDate: "2024-10-21T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "DOGE",
          entryDate: "2024-05-24T00:00:00.000Z",
          exitDate: "2024-10-22T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
      ],
    },
    {
      _id: "2023-40",
      tradeCount: 10,
      start: "2023-07-07T00:00:00.000Z",
      end: "2024-10-08T00:00:00.000Z",
      totalProfit: 0,
      averageDuration: 39657600000,
      trades: [
        {
          tradeId: "AAPL",
          entryDate: "2023-07-07T00:00:00.000Z",
          exitDate: "2024-10-08T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "GOOGL",
          entryDate: "2023-07-08T00:00:00.000Z",
          exitDate: "2024-10-09T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "AMZN",
          entryDate: "2023-07-09T00:00:00.000Z",
          exitDate: "2024-10-10T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "MSFT",
          entryDate: "2023-07-10T00:00:00.000Z",
          exitDate: "2024-10-11T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "TSLA",
          entryDate: "2023-07-11T00:00:00.000Z",
          exitDate: "2024-10-12T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "FB",
          entryDate: "2023-07-12T00:00:00.000Z",
          exitDate: "2024-10-13T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "NFLX",
          entryDate: "2023-07-13T00:00:00.000Z",
          exitDate: "2024-10-14T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "NVDA",
          entryDate: "2023-07-14T00:00:00.000Z",
          exitDate: "2024-10-15T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "DIS",
          entryDate: "2023-07-15T00:00:00.000Z",
          exitDate: "2024-10-16T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "PYPL",
          entryDate: "2023-07-16T00:00:00.000Z",
          exitDate: "2024-10-17T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
      ],
    },
    {
      _id: "2024-42",
      tradeCount: 10,
      start: "2024-06-01T00:00:00.000Z",
      end: "2024-10-14T00:00:00.000Z",
      totalProfit: 0,
      averageDuration: 129600000,
      trades: [
        {
          tradeId: "EUR/USD",
          entryDate: "2024-06-01T00:00:00.000Z",
          exitDate: "2024-06-02T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "GBP/USD",
          entryDate: "2024-06-03T00:00:00.000Z",
          exitDate: "2024-06-04T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "USD/JPY",
          entryDate: "2024-06-05T00:00:00.000Z",
          exitDate: "2024-06-06T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "AUD/USD",
          entryDate: "2024-06-07T00:00:00.000Z",
          exitDate: "2024-06-08T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "USD/CAD",
          entryDate: "2024-06-09T00:00:00.000Z",
          exitDate: "2024-06-10T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "NZD/USD",
          entryDate: "2024-06-11T00:00:00.000Z",
          exitDate: "2024-06-12T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "CHF/JPY",
          entryDate: "2024-06-13T00:00:00.000Z",
          exitDate: "2024-06-14T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "GBP/CHF",
          entryDate: "2024-06-15T00:00:00.000Z",
          exitDate: "2024-06-16T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "EUR/GBP",
          entryDate: "2024-06-17T00:00:00.000Z",
          exitDate: "2024-06-18T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
        {
          tradeId: "AUD/JPY",
          entryDate: "2024-06-19T00:00:00.000Z",
          exitDate: "2024-06-20T00:00:00.000Z",
          profit: Math.floor(Math.random() * 1000),
        },
      ],
    },
  ],
};

// Transform trade frequencies into calendar events
const transformToEvents = (frequencies: TradeFrequencies) => {
  return frequencies.weekly.map((item) => {
    const { tradeCount, start, end, ...rest } = item;
    return {
      title: `Trades: ${tradeCount}`,
      start: new Date(start).toISOString(), // Convert to ISO string
      end: new Date(end).toISOString(), // Convert to ISO string
      tradeCount, // Add tradeCount explicitly
      ...rest, // Spread additional trade details
    };
  });
};

const events = transformToEvents(tradeFrequencies);

const TradeCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TradeFrequency | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 1; // Number of trades to display per page

  const handleSelectEvent = (event: TradeFrequency) => {
    setSelectedEvent(event);
    setCurrentPage(1); // Reset to first page when a new event is selected
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  // Calculate the current trades based on the current page
  const currentTrades = selectedEvent?.trades?.slice(
    (currentPage - 1) * tradesPerPage,
    currentPage * tradesPerPage,
  );

  // Calculate total pages
  //   const totalPages = selectedEvent?.trades
  //     ? Math.ceil(selectedEvent.trades.length / tradesPerPage)
  //     : 0;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <section className="w-full max-w-7xl p-6">
        <div
          className={`grid grid-cols-1 ${selectedEvent ? "lg:grid-cols-3" : "lg:grid-cols-1"} gap-4 transition-all duration-300`}
        >
          <div
            className={`flex-1 ${selectedEvent ? "lg:col-span-2" : "lg:col-span-1"}`}
          >
            <h1 className="calendar-title mb-4 flex items-center text-xl font-semibold">
              <CalendarIcon className="mr-2 h-6 w-6 text-blue-500" /> Trade
              Frequencies Calendar
            </h1>
            <Calendar
              localizer={localizer}
              events={events.map((event) => ({
                ...event,
                tradeCount: event.tradeCount || 0, // Ensure tradeCount is always present
                start: new Date(event.start), // Convert back to Date object
                end: new Date(event.end), // Convert back to Date object
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              defaultView="week"
              views={["week", "day"]}
              popup
              onSelectEvent={handleSelectEvent} // Handle event selection
            />
          </div>
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between rounded-md border-l-4 border-blue-300 bg-white p-5 shadow-xl"
              >
                <div className="flex w-full justify-between">
                  <div className="p-2">
                    <CalendarIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="flex items-center rounded-full bg-blue-200 px-3 text-xs text-blue-800">
                    {selectedEvent.tradeCount} Trades
                  </div>
                </div>
                <div className="text-center text-5xl font-bold">
                  ${selectedEvent.totalProfit}
                </div>
                <div className="text-center text-sm font-bold">
                  Total Profit
                </div>
                <div
                  className="mt-4 flex flex-grow flex-col text-sm text-gray-600"
                  style={{ fontFamily: "Open Sans, sans-serif" }}
                >
                  <h3 className="text-lg font-semibold">Trades:</h3>
                  <ul className="flex list-inside list-disc flex-col justify-center">
                    {currentTrades?.map((trade) => {
                      const durationMs =
                        new Date(trade.exitDate).getTime() -
                        new Date(trade.entryDate).getTime();
                      const days = Math.floor(
                        durationMs / (1000 * 60 * 60 * 24),
                      );
                      const hours = Math.floor(
                        (durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                      );

                      return (
                        <li
                          key={trade.tradeId}
                          className="mt-4 list-none border-b border-gray-200 p-4"
                        >
                          <div className="flex flex-row">
                            <div className="flex flex-col p-2">
                              <span className="font-semibold">Trade ID:</span>
                              <span>{trade.tradeId}</span>
                            </div>
                            <div className="flex flex-col p-2">
                              <span className="font-semibold">Profit:</span>
                              <span className="text-green-600">
                                ${trade.profit}
                              </span>
                            </div>
                            <div className="flex flex-col p-2">
                              <span className="font-semibold">Duration:</span>
                              <span>
                                {days} days, {hours} hours
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-row">
                            <div className="flex flex-col p-2">
                              <span className="font-semibold">
                                Holding From:
                              </span>
                              <span>
                                {new Date(trade.entryDate).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex flex-col p-2">
                              <span className="font-semibold">To:</span>
                              <span>
                                {new Date(trade.exitDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {/* Pagination Controls */}
                <div className="mt-4">
                  <Pagination
                    current={currentPage}
                    pageSize={tradesPerPage}
                    total={selectedEvent?.trades?.length || 0}
                    onChange={(page) => setCurrentPage(page)}
                    showSizeChanger={false} // Hide size changer if you want a fixed page size
                    style={{ marginTop: "16px" }} // Optional styling
                    showLessItems
                  />
                </div>
                <button
                  className="mt-6 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-600 p-3 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                  onClick={handleClosePopup}
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default TradeCalendar;
