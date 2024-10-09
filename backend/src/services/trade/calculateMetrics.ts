import { ITrade, ICreateTrade, TradeFilter } from "./trade.interface";
import { TradeDto } from "./trade.dto";
import { Database } from "../../config/db/database";
import { ApiError } from "../../error/apiError";
import { ObjectId } from "mongodb";

export class CalculateTradeMetricsRepository {
  private readonly trades: string = "trades";
  private db = new Database().getCollection(this.trades);

  async getTradeById(tradeId: string): Promise<TradeDto> {
    try {
      const trade = await this.db.findOne<ITrade>({
        _id: new ObjectId(tradeId),
      });
      if (!trade) {
        throw new ApiError("Trade not found", 404);
      }
      const allTrades = await this.db.find<ITrade>({}).toArray();
      return this.calculateMetrics(trade, allTrades);
    } catch (error) {
      console.error("Error fetching trade:", error);
      throw new ApiError("Error fetching trade", 500);
    }
  }

  async getAllTrades(
    page: number = 1,
    limit: number = 10
  ): Promise<TradeDto[]> {
    try {
      const skip = (page - 1) * limit;
      const trades = await this.db
        .find<ITrade>({})
        .skip(skip)
        .limit(limit)
        .toArray();
      const allTrades = await this.db.find<ITrade>({}).toArray();
      return trades.map((trade) => this.calculateMetrics(trade, allTrades));
    } catch (error) {
      console.error("Error fetching trades:", error);
      throw new ApiError("Error fetching trades", 500);
    }
  }

  async createTrade(newTrade: ICreateTrade) {
    try {
      if (!["stock", "forex", "crypto"].includes(newTrade.tradeType)) {
        throw new ApiError("Invalid trade type", 400);
      }

      const result = await this.db.insertOne(newTrade);
      if (result.insertedId) {
        return {
          ...newTrade,
          entryDate: newTrade.entryDate,
          exitDate: newTrade.exitDate,
        };
      } else {
        throw new ApiError("Failed to insert trade", 400);
      }
    } catch (error) {
      console.error("Error creating trade:", error);
      throw new ApiError("Failed to create trade", 500);
    }
  }

  async updateTrade(
    tradeId: string,
    updatedTradeData: Partial<ICreateTrade>
  ): Promise<TradeDto> {
    try {
      if (
        updatedTradeData.tradeType &&
        !["stock", "forex", "crypto"].includes(updatedTradeData.tradeType)
      ) {
        throw new ApiError("Invalid trade type", 400);
      }

      const result = await this.db.updateOne(
        { _id: new ObjectId(tradeId) },
        { $set: updatedTradeData }
      );

      if (result.matchedCount === 0) {
        throw new ApiError("Trade not found", 404);
      }

      const updatedTrade = await this.db.findOne<ITrade>({
        _id: new ObjectId(tradeId),
      });
      if (!updatedTrade) {
        throw new ApiError("Failed to retrieve updated trade", 500);
      }

      return this.calculateMetrics(
        updatedTrade,
        await this.db.find<ITrade>({}).toArray()
      );
    } catch (error) {
      console.error("Error updating trade:", error);
      throw new ApiError("Failed to update trade", 500);
    }
  }

  async filterTrades(
    filter: TradeFilter,
    page: number = 1,
    limit: number = 10
  ): Promise<TradeDto[]> {
    try {
      const query: any = {};

      if (filter.userId) query.userId = filter.userId;
      if (filter.tradeType) query.tradeType = filter.tradeType;
      if (filter.symbol) query.symbol = filter.symbol;
      if (filter.startDate || filter.endDate) {
        query.createdAt = {};
        if (filter.startDate) query.createdAt.$gte = new Date(filter.startDate);
        if (filter.endDate) query.createdAt.$lte = new Date(filter.endDate);
      }

      const skip = (page - 1) * limit;
      const trades = await this.db
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();
      const allTrades = await this.db.find<ITrade>({}).toArray();

      const tradesWithMetrics = trades.map((trade) =>
        this.calculateMetrics(trade as unknown as ITrade, allTrades)
      );

      return tradesWithMetrics.filter((trade) => {
        if (
          filter.minWinRate !== undefined &&
          trade.winRate !== undefined &&
          trade.winRate < filter.minWinRate
        )
          return false;
        if (
          filter.maxWinRate !== undefined &&
          trade.winRate !== undefined &&
          trade.winRate > filter.maxWinRate
        )
          return false;
        if (
          filter.minProfitLoss !== undefined &&
          trade.avgProfitLoss !== undefined &&
          trade.avgProfitLoss < filter.minProfitLoss
        )
          return false;
        if (
          filter.maxProfitLoss !== undefined &&
          trade.avgProfitLoss !== undefined &&
          trade.avgProfitLoss > filter.maxProfitLoss
        )
          return false;
        return true;
      });
    } catch (error) {
      console.error("Error filtering trades:", error);
      throw new ApiError("Failed to filter trades", 500);
    }
  }

  private calculateMetrics(trade: ITrade, allTrades: ITrade[]): TradeDto {
    const userTrades = allTrades.filter((t) => t.userId === trade.userId);
    trade.winRate = this.calculateWinRate(userTrades);
    trade.avgProfitLoss = this.calculateAvgProfitLoss(userTrades);
    trade.riskRewardRatio = this.calculateRiskRewardRatio(trade);
    trade.maxDrawdown = this.calculateMaxDrawdown(userTrades);
    trade.sharpeRatio = this.calculateSharpeRatio(userTrades);
    trade.profitFactor = this.calculateProfitFactor(userTrades);
    trade.volatility = this.calculateVolatility(userTrades);
    trade.sortinoRatio = this.calculateSortinoRatio(userTrades);
    trade.avgHoldingPeriod = this.calculateAvgHoldingPeriod(userTrades);
    trade.improvementSuggestions = this.suggestImprovements(trade);
    return trade as TradeDto;
  }

  private calculateWinRate(trades: ITrade[]): number {
    const wins = trades.filter(
      (trade) => trade.exitPrice > trade.entryPrice
    ).length;
    return trades.length ? (wins / trades.length) * 100 : 0;
  }

  private calculateAvgProfitLoss(trades: ITrade[]): number {
    const totalProfitLoss = trades.reduce(
      (acc, trade) => acc + (trade.exitPrice - trade.entryPrice),
      0
    );
    return trades.length ? totalProfitLoss / trades.length : 0;
  }

  private calculateRiskRewardRatio(trade: ITrade): number {
    const risk = trade.entryPrice - (trade.stopLossLevel || trade.entryPrice);
    const reward = trade.exitPrice - trade.entryPrice;
    return risk !== 0 ? reward / risk : 0;
  }

  private calculateMaxDrawdown(trades: ITrade[]): number {
    let peak = -Infinity;
    let maxDrawdown = 0;

    trades.forEach((trade) => {
      const value = trade.exitPrice - trade.entryPrice;
      if (value > peak) peak = value;
      const drawdown = peak - value;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    });

    return maxDrawdown;
  }

  private calculateSharpeRatio(trades: ITrade[]): number {
    const returns = trades.map((trade) => trade.exitPrice - trade.entryPrice);
    const avgReturn = returns.reduce((acc, r) => acc + r, 0) / returns.length;
    const stdDev = Math.sqrt(
      returns
        .map((r) => Math.pow(r - avgReturn, 2))
        .reduce((acc, val) => acc + val, 0) / returns.length
    );
    const riskFreeRate = 0.01; // Example risk-free rate
    return stdDev !== 0 ? (avgReturn - riskFreeRate) / stdDev : 0;
  }

  private calculateProfitFactor(trades: ITrade[]): number {
    const grossProfit = trades
      .filter((trade) => trade.exitPrice > trade.entryPrice)
      .reduce((acc, trade) => acc + (trade.exitPrice - trade.entryPrice), 0);
    const grossLoss = trades
      .filter((trade) => trade.exitPrice < trade.entryPrice)
      .reduce((acc, trade) => acc + (trade.entryPrice - trade.exitPrice), 0);
    return grossLoss !== 0 ? grossProfit / Math.abs(grossLoss) : 0;
  }

  private calculateVolatility(trades: ITrade[]): number {
    const returns = trades.map((trade) => trade.exitPrice - trade.entryPrice);
    const avgReturn = returns.reduce((acc, r) => acc + r, 0) / returns.length;
    return Math.sqrt(
      returns
        .map((r) => Math.pow(r - avgReturn, 2))
        .reduce((acc, val) => acc + val, 0) / returns.length
    );
  }

  private calculateSortinoRatio(trades: ITrade[]): number {
    const returns = trades.map((trade) => trade.exitPrice - trade.entryPrice);
    const avgReturn = returns.reduce((acc, r) => acc + r, 0) / returns.length;
    const downsideDeviation = Math.sqrt(
      returns
        .filter((r) => r < 0)
        .map((r) => Math.pow(r, 2))
        .reduce((acc, val) => acc + val, 0) / returns.length
    );
    const riskFreeRate = 0.01; // Example risk-free rate
    return downsideDeviation !== 0
      ? (avgReturn - riskFreeRate) / downsideDeviation
      : 0;
  }

  private calculateAvgHoldingPeriod(trades: ITrade[]): number {
    const totalHoldingPeriod = trades.reduce((acc, trade) => {
      if (trade.entryDate && trade.exitDate) {
        return acc + (trade.exitDate.getTime() - trade.entryDate.getTime());
      }
      return acc;
    }, 0);
    return trades.length ? totalHoldingPeriod / trades.length : 0;
  }

  private suggestImprovements(trade: ITrade): string[] {
    const suggestions: string[] = [];

    if (trade.winRate !== undefined && trade.winRate < 50) {
      suggestions.push(
        "Consider reviewing your entry and exit strategies to improve your win rate."
      );
    }

    if (trade.avgProfitLoss !== undefined && trade.avgProfitLoss < 0) {
      suggestions.push(
        "Analyze your trades to identify patterns leading to losses and adjust your strategy."
      );
    }

    if (trade.riskRewardRatio !== undefined && trade.riskRewardRatio < 1) {
      suggestions.push(
        "Aim for a higher reward relative to risk to improve your risk/reward ratio."
      );
    }

    if (trade.maxDrawdown !== undefined && trade.maxDrawdown > 20) {
      suggestions.push(
        "Implement stricter risk management to reduce drawdowns."
      );
    }

    if (trade.sharpeRatio !== undefined && trade.sharpeRatio < 1) {
      suggestions.push(
        "Focus on increasing returns or reducing volatility to improve your Sharpe ratio."
      );
    }

    if (trade.profitFactor !== undefined && trade.profitFactor < 1.5) {
      suggestions.push(
        "Work on increasing your gross profit relative to gross loss to enhance profitability."
      );
    }

    if (trade.volatility !== undefined && trade.volatility > 10) {
      suggestions.push(
        "Consider strategies to stabilize your trading outcomes and reduce volatility."
      );
    }

    if (trade.sortinoRatio !== undefined && trade.sortinoRatio < 1) {
      suggestions.push(
        "Focus on minimizing downside risk to improve your Sortino ratio."
      );
    }

    if (trade.avgHoldingPeriod !== undefined && trade.avgHoldingPeriod > 30) {
      suggestions.push(
        "Evaluate if shorter holding periods could lead to better returns."
      );
    }

    return suggestions;
  }
}
