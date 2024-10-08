
import {
  quoteSummary,
  getHistoricalRatesForex,
  getCompanySummaryProfile,
} from "./tradeUtillts";
import { Database } from "../../config/db/database";
import { Trade } from "src/utils/tradeTypes";
import { QuoteSummaryResult } from "yahoo-finance2/dist/esm/src/modules/quoteSummary-iface";

export class CompanyProfileTradeRepository {
  private readonly trades: string = "trades"; 
  private database: Database = new Database();
  private tradeCollection = this.database.getCollection(this.trades);

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
 

  async getCompanyProfile(
    symbol: string
  ): Promise<QuoteSummaryResult | undefined> {
    const companyProfile = await getCompanySummaryProfile(symbol);
    return companyProfile;
  }
}
