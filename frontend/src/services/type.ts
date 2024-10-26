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
  optionType: string;
  symbol: "",
  entryPrice: 0,
  exitPrice: number;
  risk: number;
  createdAt: string;
  reward: number;
  tags: string[];
  tradeType: string;
  entryDate: string;
  exitDate: string;
  quantity: number;
  positionType?: string;
  strikePrice: number;
  optionPremium: number;
  units: 0,
  usdExchangeRate: 0,
  leverage: 0,
  riskPercentage: 0,
  fees: 0,
  _id: "", // Add default value for _id
  profitLoss: 0, // Add default value for profitLoss
  tradeOutcome: "", // Add default value for tradeOutcome
  winRate: 0, // Add default value for winRate
  avgProfitLoss: 0, // Add default value for avgProfitLoss
  riskRewardRatio: 0, // Add default value for riskRewardRatio
  maxDrawdown: 0, // Add default value for maxDrawdown
  sharpeRatio: 0, // Add default value for sharpeRatio
  profitFactor: 0, // Add default value for profitFactor
  volatility: 0, // Add default value for volatility
  sortinoRatio: 0, // Add default value for sortinoRatio
  avgHoldingPeriod: 0, // Add default value for avgHoldingPeriod
  improvementSuggestions: [], // Add default value for improvementSuggestions
}

export interface TradeDto {
  exitPrice: string;
  entryPrice: string;
  quantity: string;
  exitDate: string | number | Date;
  profitLoss: undefined;
  entryDate: string | number | Date;
  tradeOutcome: string;
  tradeType: string;
  symbol: string;
  tradesWithMetrics: {
    symbol: string;
    tradeType: string;
    tradeOutcome: string;
    entryDate: string;
    exitDate: string;
    quantity: number;
    entryPrice: number;
    exitPrice: number;
    profitLoss: number;
    // Add other properties as needed
  }[];
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
