import { useState } from "react";
import Modal from "./Modal"; // Import the Modal component

interface PortfolioItem {
  id: number;
  title: string;
  content: string;
  performance: string;
  type: string;
}

function PortfolioOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 0,
      title: "Stock Portfolio",
      content: "Track your stock investments and monitor market trends.",
      performance: "+5.2%",
      type: "Stocks",
    },
    {
      id: 1,
      title: "Crypto Portfolio",
      content:
        "Manage your cryptocurrency assets and analyze market volatility.",
      performance: "-2.3%",
      type: "Cryptocurrency",
    },
    {
      id: 2,
      title: "Real Estate Portfolio",
      content: "Evaluate your real estate investments and rental income.",
      performance: "+3.8%",
      type: "Real Estate",
    },
  ];

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="flex">
      {/* Sidebar */}

      {/* Content area */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main className="grow p-8">
          <div className="grid grid-cols-12 gap-6">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="col-span-12 cursor-pointer rounded bg-white p-4 shadow dark:bg-[#1a1c1e] sm:col-span-6 lg:col-span-4"
                onClick={() => openModal(item)}
              >
                <h2 className="text-xl font-semibold dark:text-neutral-300">
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-neutral-300">
                  {item.content}
                </p>
                <div className="mt-4">
                  <span className="text-sm font-medium dark:text-neutral-300">
                    Performance:{" "}
                  </span>
                  <span
                    className={`text-lg ${item.performance.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                  >
                    {item.performance}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-neutral-300">
                  Type: {item.type}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={
          selectedItem && {
            id: selectedItem.id,
            date: "N/A",
            type: selectedItem.type as "Buy" | "Sell",
            amount: "N/A",
            status: "Pending", // Changed from 'N/A' to a valid status
            description: selectedItem.content,
          }
        }
      />
    </div>
  );
}

export default PortfolioOverview;
