import {
  Controller,
  Get,
  Post,
  Put,
  Route,
  Path,
  Body,
  Security,
  Query,
} from "tsoa";
import { CompanyProfileTradeRepository } from "../../services/trade/tradeService";
import { Trade } from "../../utils/tradeTypes";
import { CalculateTradeMetricsRepository } from "../../services/trade/calculateMetrics";
import { TradeDto } from "../../services/trade/trade.dto";
import {
  ICreateTrade,
  TradeFilter,
} from "../../services/trade/trade.interface";

@Route("custom-trades")
export class CustomTradeController extends Controller {
  private companyProfileTradeRepository: CompanyProfileTradeRepository =
    new CompanyProfileTradeRepository();
  private calculateTradeMetricsRepository: CalculateTradeMetricsRepository =
    new CalculateTradeMetricsRepository();

  @Security("jwt")
  @Security("jwt")
  @Get("/get-trade/{tradeId}")
  public async getTradeById(@Path() tradeId: string): Promise<TradeDto> {
    try {
      return await this.calculateTradeMetricsRepository.getTradeById(tradeId);
    } catch (error) {
      this.setStatus(500);
      throw new Error("Failed to fetch trade");
    }
  }

  @Get("/get-all-trades")
  public async getAllTrades(): Promise<TradeDto[]> {
    return this.calculateTradeMetricsRepository.getAllTrades();
  }

  @Security("jwt")
  @Post("/create")
  public async createTrade(@Body() newTrade: ICreateTrade): Promise<TradeDto> {
    try {
      const createdTrade =
        await this.calculateTradeMetricsRepository.createTrade(newTrade);
      this.setStatus(201);
      return createdTrade;
    } catch (error) {
      this.setStatus(500);
      throw new Error("Failed to create trade");
    }
  }

  @Security("jwt")
  @Put("/update-existing-trade/{tradeId}")
  public async updateTrade(
    @Path() tradeId: string,
    @Body() updatedTrade: Trade
  ) {
    return this.calculateTradeMetricsRepository.updateTrade(
      tradeId,
      updatedTrade
    );
  }

  @Security("jwt")
  @Get("/filter-trades")
  public async filterTrades(
    @Body() filter: TradeFilter,
    @Query() page: number = 1,
    @Query() limit: number = 10
  ): Promise<TradeDto[]> {
    try {
      return await this.calculateTradeMetricsRepository.filterTrades(
        filter,
        page,
        limit
      );
    } catch (error) {
      this.setStatus(500);
      throw new Error("Failed to filter trades");
    }
  }

  @Security("jwt")
  @Get("/company/{symbol}")
  public async getCompanyProfile(@Path() symbol: string): Promise<any> {
    return this.companyProfileTradeRepository.getCompanyProfile(symbol);
  }
}
