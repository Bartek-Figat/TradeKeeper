import { WithId, Document } from "mongodb";
import { TradeDto } from "../../dto/dto";
import yahooFinance from "yahoo-finance2";
import { getHistoricalRates } from "dukascopy-node";

export const quoteSummary = async (symbol: string) => {
  try {
    const {
      address1,
      city,
      state,
      zip,
      country,
      phone,
      website,
      industry,
      industryKey,
      industryDisp,
      sector,
      sectorKey,
      sectorDisp,
      longBusinessSummary,
      fullTimeEmployees,
    } = await yahooFinance.quoteSummary(symbol, {
      modules: ["assetProfile"],
    });

    const summaryResult = {
      address1,
      city,
      state,
      zip,
      country,
      phone,
      website,
      industry,
      industryKey,
      industryDisp,
      sector,
      sectorKey,
      sectorDisp,
      longBusinessSummary,
      fullTimeEmployees,
    };

    const resultHistorical = await yahooFinance.historical(symbol, {
      period1: Date.now(),
      period2: Date.now(),
      interval: "1d",
    });
    return { summaryResult, resultHistorical };
  } catch (error) {
    console.error("Error Quote Summary", error);
  }
};

export const getHistoricalRatesForex = async (symbol: any) => {
  try {
    const data = await getHistoricalRates({
      instrument: symbol,
      dates: {
        from: new Date(),
        to: new Date(),
      },
      timeframe: "d1",
      format: "json",
    });

    return data;
  } catch (error) {
    console.log("Error Get Historical Rates Forex", error);
  }
};

export const getCompanySummaryProfile = async (symbol: string) => {
  try {
    const profile = await yahooFinance.quoteSummary(symbol, {
      modules: ["summaryProfile"],
    });
    return profile;
  } catch (error) {
    console.log("Error Get Company Profile", error);
  }
};

export function convertToTradeDTO(doc: WithId<Document>): TradeDto {
  return {
    id: doc._id.toString(), // Konwersja ObjectId na string
    createdAt: doc.createdAt,
    entry: doc.entry,
    entryQty: doc.entryQty,
    entryTotal: doc.entryTotal,
    executions: doc.executions,
    exit: doc.exit,
    exitQty: doc.exitQty,
    exitTotal: doc.exitTotal,
    holdTime: doc.holdTime,
    lastTransactionAt: doc.lastTransactionAt,
    market: doc.market,
    openDate: doc.openDate,
    position: doc.position,
    positionType: doc.positionType,
    rMultiple: doc.rMultiple,
    urnAmnt: doc.urnAmnt,
    returnPercent: doc.returnPercent,
    status: doc.status,
    symbol: doc.symbol,
    tags: doc.tags,
  };
}
