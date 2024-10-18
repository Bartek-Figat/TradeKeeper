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
    const matchStage = _userId ? { $match: { userId: _userId } } : null; // Match trades for a specific user if userId is provided

    const pipeline = [
      ...(matchStage ? [matchStage] : []), // Include matchStage if it exists
      {
        $addFields: {
          entryDate: { $toDate: "$entryDate" }, // Convert entryDate to date type
          exitDate: { $toDate: "$exitDate" }, // Convert exitDate to date type
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
          totalTrades: { $sum: 1 }, // Count total trades
          averageEntryPrice: { $avg: "$entryPrice" }, // Average entry price
          averageExitPrice: { $avg: "$exitPrice" }, // Average exit price
          totalFees: { $sum: "$fees" }, // Total fees
          averageFees: { $avg: "$fees" }, // Average fees per trade
          maxExitPrice: { $max: "$exitPrice" }, // Maximum exit price
          minExitPrice: { $min: "$exitPrice" }, // Minimum exit price
          wins: {
            $sum: { $cond: [{ $gt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          }, // Count wins
          losses: {
            $sum: { $cond: [{ $lt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          }, // Count losses
          totalHoldingPeriod: {
            $sum: { $subtract: ["$exitDate", "$entryDate"] },
          }, // Total holding period
          entryPrices: { $push: "$entryPrice" }, // Collect entry prices
          exitPrices: { $push: "$exitPrice" }, // Collect exit prices
          notes: { $push: "$notes" }, // Collect notes
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
          winRate: { $multiply: [{ $divide: ["$wins", "$totalTrades"] }, 100] }, // Win rate percentage
          avgProfitLoss: { $divide: ["$totalProfitLoss", "$totalTrades"] }, // Average profit/loss per trade
          riskRewardRatio: {
            $divide: [
              "$totalProfitLoss",
              { $subtract: ["$totalQuantity", "$totalProfitLoss"] },
            ],
          }, // Risk/Reward Ratio
          averageHoldingPeriod: {
            $divide: ["$totalHoldingPeriod", "$totalTrades"],
          }, // Average holding period
          totalWins: "$wins", // Total wins
          totalLosses: "$losses", // Total losses
          winLossRatio: { $divide: ["$wins", { $add: ["$losses", 1] }] }, // Win/Loss ratio
          medianEntryPrice: {
            $arrayElemAt: [
              "$entryPrices",
              { $floor: { $divide: [{ $size: "$entryPrices" }, 2] } },
            ],
          }, // Median entry price
          medianExitPrice: {
            $arrayElemAt: [
              "$exitPrices",
              { $floor: { $divide: [{ $size: "$exitPrices" }, 2] } },
            ],
          }, // Median exit price
          stdDevEntryPrice: { $stdDevPop: "$entryPrices" }, // Standard deviation of entry prices
          stdDevExitPrice: { $stdDevPop: "$exitPrices" }, // Standard deviation of exit prices
          totalProfitLossPercentage: {
            $multiply: [
              { $divide: ["$totalProfitLoss", { $sum: "$entryPrices" }] },
              100,
            ],
          }, // Total profit/loss percentage
          notes: 1, // Include notes
        },
      },
      {
        $sort: { year: -1, month: -1, week: -1 }, // Sort by year, month, and week in descending order
      },
    ];

    const groupedTrades = await this.db.aggregate(pipeline).toArray();

    console.log(groupedTrades);

    // Format data for chart display
    const chartData = groupedTrades.map((trade) => {
      const averageHoldingPeriodDays =
        trade.averageHoldingPeriod / (1000 * 60 * 60 * 24);
      const averageHoldingPeriodWeeks = (averageHoldingPeriodDays / 7).toFixed(
        2
      );
      const averageHoldingPeriodMonths = (
        averageHoldingPeriodDays / 30.44
      ).toFixed(2); // Approximate average month length
      const averageHoldingPeriodYears = (
        averageHoldingPeriodDays / 365.25
      ).toFixed(2); // Account for leap years

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
        notes: trade.notes, // Include notes in the output
      };
    });

    // Generate a general note about the output
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

    // Return chart data along with the general note
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
}
