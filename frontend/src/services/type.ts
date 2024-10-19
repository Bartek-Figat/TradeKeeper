export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  agreementToWebsitePolicy: boolean;
};

export interface ICreateTrade {
  _id: string;
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  createdAt: string;
  reward: number;
  tags: string | string[];
  tradeType: string;
  entryDate: string;
  exitDate: string;
  quantity: number;
  strikePrice: number;
  optionPremium: number;
  units: number;
  usdExchangeRate: number;
  leverage: number;
  riskPercentage: number;
  fees: number;
  profitLoss: number;
  tradeOutcome: string;
  winRate: number;
  avgProfitLoss: number;
  riskRewardRatio: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  volatility: number;
  sortinoRatio: number;
  avgHoldingPeriod: number;
  improvementSuggestions: string[];
}

export interface TradeDto {
  tradesWithMetrics: [];
  dataLength: number;
}

export interface Transaction {
  symbol: string;
  entryPrice: number;
  exitPrice: number;
  risk: number;
  createdAt: string;
  reward: number;
  tags: string | string[];
  tradeType: string;
  entryDate: string;
  exitDate: string;
  quantity: number;
  strikePrice: number;
  optionPremium: number;
  units: number;
  usdExchangeRate: number;
  leverage: number;
  riskPercentage: number;
  fees: number;
  profitLoss: number;
  tradeOutcome: string;
  winRate: number;
  avgProfitLoss: number;
  riskRewardRatio: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  volatility: number;
  sortinoRatio: number;
  avgHoldingPeriod: number;
  improvementSuggestions: string[];
}
