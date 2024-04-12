import { Database } from "../config/db/database";

// models/Trade.ts
export interface Trade {
  id: string;
  userId: string;
  isShared: boolean;
  viewCount: number;
}

// models/User.ts
export interface User {
  id: string;
  earnings: number;
  subscription?: {
    isActive: boolean;
  };
}

export class TradeRepository {
  private database: Database = new Database();
  private tradeShare = this.database.getCollection<Trade>("trades");

  async markTradeAsShared(tradeId: string): Promise<void> {
    await this.tradeShare.updateOne(
      { id: tradeId },
      { $set: { isShared: true } }
    );
  }

  async getTradeById(tradeId: string): Promise<Trade> {
    this.tradeShare.findOne({ id: tradeId });
  }

  async hasUserViewedTrade(userId: string, tradeId: string): Promise<boolean> {
    const viewRecord = await this.tradeShare.findOne({ userId, tradeId });
    return !!viewRecord;
  }

  async incrementViewCount(tradeId: string, userId: string): Promise<void> {
    await this.tradeShare.updateOne(
      { id: tradeId },
      { $inc: { viewCount: 1 } }
    );
    await this.tradeShare.insertOne({ userId, tradeId, viewedAt: new Date() });
  }

  async shareTrade(tradeId: string): Promise<void> {
    await this.tradeShare.updateOne(
      { id: tradeId },
      { $set: { isShared: true } }
    );
  }

  // Renamed for clarity
  async findTradeById(tradeId: string): Promise<Trade> {
    this.tradeShare.findOne({ id: tradeId });
  }
  async addEarnings(userId: string, amount: number): Promise<void> {
    await this.database
      .getCollection<User>("users")
      .updateOne({ id: userId }, { $inc: { earnings: amount } });
  }
}

export class UserRepository {
  constructor(private database: Database) {}

  async incrementUserEarnings(userId: string, amount: number): Promise<void> {
    await this.database
      .getCollection<User>("users")
      .updateOne({ id: userId }, { $inc: { earnings: amount } });
  }
}

export class SubscriptionVerificationService {
  constructor(private userRepository: UserRepository) {}
  async hasActiveSubscription(userId: string): Promise<boolean> {
    const user = await this.userRepository.find(userId); // Updated to use findUserById method
    return !!user?.subscription?.isActive;
  }
}

export class AuditLogService {
  constructor(private database: Database) {}

  async logAction(userId: string, action: string): Promise<void> {
    await this.database.getCollection("auditLogs").insertOne({
      userId,
      action,
      timestamp: new Date(),
    });
  }
}

export class TradeSharingService {
  private database: Database = new Database();
  private tradeSharingCollection = this.database.getCollection("tradeSharing");

  constructor(
    private tradeRepository: TradeRepository,
    private userRepository: UserRepository,
    private subscriptionVerificationService: SubscriptionVerificationService,
    private auditLogService: AuditLogService
  ) {}

  async shareTrade(tradeId: string, userId: string): Promise<void> {
    if (
      !(await this.subscriptionVerificationService.hasActiveSubscription(
        userId
      ))
    ) {
      throw new Error(
        "User does not have an active subscription to share trades."
      );
    }

    await this.tradeRepository.shareTrade(tradeId);
    await this.auditLogService.logAction(userId, `Shared trade ${tradeId}`);

    // Record the trade sharing action in the tradeSharingCollection
    await this.tradeSharingCollection.insertOne({
      tradeId,
      userId,
      action: "share",
      timestamp: new Date(),
    });
  }

  async viewSharedTrade(tradeId: string, viewerId: string): Promise<Trade> {
    const hasSubscription =
      await this.subscriptionVerificationService.hasActiveSubscription(
        viewerId
      );
    if (!hasSubscription) {
      throw new Error(
        "Viewer does not have an active subscription to view shared trades."
      );
    }

    const trade = await this.tradeRepository.getTradeById(tradeId);
    if (!trade.isShared) {
      throw new Error("This trade is not shared.");
    }

    const hasViewed = await this.tradeRepository.hasUserViewedTrade(
      viewerId,
      tradeId
    );
    if (!hasViewed) {
      await this.tradeRepository.incrementViewCount(tradeId, viewerId);
      await this.calculateEarningsForTradeOwner(trade.userId);
    }

    await this.auditLogService.logAction(
      viewerId,
      `Viewed shared trade ${tradeId}`
    );

    // Record the trade viewing action in the tradeSharingCollection
    await this.tradeSharingCollection.insertOne({
      tradeId,
      viewerId,
      action: "view",
      timestamp: new Date(),
    });

    return trade;
  }

  private async calculateEarningsForTradeOwner(
    tradeOwnerId: string
  ): Promise<void> {
    const earningsIncrement = 0.1;
    await this.userRepository.incrementUserEarnings(
      tradeOwnerId,
      earningsIncrement
    );

    // Optionally, log this action for auditing
    await this.auditLogService.logAction(
      tradeOwnerId,
      `Earnings incremented by ${earningsIncrement}`
    );
  }

  async incrementViewCountAndEarnings(
    tradeId: string,
    userId: string
  ): Promise<void> {
    const session = await this.database.startSession();
    session.startTransaction();
    try {
      const trade = await this.tradeRepository.findTradeById(tradeId);
      await this.tradeRepository.incrementViewCount(tradeId, userId);
      await this.userRepository.incrementUserEarnings(trade.userId, 0.1);
      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
