import { getUserId } from "src/middlewares/middleware";
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
  Middlewares,
} from "tsoa";

@Route("trades-journal")
export class TradeJournalController extends Controller {
  private tradeJournalRepository: TradeJournalRepository =
    new TradeJournalRepository();
  @Security("jwt")
  @Middlewares(getUserId)
  @Get("/")
  public async getAllTradesFromJournal() {
    return this.tradeJournalRepository.getAllTradesFromJournal();
  }

  @Security("jwt")
  @Middlewares(getUserId)
  @Get("/{tradeId}")
  public async getTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.getTradeFromJournal(tradeId);
  }
  @Security("jwt")
  @Middlewares(getUserId)
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
  @Middlewares(getUserId)
  @Put("/{tradeId}/media")
  public async uploadMediaToJournal(
    @Path() tradeId: string,
    @Body() media: any
  ) {
    return this.tradeJournalRepository.uploadMediaToJournal(tradeId, media);
  }

  @Security("jwt")
  @Middlewares(getUserId)
  @Delete("/{tradeId}")
  public async deleteTradeFromJournal(@Path() tradeId: string) {
    return this.tradeJournalRepository.deleteTradeFromJournal(tradeId);
  }
}
