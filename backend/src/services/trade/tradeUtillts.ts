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
