import React from "react";
import CreateTrade from "../components/CreateTrade";

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div
      className={`fixed inset-0 z-50 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none"
      }`}
    >
      <div
        className={`relative z-60 mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <CreateTrade />

        <div className="p-6 pt-0">
          <button
            className="my-1 block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={onClose} // Close the modal
          >
            Close
          </button>
          <button
            className="my-1 block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={() => {
              // Add your logic for viewing all transactions here
              onClose(); // Close the modal after viewing transactions
            }}
          >
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
