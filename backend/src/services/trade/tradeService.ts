import { ObjectId } from "mongodb";
import {
  quoteSummary,
  getHistoricalRatesForex,
  getCompanySummaryProfile,
} from "./tradeUtillts";
import { Database } from "../../config/db/database";

export class TradeRepository {
  private database: Database = new Database();
  private tradeCollection = this.database.getCollection("trade");

  async createTrade(newTrade: any) {
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
        };
      }
    } else if (newTrade.forex) {
      const historicalRates = await getHistoricalRatesForex(newTrade.symbol);
      formattedData = {
        symbol: newTrade.symbol,
        data: historicalRates,
        type: `${newTrade.forex}`,
      };
    }
    if (Object.keys(formattedData).length > 0) {
      return this.tradeCollection.insertOne(formattedData);
    }
  }

  // Read all trades
  getAllTrades(): any {
    return this.tradeCollection.find().toArray();
  }

  // Read a specific trade by ID
  getTradeById(tradeId: string): any {
    return this.tradeCollection.findOne({ _id: new ObjectId(tradeId) });
  }

  //Get company profile
  async getCompanyProfile(symbol: string): Promise<any> {
    const companyProfile = await getCompanySummaryProfile(symbol);
    return companyProfile;
  }

  // Update a trade by ID
  updateTrade(tradeId: string, updatedTrade: any): any {
    return this.tradeCollection.updateOne(
      { _id: new ObjectId(tradeId) },
      { $set: updatedTrade }
    );
  }
  // Add note to trade
  addNoteToTrade(tradeId: string, note: string): any {
    return this.tradeCollection.updateOne(
      { _id: new ObjectId(tradeId) },
      { $set: { note } }
    );
  }

  // Delete a trade by ID
  deleteTrade(tradeId: string): any {
    return this.tradeCollection.deleteOne({ _id: new ObjectId(tradeId) });
  }

  // Find trades by a specific field
  findTradesByField(field: string, value: any): any {
    return this.tradeCollection.find({ [field]: value }).toArray();
  }

  // Count total number of trades
  countTotalTrades(): any {
    return this.tradeCollection.countDocuments();
  }

  // Update multiple trades
  updateMultipleTrades(filter: any, updatedValues: any): any {
    return this.tradeCollection.updateMany(filter, { $set: updatedValues });
  }

  // Delete all trades
  deleteAllTrades(): any {
    return this.tradeCollection.deleteMany({});
  }
}
