export interface ITrade {
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
  riskPercentage: number;
  positionType?: string;
  leverage: undefined;
  costBasis?: number;
  profitLoss?: number;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  reward: number;
  tags: string[];
  createdAt: Date;
  stopLossLevel?: number;
  positionSize?: number;
  tradeType: "stock" | "forex" | "crypto" | "option";
  entryDate: Date;
  exitDate: Date;
  quantity?: number; // For stock and crypto
  optionType?: "call" | "put"; // For options
  strikePrice?: number; // For options
  optionPremium?: number; // For options
  units?: number; // For forex
  usdExchangeRate?: number; // For forex
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
