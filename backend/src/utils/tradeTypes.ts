import { Document } from "mongodb";
//import { TradeDto } from "src/dto/dto";
//import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

export type TradeBase = Omit<Document, "_id">;

export interface Trade extends TradeBase {
  _id: string;
  createdAt: Date;
  entry: number;
  entryQty: number;
  entryTotal: number;
  executions: string[];
  exit: number;
  exitQty: number;
  exitTotal: number;
  holdTime: number;
  lastTransactionAt: Date;
  market: string;
  openDate: Date;
  position: number;
  positionType: string;
  rMultiple: number;
  urnAmnt: number;
  returnPercent: number;
  status: string;
  symbol: string;
  tags: string[];
  stock?: boolean;
  crypto?: boolean;
  forex?: string;
}

export interface Trades {
  trades: Trade[];
}
