"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeJournalRepository = void 0;
const mongodb_1 = require("mongodb");
const database_1 = require("../../config/db/database");
const dto_1 = require("../../dto/dto");
const class_validator_1 = require("class-validator");
class TradeJournalRepository {
    constructor() {
        this.database = new database_1.Database();
        this.tradeJournalCollection = this.database.getCollection("tradeJournal");
    }
    // Create trade in journal
    async createTradeInJournal(newJournalTrade) {
        const journalEntryDto = new dto_1.JournalEntryDto();
        Object.assign(journalEntryDto, newJournalTrade);
        // const _id = new ObjectId();
        // journalEntryDto._id = _id;
        // const currentDate = new Date();
        // journalEntryDto.createdAt = currentDate;
        // journalEntryDto.updatedAt = currentDate;
        //const errors = await validate(journalEntryDto);
        // if (errors.length > 0) {
        //   return {
        //     errors: errors.map((error) => Object.values(error)),
        //   };
        // }
        return this.tradeJournalCollection.insertOne(newJournalTrade);
    }
    //Upload media to journal
    async uploadMediaToJournal(tradeId, media) {
        const journalMediaDto = new dto_1.MediaDto();
        Object.assign(journalMediaDto, media);
        const currentDate = new Date();
        journalMediaDto.uploadedAt = currentDate;
        const errors = await (0, class_validator_1.validate)(journalMediaDto);
        if (errors.length > 0) {
            return {
                errors: errors.map((error) => Object.values(error)),
            };
        }
        return this.tradeJournalCollection.updateOne({ _id: new mongodb_1.ObjectId(tradeId) }, { $push: { media: media } });
    }
    //Get all trades from journal
    getAllTradesFromJournal() {
        return this.tradeJournalCollection.find().toArray();
    }
    getTradeFromJournal(tradeId) {
        return this.tradeJournalCollection.findOne({ _id: new mongodb_1.ObjectId(tradeId) });
    }
    updateTradeInJournal(tradeId, updateTradeInJournal) {
        return this.tradeJournalCollection.updateOne({ _id: new mongodb_1.ObjectId(tradeId) }, { $set: updateTradeInJournal });
    }
    //Delete trade from journal
    deleteTradeFromJournal(tradeId) {
        return this.tradeJournalCollection.deleteOne({ _id: tradeId });
    }
    // Delete multiple trades from journal
    deleteMultipleFromJournalTrades(filter) {
        return this.tradeJournalCollection.deleteMany(filter);
    }
    //Deleta all trades from journal
    deleteAllTradesFromJournal() {
        return this.tradeJournalCollection.deleteMany({});
    }
}
exports.TradeJournalRepository = TradeJournalRepository;
