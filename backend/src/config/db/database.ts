import { MongoClient, Db } from "mongodb";

export class Database {
  private client: MongoClient;
  private db: Db;
  private retryCount: number;
  private maxRetries: number;

  constructor() {
    this.client = new MongoClient("mongodb://localhost:27017");
    this.db = this.client.db("tradekeeper");
    this.retryCount = 0;
    this.maxRetries = 3;
  }

  async connectWithRetry(): Promise<void> {
    try {
      await this.client.connect();
      console.log("Database connection successful");
    } catch (error) {
      if (this.retryCount < this.maxRetries) {
        this.retryCount++;
        console.log(
          `Database connection attempt ${this.retryCount} failed. Retrying...`
        );

        await new Promise((resolve) =>
          setTimeout(resolve, 2000 * this.retryCount)
        );
        await this.connectWithRetry(); // Retry the connection
      } else {
        console.error(
          "Database connection failed after multiple retries",
          error
        );
        throw error;
      }
    }
  }

  getCollection(collectionName: string) {
    return this.db.collection(collectionName);
  }
}
