"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongodb_1 = require("mongodb");
class Database {
    constructor() {
        this.client = new mongodb_1.MongoClient("mongodb://localhost:27017");
        this.db = this.client.db("tradekeeper");
        this.retryCount = 0;
        this.maxRetries = 3;
    }
    async connectWithRetry() {
        try {
            await this.client.connect();
            console.log("Database connection successful");
        }
        catch (error) {
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`Database connection attempt ${this.retryCount} failed. Retrying...`);
                await new Promise((resolve) => setTimeout(resolve, 2000 * this.retryCount));
                await this.connectWithRetry(); // Retry the connection
            }
            else {
                console.error("Database connection failed after multiple retries", error);
                throw error;
            }
        }
    }
    getCollection(collectionName) {
        return this.db.collection(collectionName);
    }
}
exports.Database = Database;
