import { ObjectId } from "mongodb";
import { Database } from "../../config/db/database";
import { JournalEntryDto, MediaDto } from "../../dto/dto";
import { validate } from "class-validator";

export class TradeJournalRepository {
  private database: Database = new Database();
  private tradeJournalCollection = this.database.getCollection("tradeJournal");

  // Create trade in journal
  async createTradeInJournal(newJournalTrade: any) {
    const journalEntryDto = new JournalEntryDto();
    Object.assign(journalEntryDto, newJournalTrade);

    const _id = new ObjectId();
    journalEntryDto._id = _id;

    const currentDate = new Date();
    journalEntryDto.createdAt = currentDate;
    journalEntryDto.updatedAt = currentDate;

    //const errors = await validate(journalEntryDto);
    // if (errors.length > 0) {
    //   return {
    //     errors: errors.map((error) => Object.values(error)),
    //   };
    // }
    return this.tradeJournalCollection.insertOne(newJournalTrade);
  }
  //Upload media to journal
  async uploadMediaToJournal(tradeId: string, media: any) {
    const journalMediaDto = new MediaDto();
    Object.assign(journalMediaDto, media);

    const currentDate = new Date();
    journalMediaDto.uploadedAt = currentDate;

    const errors = await validate(journalMediaDto);
    if (errors.length > 0) {
      return {
        errors: errors.map((error) => Object.values(error)),
      };
    }

    return this.tradeJournalCollection.updateOne(
      { _id: new ObjectId(tradeId) },
      { $push: { media: media } }
    );
  }

  //Get all trades from journal
  getAllTradesFromJournal() {
    return this.tradeJournalCollection.find().toArray();
  }
  getTradeFromJournal(tradeId: string) {
    return this.tradeJournalCollection.findOne({ _id: new ObjectId(tradeId) });
  }
  updateTradeInJournal(tradeId: any, updateTradeInJournal: any) {
    return this.tradeJournalCollection.updateOne(
      { _id: new ObjectId(tradeId) },
      { $set: updateTradeInJournal }
    );
  }

  //Delete trade from journal
  deleteTradeFromJournal(tradeId: any) {
    return this.tradeJournalCollection.deleteOne({ _id: tradeId });
  }

  // Delete multiple trades from journal
  deleteMultipleFromJournalTrades(filter: any): any {
    return this.tradeJournalCollection.deleteMany(filter);
  }

  //Deleta all trades from journal
  deleteAllTradesFromJournal(): any {
    return this.tradeJournalCollection.deleteMany({});
  }
}
