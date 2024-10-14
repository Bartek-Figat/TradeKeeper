import { ReactNode } from "react";

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
  riskPercentage?: number;
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
  tradeType: "stock" | "forex" | "crypto" | "option" | "crypto spot";
  entryDate: Date;
  exitDate: Date;
  quantity?: number;
  optionType?: "call" | "put";
  strikePrice?: number;
  optionPremium?: number;
  units?: number;
  usdExchangeRate?: number;
  leverage?: number;
  positionType?: "long" | "short" | "spot";
  fees?: number;
}

export interface TradeDto extends ICreateTrade {
  tradeOutcome: ReactNode;
}
