"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeRepository = void 0;
const mongodb_1 = require("mongodb");
const tradeUtillts_1 = require("./tradeUtillts");
const database_1 = require("../../config/db/database");
class TradeRepository {
    constructor() {
        this.database = new database_1.Database();
        this.tradeCollection = this.database.getCollection("trade");
    }
    async createTrade(newTrade, userId) {
        let formattedData = {};
        if (newTrade.stock || newTrade.crypto) {
            const quoteSummaryResult = await (0, tradeUtillts_1.quoteSummary)(newTrade.symbol);
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
        }
        else if (newTrade.forex) {
            const historicalRates = await (0, tradeUtillts_1.getHistoricalRatesForex)(newTrade.symbol);
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
    async getAllTrades() {
        const docs = await this.tradeCollection.find().toArray();
        return docs.map(tradeUtillts_1.convertToTradeDTO);
    }
    async getAllUserTrades({ user }) {
        const { decoded: { token }, } = user;
        const docs = await this.tradeCollection
            .find({ userId: new mongodb_1.ObjectId(token) })
            .toArray();
        return docs.map(tradeUtillts_1.convertToTradeDTO);
    }
    async getTradeById(tradeId) {
        const doc = await this.tradeCollection.findOne({
            _id: new mongodb_1.ObjectId(tradeId),
        });
        return (0, tradeUtillts_1.convertToTradeDTO)(doc);
    }
    // Update a trade by ID
    updateTrade(tradeId, updatedTrade) {
        return this.tradeCollection.updateOne({ _id: new mongodb_1.ObjectId(tradeId) }, { $set: updatedTrade });
    }
    // Delete a trade by ID
    deleteTrade(tradeId) {
        return this.tradeCollection.deleteOne({ _id: new mongodb_1.ObjectId(tradeId) });
    }
    // Find trades by a specific field
    findTradesByField(field, value) {
        return this.tradeCollection.find({ [field]: value }).toArray();
    }
    // Count total number of trades
    countTotalTrades() {
        return this.tradeCollection.countDocuments();
    }
    // Update multiple trades
    updateMultipleTrades(filter, updatedValues) {
        return this.tradeCollection.updateMany(filter, { $set: updatedValues });
    }
    // Delete all trades
    deleteAllTrades() {
        return this.tradeCollection.deleteMany({});
    }
    deleteMyTrades(userId) {
        return this.tradeCollection.deleteMany({ userId: userId });
    }
    async getCompanyProfile(symbol) {
        const companyProfile = await (0, tradeUtillts_1.getCompanySummaryProfile)(symbol);
        return companyProfile;
    }
}
exports.TradeRepository = TradeRepository;
