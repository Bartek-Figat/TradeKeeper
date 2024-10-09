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
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  reward: number;
  tags: string[];
  createdAt: Date;
  stopLossLevel?: number;
  positionSize?: number;
  tradeType: "stock" | "forex" | "crypto";
  entryDate: Date;
  exitDate: Date;
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
