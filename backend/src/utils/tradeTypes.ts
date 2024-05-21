import { TradeDto } from "src/dto/dto";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: any;
    }
  }
}

export interface Trade extends TradeDto {
  stock?: boolean;
  crypto?: boolean;
  forex?: string;
}

export interface Trades {
  trades: Trade[];
}
