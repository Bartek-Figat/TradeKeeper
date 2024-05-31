"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToTradeDTO = exports.getCompanySummaryProfile = exports.getHistoricalRatesForex = exports.quoteSummary = void 0;
const yahoo_finance2_1 = __importDefault(require("yahoo-finance2"));
const dukascopy_node_1 = require("dukascopy-node");
const quoteSummary = async (symbol) => {
    try {
        const { address1, city, state, zip, country, phone, website, industry, industryKey, industryDisp, sector, sectorKey, sectorDisp, longBusinessSummary, fullTimeEmployees, } = await yahoo_finance2_1.default.quoteSummary(symbol, {
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
        const resultHistorical = await yahoo_finance2_1.default.historical(symbol, {
            period1: Date.now(),
            period2: Date.now(),
            interval: "1d",
        });
        return { summaryResult, resultHistorical };
    }
    catch (error) {
        console.error("Error Quote Summary", error);
    }
};
exports.quoteSummary = quoteSummary;
const getHistoricalRatesForex = async (symbol) => {
    try {
        const data = await (0, dukascopy_node_1.getHistoricalRates)({
            instrument: symbol,
            dates: {
                from: new Date(),
                to: new Date(),
            },
            timeframe: "d1",
            format: "json",
        });
        return data;
    }
    catch (error) {
        console.log("Error Get Historical Rates Forex", error);
    }
};
exports.getHistoricalRatesForex = getHistoricalRatesForex;
const getCompanySummaryProfile = async (symbol) => {
    try {
        const profile = await yahoo_finance2_1.default.quoteSummary(symbol, {
            modules: ["summaryProfile"],
        });
        return profile;
    }
    catch (error) {
        console.log("Error Get Company Profile", error);
    }
};
exports.getCompanySummaryProfile = getCompanySummaryProfile;
function convertToTradeDTO(doc) {
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
exports.convertToTradeDTO = convertToTradeDTO;
