import { Controller, Get, Post, Put, Route, Path, Body, Request } from "tsoa";
import { CompanyProfileTradeRepository } from "../../services/trade/tradeService";
import { Trade } from "../../utils/tradeTypes";
import { CalculateTradeMetricsRepository } from "../../services/trade/calculateMetrics";
import { TradeDto } from "../../services/trade/trade.dto";
import { ICreateTrade } from "../../services/trade/trade.interface";
import { GroupTradesForChart } from "../../services/trade/groupTradesForChart";

@Route("custom-trades")
export class CustomTradeController extends Controller {
  private companyProfileTradeRepository: CompanyProfileTradeRepository =
    new CompanyProfileTradeRepository();
  private calculateTradeMetricsRepository: CalculateTradeMetricsRepository =
    new CalculateTradeMetricsRepository();
  private groupTradesForChart: GroupTradesForChart = new GroupTradesForChart();
  //@Security("jwt")
  @Get("/get-trade/{tradeId}")
  public async getTradeById(@Path() tradeId: string) {
    try {
      return await this.calculateTradeMetricsRepository.getTradeById(tradeId);
    } catch (error) {
      this.setStatus(500);
      throw new Error("Failed to fetch trade");
    }
  }

  // @Security("jwt")
  @Get("/get-all-trades")
  public async getAllTrades(): Promise<TradeDto[]> {
    return this.calculateTradeMetricsRepository.getAllTrades();
  }

  //  @Security("jwt")
  @Post("/create")
  public async createTrade(@Body() newTrade: any) {
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

  //@Security("jwt")
  @Put("/update-existing-trade/{tradeId}")
  public async updateTrade(
    @Path() tradeId: string,
    @Body() updatedTrade: Trade
  ) {
    return this.calculateTradeMetricsRepository.updateTrade(
      tradeId,
      updatedTrade as Partial<ICreateTrade>
    );
  }

  //@Security("jwt")
  @Get("/filter-trades")
  public async filterTrades(@Request() filter: any) {
    return await this.calculateTradeMetricsRepository.filterTrades(
      filter.query
    );
  }

  //@Security("jwt")
  @Get("/group-trades")
  public async tradesForChart() {
    try {
      return await this.groupTradesForChart.calculateTradeFrequencies();
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/analyze-trade-execution")
  public async analyzeTradeExecution() {
    try {
      return await this.groupTradesForChart.groupWinsAndLosses();
    } catch (error) {
      console.log(error);
    }
  }

  //@Security("jwt")
  @Get("/company/{symbol}")
  public async getCompanyProfile(@Path() symbol: string): Promise<any> {
    return this.companyProfileTradeRepository.getCompanyProfile(symbol);
  }
}
