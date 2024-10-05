import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

interface Transaction {
  date: string;
  type: string;
  amount: string;
  status: string;
  id: string;
  description?: string;
  notes?: string;
  relatedTransactions?: Array<{ id: string; amount: string; status: string }>;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, transaction }) => {
  const navigate = useNavigate();

  if (!isOpen || !transaction) return null;

  const handleViewAllTransactions = () => {
    navigate("/transaction-history");
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none"
      }`}
    >
      <div
        className={`relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            Transaction Details
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <p>
            <strong>Date:</strong> {transaction.date}
          </p>
          <p>
            <strong>Type:</strong> {transaction.type}
          </p>
          <p>
            <strong>Amount:</strong> {transaction.amount}
          </p>
          <p>
            <strong>Status:</strong> {transaction.status}
          </p>
          <p>
            <strong>Transaction ID:</strong> {transaction.id}
          </p>
          {transaction.description && (
            <p>
              <strong>Description:</strong> {transaction.description}
            </p>
          )}
          {transaction.notes && (
            <p>
              <strong>Notes:</strong> {transaction.notes}
            </p>
          )}

          {/* Additional Content Section */}
          <div className="mt-4">
            <h3 className="font-semibold">Related Transactions</h3>
            <ul className="list-disc list-inside">
              {transaction.relatedTransactions &&
              transaction.relatedTransactions.length > 0 ? (
                transaction.relatedTransactions.map((related) => (
                  <li key={related.id}>
                    Transaction ID: {related.id} - Amount: {related.amount} -
                    Status: {related.status}
                  </li>
                ))
              ) : (
                <li>No related transactions found.</li>
              )}
            </ul>
          </div>

          {/* User Actions Section */}
          <div className="mt-4">
            <h3 className="font-semibold">User Actions</h3>
            <p className="text-sm text-gray-600">
              You can take further actions regarding this transaction, such as:
            </p>
            <ul className="list-disc list-inside">
              <li>Contact support for issues related to this transaction.</li>
              <li>Request a refund if applicable.</li>
              <li>View transaction history for more details.</li>
            </ul>
          </div>
        </div>
        <div className="p-6 pt-0">
          <button
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="block w-full select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
            type="button"
            onClick={handleViewAllTransactions}
          >
            View All Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
