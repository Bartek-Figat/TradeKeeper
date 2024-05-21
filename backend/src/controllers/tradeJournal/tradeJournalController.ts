import { TradeJournalRepository } from "../../services/tradeJournalService/tradeJournalService";
import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Put,
  Route,
  Security,
} from "tsoa";

@Route("trades-journal")
export class TradeJournalController extends Controller {
  private tradeJournalRepository: TradeJournalRepository =
    new TradeJournalRepository();
  @Security("jwt")
  @Get("/")
  public async getAllTradesFromJournal() {
    return this.tradeJournalRepository.getAllTradesFromJournal();
  }

  @Security("jwt")
  @Get("/{tradeId}")
  public async getTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.getTradeFromJournal(tradeId);
  }
  @Security("jwt")
  @Post("/create-journal-trade")
  public async createTradeInJournal(@Body() newTrade: any) {
    return this.tradeJournalRepository.createTradeInJournal(newTrade);
  }
  @Security("jwt")
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

  @Security("jwt")
  @Put("/{tradeId}/media")
  public async uploadMediaToJournal(
    @Path() tradeId: string,
    @Body() media: any
  ) {
    return this.tradeJournalRepository.uploadMediaToJournal(tradeId, media);
  }

  @Security("jwt")
  @Delete("/{tradeId}")
  public async deleteTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.deleteTradeFromJournal(tradeId);
  }
}
