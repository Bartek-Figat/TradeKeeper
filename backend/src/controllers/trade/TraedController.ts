import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Path,
  Body,
  Security,
  Request,
} from "tsoa";
import { TradeRepository } from "../../services/trade/tradeService";
import { Trade } from "../../utils/tradeTypes";
import { DeleteResult, UpdateResult } from "mongodb";
import { TradeDto } from "../../dto/dto";

@Route("custom-trades")
export class CustomTradeController extends Controller {
  private tradeRepository: TradeRepository = new TradeRepository();

  @Security("jwt")
  @Get("/")
  public async getAllTrades(): Promise<TradeDto[]> {
    return this.tradeRepository.getAllTrades();
  }

  @Security("jwt")
  @Get("/user-trades")
  public async getAllUserTrades(@Request() req: any): Promise<TradeDto[]> {
    return this.tradeRepository.getAllUserTrades(req);
  }

  @Security("jwt")
  @Get("/trade/{tradeId}")
  public async getTradeById(@Request() tradeId: string): Promise<TradeDto> {
    return this.tradeRepository.getTradeById(tradeId);
  }

  @Security("jwt")
  @Post("/create-new-trade")
  public async createTrade(
    @Request() req: any,
    @Body() newTrade: Trade
  ): Promise<any> {
    return this.tradeRepository.createTrade(newTrade, req);
  }

  @Security("jwt")
  @Put("/update-existing-trade/{tradeId}")
  public async updateTrade(
    @Path() tradeId: string,
    @Body() updatedTrade: Trade
  ): Promise<UpdateResult> {
    return this.tradeRepository.updateTrade(tradeId, updatedTrade);
  }

  @Security("jwt")
  @Delete("/remove-trade/{tradeId}")
  public async deleteTrade(@Request() tradeId: string): Promise<DeleteResult> {
    return this.tradeRepository.deleteTrade(tradeId);
  }

  @Security("jwt")
  @Get("/company/{symbol}")
  public async getCompanyProfile(@Path() symbol: string): Promise<any> {
    return this.tradeRepository.getCompanyProfile(symbol);
  }
}

