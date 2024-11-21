import React, { useState } from "react";
import { Calendar, momentLocalizer, EventProps } from "react-big-calendar";
import moment from "moment";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/20/solid"; // Importing icons
import "react-big-calendar/lib/css/react-big-calendar.css";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { AnimatePresence, motion } from "framer-motion";

const localizer = momentLocalizer(moment);

// Define a localization function
const localizeDate = (date: Date, locale: string) => {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

interface TradeFrequency {
  _id: string;
  tradeCount: number;
  start: string;
  end: string;
  totalProfit?: number;
  averageDuration?: number;
  averageProfit?: string;
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
const tradeFrequencies: TradeFrequencies = {
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
      ],
    },
  ],
};
// Function to calculate average profit from trades
const calculateAverageProfit = (trades: { profit: number }[]) => {
  const totalProfit = trades.reduce(
    (acc: number, trade: { profit: number }) => acc + trade.profit,
    0,
  );
  return trades.length > 0 ? (totalProfit / trades.length).toFixed(2) : "0";
};

// Update the totalProfit and averageProfit in the tradeFrequencies object
tradeFrequencies.weekly.forEach((week) => {
  if (week.trades) {
    week.totalProfit = week.trades.reduce(
      (acc, trade) => acc + trade.profit,
      0,
    );
    week.averageProfit = calculateAverageProfit(week.trades);
  }
});
const transformToEvents = (frequencies: TradeFrequencies) => {
  return frequencies.weekly.map((item) => {
    const { tradeCount, end, ...rest } = item; // Removed 'start' from destructuring as it's not used
    return {
      title: `Trades: ${tradeCount}`,
      
      end: new Date(end).toISOString(),
      tradeCount,
      ...rest,
    };
  });
};

const events = transformToEvents(tradeFrequencies);

const TradeCalendar: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TradeFrequency | null>(
    null,
  );

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 1;
  const userLocale = navigator.language;

  const handleSelectEvent = (event: TradeFrequency) => {
    setSelectedEvent(event);
    setCurrentPage(1);
  };

  const handleClosePopup = () => {
    setSelectedEvent(null);
  };

  const currentTrades = selectedEvent?.trades?.slice(
    (currentPage - 1) * tradesPerPage,
    currentPage * tradesPerPage,
  );

  const components = {
    event: ({ event }: EventProps<TradeFrequency>) => {
      if (event) {
        return (
          <div
            className="absolute top-0 flex min-w-[14%] justify-center rounded-md border-[2px] border-emerald-500 bg-emerald-400 p-[5px]"
            style={{ height: 80 }}
          >
            <div className="flex flex-col justify-center">
              <p className="text-lg font-medium text-gray-800">{`$${event.totalProfit}`}</p>
              <p className="text-lg font-medium text-gray-800">{`Average Profit: $${event.averageProfit}`}</p>
              <p className="text-center text-sm font-extralight text-gray-700">
                {event.trades?.length} trades
              </p>
            </div>
          </div>
        );
      }

      return null;
    },
  };

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
              components={components}
              localizer={localizer}
              events={events.map((event) => ({
                ...event,
                start: new Date(event.end).toISOString(),
                end: new Date(event.end).toISOString(),
              }))}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, width: 800 }}
              defaultView="month"
              views={["month"]}
              onSelectEvent={handleSelectEvent}
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
                                {localizeDate(
                                  new Date(trade.entryDate),
                                  userLocale,
                                )}
                              </span>
                            </div>

                            <div className="flex flex-col p-2">
                              <span className="font-semibold">To:</span>
                              <span>
                                {localizeDate(
                                  new Date(trade.exitDate),
                                  userLocale,
                                )}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <Pagination
                    current={currentPage}
                    total={selectedEvent?.trades?.length || 0}
                    pageSize={tradesPerPage}
                    onChange={setCurrentPage}
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
