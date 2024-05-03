import { TradeJournalRepository } from "../../services/tradeJournalService/tradeJournalService";
import { Body, Controller, Delete, Get, Path, Post, Put, Route } from "tsoa";

@Route("trades-journal")
export class TradeJournalController extends Controller {
  private tradeJournalRepository: TradeJournalRepository =
    new TradeJournalRepository();

  @Get("/")
  public async getAllTradesFromJournal() {
    return this.tradeJournalRepository.getAllTradesFromJournal();
  }

  @Get("/{tradeId}")
  public async getTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.getTradeFromJournal(tradeId);
  }

  @Post("/create-journal-trade")
  public async createTradeInJournal(@Body() newTrade: any) {
    return this.tradeJournalRepository.createTradeInJournal(newTrade);
  }

  @Put("/{tradeId}")
  public async updateTradeInJournal(
    @Path() tradeId: string,
    @Body() updatedTradeInJournal: any
  ): Promise<any> {
    return this.tradeJournalRepository.updateTradeInJournal(
      tradeId,
      updatedTradeInJournal
    );
  }

  @Put("/{tradeId}/media")
  public async uploadMediaToJournal(
    @Path() tradeId: string,
    @Body() media: any
  ) {
    return this.tradeJournalRepository.uploadMediaToJournal(tradeId, media);
  }

  @Delete("/{tradeId}")
  public async deleteTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.deleteTradeFromJournal(tradeId);
  }
}
