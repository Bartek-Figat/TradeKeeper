import { Database } from "../../config/db/database";

type TradeFrequency = {
  _id: {
    year: number;
    month?: number;
    week?: number;
    day?: number;
  };
  tradeCount: number;
  from: Date;
  to: Date;
};

type TradeFrequencies = {
  monthly: TradeFrequency[];
  weekly: TradeFrequency[];
  daily: TradeFrequency[];
};

export class GroupTradesForChart {
  //private readonly trades: string = "trades";
  private db = new Database().getCollection("trades");

  async groupTradesForChart(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          entryDate: { $toDate: "$entryDate" },
          exitDate: { $toDate: "$exitDate" },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$entryDate" },
            month: { $month: "$entryDate" },
            week: { $week: "$entryDate" },
          },
          totalQuantity: { $sum: "$quantity" },
          totalProfitLoss: {
            $sum: { $subtract: ["$exitPrice", "$entryPrice"] },
          },
          totalTrades: { $sum: 1 },
          averageEntryPrice: { $avg: "$entryPrice" },
          averageExitPrice: { $avg: "$exitPrice" },
          totalFees: { $sum: "$fees" },
          averageFees: { $avg: "$fees" },
          maxExitPrice: { $max: "$exitPrice" },
          minExitPrice: { $min: "$exitPrice" },
          wins: {
            $sum: { $cond: [{ $gt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          },
          losses: {
            $sum: { $cond: [{ $lt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          },
          totalHoldingPeriod: {
            $sum: { $subtract: ["$exitDate", "$entryDate"] },
          },
          entryPrices: { $push: "$entryPrice" },
          exitPrices: { $push: "$exitPrice" },
          notes: { $push: "$notes" },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          week: "$_id.week",
          totalQuantity: 1,
          totalProfitLoss: 1,
          totalTrades: 1,
          averageEntryPrice: 1,
          averageExitPrice: 1,
          totalFees: 1,
          averageFees: 1,
          maxExitPrice: 1,
          minExitPrice: 1,
          winRate: { $multiply: [{ $divide: ["$wins", "$totalTrades"] }, 100] },
          avgProfitLoss: { $divide: ["$totalProfitLoss", "$totalTrades"] },
          riskRewardRatio: {
            $divide: [
              "$totalProfitLoss",
              { $subtract: ["$totalQuantity", "$totalProfitLoss"] },
            ],
          },
          averageHoldingPeriod: {
            $divide: ["$totalHoldingPeriod", "$totalTrades"],
          },
          totalWins: "$wins",
          totalLosses: "$losses",
          winLossRatio: { $divide: ["$wins", { $add: ["$losses", 1] }] },
          medianEntryPrice: {
            $arrayElemAt: [
              "$entryPrices",
              { $floor: { $divide: [{ $size: "$entryPrices" }, 2] } },
            ],
          },
          medianExitPrice: {
            $arrayElemAt: [
              "$exitPrices",
              { $floor: { $divide: [{ $size: "$exitPrices" }, 2] } },
            ],
          },
          stdDevEntryPrice: { $stdDevPop: "$entryPrices" },
          stdDevExitPrice: { $stdDevPop: "$exitPrices" },
          totalProfitLossPercentage: {
            $multiply: [
              { $divide: ["$totalProfitLoss", { $sum: "$entryPrices" }] },
              100,
            ],
          },
          notes: 1,
        },
      },
      {
        $sort: { year: -1, month: -1, week: -1 },
      },
    ];

    const groupedTrades = await this.db.aggregate(pipeline).toArray();

    const chartData = groupedTrades.map((trade) => {
      const averageHoldingPeriodDays =
        trade.averageHoldingPeriod / (1000 * 60 * 60 * 24);
      const averageHoldingPeriodWeeks = (averageHoldingPeriodDays / 7).toFixed(
        2
      );
      const averageHoldingPeriodMonths = (
        averageHoldingPeriodDays / 30.44
      ).toFixed(2);
      const averageHoldingPeriodYears = (
        averageHoldingPeriodDays / 365.25
      ).toFixed(2);

      // Generate a note for each week
      const weeklyNote = `Week ${trade.week} of ${trade.month}/${
        trade.year
      }: Win rate is ${trade.winRate.toFixed(
        2
      )}%. Total profit/loss percentage is ${trade.totalProfitLossPercentage.toFixed(
        2
      )}%. Average holding period is ${averageHoldingPeriodDays.toFixed(
        2
      )} days.`;

      return {
        label: `Week ${trade.week} of ${trade.month}/${trade.year}`,
        totalQuantity: trade.totalQuantity,
        totalProfitLoss: trade.totalProfitLoss,
        totalTrades: trade.totalTrades,
        averageEntryPrice: trade.averageEntryPrice,
        averageExitPrice: trade.averageExitPrice,
        totalFees: trade.totalFees,
        averageFees: trade.averageFees,
        maxExitPrice: trade.maxExitPrice,
        minExitPrice: trade.minExitPrice,
        winRate: trade.winRate,
        avgProfitLoss: trade.avgProfitLoss,
        riskRewardRatio: trade.riskRewardRatio,
        averageHoldingPeriodDays: averageHoldingPeriodDays.toFixed(2),
        averageHoldingPeriodWeeks,
        averageHoldingPeriodMonths,
        averageHoldingPeriodYears,
        totalWins: trade.totalWins,
        totalLosses: trade.totalLosses,
        winLossRatio: trade.winLossRatio,
        medianEntryPrice: trade.medianEntryPrice,
        medianExitPrice: trade.medianExitPrice,
        stdDevEntryPrice: trade.stdDevEntryPrice.toFixed(2),
        stdDevExitPrice: trade.stdDevExitPrice.toFixed(2),
        totalProfitLossPercentage: trade.totalProfitLossPercentage.toFixed(2),
        notes: trade.notes,
        weeklyNote, // Add the weekly note
      };
    });

    const totalProfitLossPercentages = chartData.map((trade) =>
      parseFloat(trade.totalProfitLossPercentage)
    );
    const minProfitLossPercentage = Math.min(
      ...totalProfitLossPercentages
    ).toFixed(2);
    const maxProfitLossPercentage = Math.max(
      ...totalProfitLossPercentages
    ).toFixed(2);
    const averageHoldingPeriod = (
      chartData.reduce(
        (acc, trade) => acc + parseFloat(trade.averageHoldingPeriodDays),
        0
      ) / chartData.length
    ).toFixed(2);

    const generalNote = `The analysis covers ${
      chartData.length
    } weeks of trading data. The average win rate is ${(
      chartData.reduce((acc, trade) => acc + trade.winRate, 0) /
      chartData.length
    ).toFixed(
      2
    )}%. The total profit/loss percentage ranges from ${minProfitLossPercentage}% to ${maxProfitLossPercentage}%, indicating diverse trading outcomes. The average holding period is ${averageHoldingPeriod} days. Observations and notes are included for each trade to provide insights for future strategies.`;

    console.log(chartData);

    return { chartData, generalNote };
  }

  async getUserTrades(userId: string) {
    const userTrades = await this.db.find({ userId }).toArray();
    console.log(
      `Trades for User ID ${userId}:`,
      JSON.stringify(userTrades, null, 2)
    );
    return userTrades; // Return user trades for further use
  }

  async calculateTradeFrequencies(_userId?: string): Promise<TradeFrequencies> {
    try {
      // Validate userId if provided
      if (_userId && typeof _userId !== "string") {
        throw new Error("Invalid userId format");
      }

      const matchStage = _userId ? { $match: { userId: _userId } } : null;

      const pipeline = [
        ...(matchStage ? [matchStage] : []),
        {
          $addFields: {
            entryDate: { $toDate: "$entryDate" },
            exitDate: { $toDate: "$exitDate" }, // Ensure exitDate is also converted to date
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$entryDate" },
              week: { $week: "$exitDate" },
            },
            tradeCount: { $sum: 1 },
            from: { $min: "$entryDate" }, // Earliest entry date in the week
            to: { $max: "$exitDate" }, // Latest exit date in the week
            totalProfit: { $sum: "$profitLoss" }, // Total profit for the week
            averageDuration: {
              $avg: {
                $subtract: ["$exitDate", "$entryDate"],
              },
            }, // Average trade duration
            trades: {
              $push: {
                tradeId: "$symbol",
                entryDate: "$entryDate",
                exitDate: "$exitDate",
                profit: "$profit",
              },
            }, // Array of trades
          },
        },
        { $sort: { "_id.year": -1, "_id.week": -1 } }, // Sort by year and week
      ];

      const tradeFrequencies = await this.db.aggregate(pipeline).toArray();

      // Map the result to the TradeFrequency type
      const weeklyData: TradeFrequency[] = tradeFrequencies.map((doc) => ({
        _id: doc._id,
        tradeCount: doc.tradeCount,
        from: new Date(doc.from), // Ensure from is a Date
        to: new Date(doc.to), // Ensure to is a Date
        totalProfit: doc.totalProfit,
        averageDuration: doc.averageDuration,
        trades: doc.trades,
      }));

      // Log the result for debugging purposes
      console.log("Trade Frequencies:", weeklyData);

      // Return the structured result
      return {
        weekly: weeklyData,
      } as TradeFrequencies;
    } catch (error) {
      console.error("Error calculating trade frequencies:", error);
      throw error; // Re-throw the error after logging
    }
  }

  async groupWinsAndLosses(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          entryDate: { $toDate: "$entryDate" },
          exitDate: { $toDate: "$exitDate" },
        },
      },
      {
        $project: {
          _id: 0,
          symbol: 1,
          entryDate: { $toLong: "$entryDate" }, // Convert to Unix timestamp in milliseconds
          exitDate: { $toLong: "$exitDate" }, // Convert to Unix timestamp in milliseconds
          entryPrice: 1,
          exitPrice: 1,
          profitLoss: { $subtract: ["$exitPrice", "$entryPrice"] },
        },
      },
    ];

    const trades = await this.db.aggregate(pipeline).toArray();

    const wins = trades
      .filter((trade) => trade.profitLoss > 0)
      .map((trade) => ({
        symbol: trade.symbol,
        entryDate: trade.entryDate,
        exitDate: trade.exitDate,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        profitLoss: trade.profitLoss,
      }))
      .sort((a, b) => b.exitDate - a.exitDate)
      .slice(0, 3);

    const losses = trades
      .filter((trade) => trade.profitLoss <= 0)
      .map((trade) => ({
        symbol: trade.symbol,
        entryDate: trade.entryDate,
        exitDate: trade.exitDate,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        profitLoss: trade.profitLoss,
      }))
      .sort((a, b) => b.exitDate - a.exitDate)
      .slice(0, 3);

    // Calculate additional metrics
    const totalProfitLoss = trades.reduce(
      (acc, trade) => acc + trade.profitLoss,
      0
    );
    const portfolioValue = trades.reduce(
      (acc, trade) => acc + trade.entryPrice,
      0
    );
    const standardDeviation = Math.sqrt(
      trades.reduce(
        (acc, trade) =>
          acc + Math.pow(trade.profitLoss - totalProfitLoss / trades.length, 2),
        0
      ) / trades.length
    );
    const zScore = 1.65; // For 95% confidence
    const VaR = portfolioValue * standardDeviation * zScore;
    const ES = VaR / (1 - 0.95); // Simplified ES calculation

    const sharpeRatio = totalProfitLoss / standardDeviation; // Assuming risk-free rate is 0
    const sortinoRatio = totalProfitLoss / standardDeviation; // Simplified, assuming downside deviation is similar

    const riskRewardRatio =
      totalProfitLoss / Math.abs(totalProfitLoss - portfolioValue);
    const maxDrawdown =
      Math.min(...trades.map((trade) => trade.profitLoss)) / portfolioValue;

    // General note based on calculations
    const generalNote = `
      Based on the recent trades analysis:
      - The Value at Risk (VaR) is ${VaR.toFixed(
        2
      )}, indicating the potential maximum loss over a specific period. This metric helps in understanding the risk of loss in your portfolio.
      - The Expected Shortfall (ES) is ${ES.toFixed(
        2
      )}, suggesting the average loss beyond the VaR threshold. It provides a more comprehensive risk assessment by considering extreme losses.
      - The Sharpe Ratio is ${sharpeRatio.toFixed(
        2
      )}, which is a measure of risk-adjusted return. A higher ratio indicates better risk-adjusted performance.
      - The Sortino Ratio is ${sortinoRatio.toFixed(
        2
      )}, focusing on downside risk. Consider strategies to improve this by minimizing negative returns.
      - The Risk-Reward Ratio is ${riskRewardRatio.toFixed(
        2
      )}, showing the potential profit relative to potential loss. Aim for a higher ratio by optimizing entry and exit points.
      - The Maximum Drawdown is ${(maxDrawdown * 100).toFixed(
        2
      )}%, reflecting the largest peak-to-trough decline. Strategies to reduce drawdown can enhance portfolio stability.
  
      **Examples:**
      - **VaR Calculation Example**: Assume you have a portfolio worth $1,000,000, with a daily return standard deviation of 2%, and you want to calculate the VaR at a 95% confidence level: 
        \`VaR = $1,000,000 \times 0.02 \times 1.65 = $33,000\`. This means there is a 95% chance that the portfolio will not lose more than $33,000 in a single day.
      - **ES Calculation Example**: A mixed asset portfolio (stocks, bonds, and commodities) has a VaR of $500,000 at a 95% confidence level. The ES might be $600,000, suggesting that in the worst 5% of scenarios, the average loss would be $600,000.
    `;

    console.log("Recent Wins:", wins);
    console.log("Recent Losses:", losses);
    console.log("Risk Metrics:", {
      VaR: VaR.toFixed(2),
      ES: ES.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      sortinoRatio: sortinoRatio.toFixed(2),
      riskRewardRatio: riskRewardRatio.toFixed(2),
      maxDrawdown: (maxDrawdown * 100).toFixed(2) + "%",
    });
    console.log("General Note:", generalNote);

    return {
      wins,
      losses,
      VaR: VaR.toFixed(2),
      ES: ES.toFixed(2),
      sharpeRatio: sharpeRatio.toFixed(2),
      sortinoRatio: sortinoRatio.toFixed(2),
      riskRewardRatio: riskRewardRatio.toFixed(2),
      maxDrawdown: (maxDrawdown * 100).toFixed(2) + "%",
      generalNote,
    };
  }
}
