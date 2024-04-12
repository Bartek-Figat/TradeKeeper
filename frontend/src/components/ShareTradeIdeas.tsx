import React, { useState } from "react";

const ShareTradeIdeas: React.FC = () => {
  const [tradeIdea, setTradeIdea] = useState("");

  const handleTradeIdeaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTradeIdea(event.target.value);
  };

  const handleShareTradeIdea = () => {
    // Logic to share trade idea (e.g., send to backend, display confirmation)
    console.log("Trade Idea Shared:", tradeIdea);
    // Reset the trade idea input
    setTradeIdea("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Share Your Trade Ideas</h2>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-md"
        placeholder="Enter your trade idea here..."
        value={tradeIdea}
        onChange={handleTradeIdeaChange}
      ></textarea>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        onClick={handleShareTradeIdea}
      >
        Share Trade Idea
      </button>
    </div>
  );
};

export default ShareTradeIdeas;
