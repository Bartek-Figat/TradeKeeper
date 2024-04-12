import { Controller, Get, Post, Put, Delete, Route, Path, Body } from "tsoa";
import { TradeRepository } from "../../services/trade/tradeService";

@Route("trades")
export class TradeController extends Controller {
  private tradeRepository: TradeRepository = new TradeRepository();

  @Get("/")
  public async getAllTrades(): Promise<any> {
    return this.tradeRepository.getAllTrades();
  }

  @Get("/{tradeId}")
  public async getTradeById(@Path() tradeId: string): Promise<any> {
    return this.tradeRepository.getTradeById(tradeId);
  }

  @Post("/create-trade")
  public async createTrade(@Body() newTrade: any): Promise<any> {
    return this.tradeRepository.createTrade(newTrade);
  }

  @Put("/{tradeId}")
  public async updateTrade(
    @Path() tradeId: string,
    @Body() updatedTrade: any
  ): Promise<any> {
    return this.tradeRepository.updateTrade(tradeId, updatedTrade);
  }

  @Delete("/{tradeId}")
  public async deleteTrade(@Path() tradeId: string): Promise<any> {
    return this.tradeRepository.deleteTrade(tradeId);
  }
}
