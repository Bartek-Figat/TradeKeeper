import { ObjectId } from "mongodb";
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
  private db = new Database().getCollection("trades");

  async getSingleTradeDetails(tradeId: string) {
    try {
      const trade = await this.db.findOne({ _id: new ObjectId(tradeId) });

      if (!trade) {
        throw new Error(`Trade with ID ${tradeId} not found`);
      }

      const profitLoss = trade.exitPrice - trade.entryPrice;
      const gainPercentage = ((profitLoss / trade.entryPrice) * 100).toFixed(2);
      const holdingPeriod =
        (new Date(trade.exitDate).getTime() -
          new Date(trade.entryDate).getTime()) /
        (1000 * 60 * 60 * 24);
      const riskRewardRatio = (profitLoss / trade.entryPrice).toFixed(2);
      const annualizedReturn = (
        (Math.pow(1 + profitLoss / trade.entryPrice, 365 / holdingPeriod) - 1) *
        100
      ).toFixed(2);

      // Calculate average trade performance directly
      const trades = await this.db.find({}).toArray();
      const totalProfitLoss = trades.reduce(
        (acc, trade) => acc + (trade.exitPrice - trade.entryPrice),
        0
      );
      const totalGainPercentage = trades.reduce(
        (acc, trade) =>
          acc + ((trade.exitPrice - trade.entryPrice) / trade.entryPrice) * 100,
        0
      );

      const averageTradePerformance = {
        profitLoss: totalProfitLoss / trades.length,
        gainPercentage: totalGainPercentage / trades.length,
      };

      // Calculate additional statistics
      const standardDeviation = Math.sqrt(
        trades.reduce(
          (acc, trade) =>
            acc +
            Math.pow(
              trade.exitPrice -
                trade.entryPrice -
                averageTradePerformance.profitLoss,
              2
            ),
          0
        ) / trades.length
      );

      const sharpeRatio = standardDeviation
        ? (profitLoss / standardDeviation).toFixed(2)
        : "N/A";
      const downsideDeviation = Math.sqrt(
        trades.reduce(
          (acc, trade) =>
            acc + Math.pow(Math.min(0, trade.exitPrice - trade.entryPrice), 2),
          0
        ) / trades.length
      );
      const sortinoRatio = downsideDeviation
        ? (profitLoss / downsideDeviation).toFixed(2)
        : "N/A";

      const maxDrawdown = Math.min(
        ...trades.map((trade) => trade.exitPrice - trade.entryPrice)
      );
      const maxDrawdownPercentage = (
        (maxDrawdown / trade.entryPrice) *
        100
      ).toFixed(2);

      return {
        symbol: trade.symbol,
        entryPrice: trade.entryPrice,
        exitPrice: trade.exitPrice,
        profitLoss: profitLoss.toFixed(2),
        gainPercentage,
        holdingPeriodDays: holdingPeriod.toFixed(2),
        riskRewardRatio,
        annualizedReturn,
        fees: trade.fees,
        notes: trade.notes,
        comparisonToAverage: {
          profitLossVsAverage: (
            profitLoss - averageTradePerformance.profitLoss
          ).toFixed(2),
          gainPercentageVsAverage: (
            parseFloat(gainPercentage) - averageTradePerformance.gainPercentage
          ).toFixed(2),
        },
        additionalStatistics: {
          sharpeRatio,
          sortinoRatio,
          maxDrawdown: maxDrawdown.toFixed(2),
          maxDrawdownPercentage,
        },
      };
    } catch (error) {
      console.error("Error retrieving trade details:", error);
      throw error;
    }
  }

  // Data Retrieval Methods
  async getUserTrades(userId: string) {
    const userTrades = await this.db.find({ userId }).toArray();
    console.log(
      `Trades for User ID ${userId}:`,
      JSON.stringify(userTrades, null, 2)
    );
    return userTrades; // Return user trades for further use
  }

  async getBestTrades(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $project: {
          _id: 0,
          symbol: 1,
          entryPrice: 1,
          exitPrice: 1,
          profitLoss: { $subtract: ["$exitPrice", "$entryPrice"] },
          gainPercentage: {
            $multiply: [
              {
                $divide: [
                  { $subtract: ["$exitPrice", "$entryPrice"] },
                  "$entryPrice",
                ],
              },
              100,
            ],
          },
        },
      },
      {
        $sort: { profitLoss: -1 }, // Sort by profit/loss in descending order
      },
      {
        $limit: 10, // Limit to the top 10 trades
      },
    ];

    const bestTrades = await this.db.aggregate(pipeline).toArray();

    const maxGainPercentage = Math.max(
      ...bestTrades.map((trade) => trade.gainPercentage)
    );

    return bestTrades.map((trade) => ({
      symbol: trade.symbol,
      entryPrice: trade.entryPrice,
      exitPrice: trade.exitPrice,
      profitLoss: trade.profitLoss.toFixed(2),
      gainPercentage: (
        100 -
        (trade.gainPercentage / maxGainPercentage) * 100
      ).toFixed(2),
    }));
  }

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

  // Calculation Methods
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

  // Calculation Methods Continued
  async calculateAverageProfitLossByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalProfitLoss: { $sum: "$profitLoss" },
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          averageProfitLoss: { $divide: ["$totalProfitLoss", "$totalTrades"] },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateTotalFeesByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalFees: { $sum: "$fees" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalFees: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMaxDrawdownByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          maxDrawdown: {
            $min: { $subtract: ["$exitPrice", "$entryPrice"] },
          },
          totalEntryPrice: { $sum: "$entryPrice" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          maxDrawdownPercentage: {
            $multiply: [{ $divide: ["$maxDrawdown", "$totalEntryPrice"] }, 100],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateSharpeRatioByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalProfitLoss: { $sum: "$profitLoss" },
          totalTrades: { $sum: 1 },
          profitLosses: { $push: "$profitLoss" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalProfitLoss: 1,
          totalTrades: 1,
          standardDeviation: {
            $stdDevPop: "$profitLosses",
          },
          sharpeRatio: {
            $cond: {
              if: { $eq: ["$standardDeviation", 0] },
              then: 0,
              else: {
                $divide: ["$totalProfitLoss", "$standardDeviation"],
              },
            },
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateSortinoRatioByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalProfitLoss: { $sum: "$profitLoss" },
          downsideDeviations: {
            $push: {
              $cond: [{ $lt: ["$profitLoss", 0] }, "$profitLoss", 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalProfitLoss: 1,
          downsideDeviation: { $stdDevPop: "$downsideDeviations" },
          sortinoRatio: {
            $cond: {
              if: { $eq: ["$downsideDeviation", 0] },
              then: 0,
              else: {
                $divide: ["$totalProfitLoss", "$downsideDeviation"],
              },
            },
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateWinLossRatioByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          wins: {
            $sum: { $cond: [{ $gt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          },
          losses: {
            $sum: { $cond: [{ $lt: ["$exitPrice", "$entryPrice"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          winLossRatio: {
            $cond: {
              if: { $eq: ["$losses", 0] },
              then: "$wins",
              else: { $divide: ["$wins", "$losses"] },
            },
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateAverageHoldingPeriodByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          holdingPeriod: { $subtract: ["$exitDate", "$entryDate"] },
        },
      },
      {
        $group: {
          _id: "$tradeType",
          totalHoldingPeriod: { $sum: "$holdingPeriod" },
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          averageHoldingPeriod: {
            $divide: ["$totalHoldingPeriod", "$totalTrades"],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results.map((result) => ({
      ...result,
      averageHoldingPeriodDays: (
        result.averageHoldingPeriod /
        (1000 * 60 * 60 * 24)
      ).toFixed(2),
    }));
  }

  async calculateMedianProfitLossByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          profitLosses: { $push: "$profitLoss" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          medianProfitLoss: {
            $arrayElemAt: [
              {
                $slice: [
                  { $sortArray: { input: "$profitLosses", sortBy: 1 } },
                  { $floor: { $divide: [{ $size: "$profitLosses" }, 2] } },
                  1,
                ],
              },
              0,
            ],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateTotalQuantityByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalQuantity: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMaxProfitByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          maxProfit: { $max: "$profitLoss" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          maxProfit: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMinLossByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          minLoss: { $min: "$profitLoss" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          minLoss: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateProfitFactorByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          grossProfit: {
            $sum: { $cond: [{ $gt: ["$profitLoss", 0] }, "$profitLoss", 0] },
          },
          grossLoss: {
            $sum: { $cond: [{ $lt: ["$profitLoss", 0] }, "$profitLoss", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          profitFactor: {
            $cond: {
              if: { $eq: ["$grossLoss", 0] },
              then: "Infinity",
              else: { $divide: ["$grossProfit", { $abs: "$grossLoss" }] },
            },
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateAverageTradeDurationByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          // Convert entryDate and exitDate to Date objects
          entryDate: { $toDate: "$entryDate" },
          exitDate: { $toDate: "$exitDate" },
          tradeDuration: {
            $subtract: [{ $toDate: "$exitDate" }, { $toDate: "$entryDate" }],
          },
        },
      },
      {
        $group: {
          _id: "$tradeType",
          totalDuration: { $sum: "$tradeDuration" },
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          averageTradeDuration: {
            $divide: ["$totalDuration", "$totalTrades"],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results.map((result) => ({
      ...result,
      averageTradeDurationDays: (
        result.averageTradeDuration /
        (1000 * 60 * 60 * 24)
      ).toFixed(2),
    }));
  }

  async calculateMaxHoldingPeriodByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          holdingPeriod: { $subtract: ["$exitDate", "$entryDate"] },
        },
      },
      {
        $group: {
          _id: "$tradeType",
          maxHoldingPeriod: { $max: "$holdingPeriod" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          maxHoldingPeriodDays: {
            $divide: ["$maxHoldingPeriod", 1000 * 60 * 60 * 24],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMinHoldingPeriodByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $addFields: {
          holdingPeriod: { $subtract: ["$exitDate", "$entryDate"] },
        },
      },
      {
        $group: {
          _id: "$tradeType",
          minHoldingPeriod: { $min: "$holdingPeriod" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          minHoldingPeriodDays: {
            $divide: ["$minHoldingPeriod", 1000 * 60 * 60 * 24],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateTotalProfitByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalProfit: {
            $sum: { $cond: [{ $gt: ["$profitLoss", 0] }, "$profitLoss", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalProfit: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateTotalLossByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalLoss: {
            $sum: { $cond: [{ $lt: ["$profitLoss", 0] }, "$profitLoss", 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalLoss: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateAverageFeesByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalFees: { $sum: "$fees" },
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          averageFees: { $divide: ["$totalFees", "$totalTrades"] },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMaxFeesByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          maxFees: { $max: "$fees" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          maxFees: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateMinFeesByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          minFees: { $min: "$fees" },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          minFees: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateAverageRiskRewardRatioByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalRiskReward: {
            $sum: {
              $divide: [
                { $subtract: ["$exitPrice", "$entryPrice"] },
                { $subtract: ["$entryPrice", "$exitPrice"] },
              ],
            },
          },
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          averageRiskRewardRatio: {
            $divide: ["$totalRiskReward", "$totalTrades"],
          },
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }

  async calculateTotalTradesByType(_userId?: string) {
    const matchStage = _userId ? { $match: { userId: _userId } } : null;

    const pipeline = [
      ...(matchStage ? [matchStage] : []),
      {
        $group: {
          _id: "$tradeType",
          totalTrades: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          tradeType: "$_id",
          totalTrades: 1,
        },
      },
    ];

    const results = await this.db.aggregate(pipeline).toArray();
    return results;
  }
}
