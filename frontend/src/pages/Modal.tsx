import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface Transaction {
  id: number;
  date: string;
  type: "Buy" | "Sell";
  amount: string;
  status: "Completed" | "Pending" | "Cancel";
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTransaction = () => {
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    console.log("Transaction deleted");
    setIsDeleting(false);
    onClose();
  };

  const cancelDelete = () => {
    setIsDeleting(false);
  };

  const handleViewAllTransactions = () => {
    navigate("/transaction-history");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
          >
            <div className="flex flex-col gap-4 p-6">
              <p>
                <strong>Date:</strong> {transaction?.date}
              </p>
              <p>
                <strong>Type:</strong> {transaction?.type}
              </p>
              <p>
                <strong>Amount:</strong> {transaction?.amount}
              </p>
              <p>
                <strong>Status:</strong> {transaction?.status}
              </p>
              <p>
                <strong>Transaction ID:</strong> {transaction?.id}
              </p>
              {transaction?.description && (
                <p>
                  <strong>Description:</strong> {transaction.description}
                </p>
              )}
              {transaction?.notes && (
                <p>
                  <strong>Notes:</strong> {transaction.notes}
                </p>
              )}

              {/* Additional Content Section */}
              <div className="mt-4">
                <h3 className="font-semibold">Related Transactions</h3>
                <ul className="list-inside list-disc">
                  {transaction?.relatedTransactions &&
                  transaction.relatedTransactions.length > 0 ? (
                    transaction.relatedTransactions.map((related) => (
                      <li key={related.id}>
                        Transaction ID: {related.id} - Amount: {related.amount}{" "}
                        - Status: {related.status}
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
                  Choose an action to perform on this transaction:
                </p>
                <ul className="list-inside list-disc">
                  <li>
                    <button
                      className="text-green-500 hover:underline"
                      title="View the details of this transaction"
                    >
                      View Transaction Details
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteTransaction}
                      className="text-red-500 hover:underline"
                      title="Permanently delete this transaction"
                    >
                      Delete Transaction
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-blue-500 hover:underline"
                      title="Edit the details of this transaction"
                    >
                      Edit Transaction
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirmation Dialog for Deletion */}
            {isDeleting && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="rounded-lg bg-white p-4">
                  <p>Are you sure you want to delete this transaction?</p>
                  <button onClick={confirmDelete} className="text-red-500">
                    Yes, Delete
                  </button>
                  <button onClick={cancelDelete} className="text-gray-500">
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="p-6 pt-0">
              <button
                className="my-1 block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="my-1 block w-full select-none rounded-lg bg-blue-500 px-6 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={handleViewAllTransactions}
              >
                View All Transactions
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
