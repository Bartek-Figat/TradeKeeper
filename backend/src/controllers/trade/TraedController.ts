import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Route,
  Path,
  Body,
  Middlewares,
  Security,
} from "tsoa";
import { Request } from "express";
import { TradeRepository } from "../../services/trade/tradeService";
import { Trade } from "src/utils/tradeTypes";
import { getUserId } from "../../middlewares/middleware";
import { DeleteResult, UpdateResult } from "mongodb";
import { TradeDto } from "src/dto/dto";

@Route("trades")
export class TradeController extends Controller {
  private tradeRepository: TradeRepository = new TradeRepository();

  @Security("jwt")
  @Get("/")
  public async getAllTrades(): Promise<TradeDto[]> {
    return this.tradeRepository.getAllTrades();
  }

  @Security("jwt")
  @Middlewares(getUserId)
  @Get("/")
  public async getAllUserTrades(req: Request): Promise<TradeDto[]> {
    return this.tradeRepository.getAllUserTrades(req.userId);
  }
  @Security("jwt")
  @Get("/{tradeId}")
  public async getTradeById(@Path() tradeId: string): Promise<TradeDto> {
    return this.tradeRepository.getTradeById(tradeId);
  }
  @Security("jwt")
  @Middlewares(getUserId)
  @Post("/create-trade")
  public async createTrade(
    req: Request,
    @Body() newTrade: Trade
  ): Promise<any> {
    return this.tradeRepository.createTrade(newTrade, req.userId);
  }

  @Security("jwt")
  @Put("/{tradeId}")
  public async updateTrade(
    @Path() tradeId: string,
    @Body() updatedTrade: Trade
  ): Promise<UpdateResult> {
    return this.tradeRepository.updateTrade(tradeId, updatedTrade);
  }
  @Security("jwt")
  @Middlewares(getUserId)
  @Delete("/{tradeId}")
  public async deleteTrade(@Path() tradeId: string): Promise<DeleteResult> {
    return this.tradeRepository.deleteTrade(tradeId);
  }
  @Security("jwt")
  @Get("/{symbol}")
  public async getCompanyProfile(@Path() symbol: string): Promise<any> {
    return this.tradeRepository.getCompanyProfile(symbol);
  }
}
