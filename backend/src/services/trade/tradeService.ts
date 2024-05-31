import { DeleteResult, ObjectId, UpdateResult } from "mongodb";
import {
  quoteSummary,
  getHistoricalRatesForex,
  getCompanySummaryProfile,
  convertToTradeDTO,
} from "./tradeUtillts";
import { Database } from "../../config/db/database";
import { Trade } from "src/utils/tradeTypes";
import { QuoteSummaryResult } from "yahoo-finance2/dist/esm/src/modules/quoteSummary-iface";
import { TradeDto } from "src/dto/dto";

export class TradeRepository {
  private database: Database = new Database();
  private tradeCollection = this.database.getCollection("trade");

  async createTrade(newTrade: Trade, userId: string) {
    let formattedData: any = {};
    if (newTrade.stock || newTrade.crypto) {
      const quoteSummaryResult = await quoteSummary(newTrade.symbol);
      if (quoteSummaryResult) {
        const {} = quoteSummaryResult?.summaryResult;
        formattedData = {
          symbol: newTrade.symbol,
          summary: quoteSummaryResult?.summaryResult,
          resultHistorical: quoteSummaryResult?.resultHistorical,
          type: newTrade.stock ? "stock" : "crypto",
          userId: userId,
        };
      }
    } else if (newTrade.forex) {
      const historicalRates = await getHistoricalRatesForex(newTrade.symbol);
      formattedData = {
        symbol: newTrade.symbol,
        data: historicalRates,
        type: `${newTrade.forex}`,
        userId: userId,
      };
    }
    if (Object.keys(formattedData).length > 0) {
      return this.tradeCollection.insertOne(formattedData);
    }
  }

  // Read all trades
  async getAllTrades(): Promise<TradeDto[]> {
    const docs = await this.tradeCollection.find().toArray();
    return docs.map(convertToTradeDTO);
  }

  async getAllUserTrades(userId: string): Promise<TradeDto[]> {
    const docs = await this.tradeCollection.find({ userId: userId }).toArray();
    return docs.map(convertToTradeDTO);
  }

  async getTradeById(tradeId: string): Promise<TradeDto> {
    const doc = await this.tradeCollection.findOne({
      _id: new ObjectId(tradeId),
    });
    return convertToTradeDTO(doc as any);
  }

  // Update a trade by ID
  updateTrade(tradeId: string, updatedTrade: Trade): Promise<UpdateResult> {
    return this.tradeCollection.updateOne(
      { _id: new ObjectId(tradeId) },
      { $set: updatedTrade }
    );
  }

  // Delete a trade by ID
  deleteTrade(tradeId: string): Promise<DeleteResult> {
    return this.tradeCollection.deleteOne({ _id: new ObjectId(tradeId) });
  }

  // Find trades by a specific field
  findTradesByField(field: string, value: string): any {
    return this.tradeCollection.find({ [field]: value }).toArray();
  }

  // Count total number of trades
  countTotalTrades(): Promise<number> {
    return this.tradeCollection.countDocuments();
  }

  // Update multiple trades
  updateMultipleTrades(filter: any, updatedValues: any): any {
    return this.tradeCollection.updateMany(filter, { $set: updatedValues });
  }

  // Delete all trades
  deleteAllTrades(): Promise<DeleteResult> {
    return this.tradeCollection.deleteMany({});
  }

  deleteMyTrades(userId: string): Promise<DeleteResult> {
    return this.tradeCollection.deleteMany({ userId: userId });
  }

  async getCompanyProfile(
    symbol: string
  ): Promise<QuoteSummaryResult | undefined> {
    const companyProfile = await getCompanySummaryProfile(symbol);
    return companyProfile;
  }
}
