export interface ITrade {
  tradeType: string;
  _id: string;
  entryDate: Date;
  exitDate: Date;
  userId: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  reward: number;
  tags: string[];
  createdAt: Date;
  // Add performance metrics
  winRate?: number;
  avgProfitLoss?: number;
  riskRewardRatio?: number;
  maxDrawdown?: number;
  profitFactor?: number;
  sharpeRatio?: number;
  volatility?: number;
  sortinoRatio?: number;
  avgHoldingPeriod?: number;
  improvementSuggestions?: string[];
  stopLossLevel?: number;
  positionSize?: number;
}

export interface ICreateTrade {
  userId: string; // User ID associated with the trade
  tradeOutcome: string; // Outcome of the trade (e.g., win, loss)
  riskPercentage?: number; // Percentage of risk for the trade
  positionType?: "long" | "short" | "spot"; // Type of position taken
  leverage?: number; // Leverage used for the trade
  costBasis?: number; // Cost basis for the trade
  profitLoss?: number; // Profit or loss from the trade
  symbol: string; // Trading symbol (e.g., AAPL, EUR/USD)
  entryPrice: number; // Price at which the trade is entered
  exitPrice: number; // Price at which the trade is exited
  risk: number; // Amount of risk taken in the trade
  reward: number; // Potential reward from the trade
  tags: string[]; // Tags associated with the trade for categorization
  createdAt: Date; // Date when the trade was created
  stopLossLevel?: number; // Stop loss level for the trade
  positionSize?: number; // Size of the position taken
  tradeType: "stock" | "forex" | "crypto" | "option" | "crypto spot"; // Type of trade
  entryDate: Date; // Date when the trade was entered
  exitDate: Date; // Date when the trade was exited
  quantity?: number; // Quantity for stock and crypto trades
  optionType?: "call" | "put"; // Type of option (if applicable)
  strikePrice?: number; // Strike price for options
  optionPremium?: number; // Premium paid for options
  units?: number; // Number of units for forex trades
  usdExchangeRate?: number; // Exchange rate for forex trades
  fees?: number; // Potential fees associated with the trade
}
export interface TradeFilter {
  userId?: string;
  tradeType?: "stock" | "forex" | "crypto";
  symbol?: string;
  startDate?: Date;
  endDate?: Date;
  minWinRate?: number;
  maxWinRate?: number;
  minProfitLoss?: number;
  maxProfitLoss?: number;
}
