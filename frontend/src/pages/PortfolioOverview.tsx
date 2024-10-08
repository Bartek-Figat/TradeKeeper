import { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

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
      title: 'Stock Portfolio',
      content: 'Track your stock investments and monitor market trends.',
      performance: '+5.2%',
      type: 'Stocks',
    },
    {
      id: 1,
      title: 'Crypto Portfolio',
      content: 'Manage your cryptocurrency assets and analyze market volatility.',
      performance: '-2.3%',
      type: 'Cryptocurrency',
    },
    {
      id: 2,
      title: 'Real Estate Portfolio',
      content: 'Evaluate your real estate investments and rental income.',
      performance: '+3.8%',
      type: 'Real Estate',
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
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow p-8">
          <div className="grid grid-cols-12 gap-6">
            {portfolioItems.map(item => (
              <div
                key={item.id}
                className="col-span-12 sm:col-span-6 lg:col-span-4 bg-white p-4 rounded shadow cursor-pointer"
                onClick={() => openModal(item)}
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.content}</p>
                <div className="mt-4">
                  <span className="text-sm font-medium">Performance: </span>
                  <span className={`text-lg ${item.performance.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{item.performance}</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">Type: {item.type}</div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={selectedItem && {
            id: selectedItem.id,
            date: 'N/A',
            type: selectedItem.type,
            amount: 'N/A',
            status: 'N/A',
            description: selectedItem.content,
          }}
      />
    </div>
  );
}

export default PortfolioOverview;