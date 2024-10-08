import { ITrade } from "./trade.interface";

export interface TradeDto extends ITrade {
  maxDrawdown?: number;
  sharpeRatio?: number;
  profitFactor?: number;
  volatility?: number;
  sortinoRatio?: number;
  avgHoldingPeriod?: number;
  improvementSuggestions?: string[];
}
