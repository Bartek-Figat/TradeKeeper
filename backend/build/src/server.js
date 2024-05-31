"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let msg = "👋🚀⚡🔥🚀  TradeKeeper  👋🚀⚡🔥🚀";
let symbols = ` 
$ - Dollar Symbol (USD)
€ - Euro Symbol (EUR)
£ - Pound Symbol (GBP)
¥ - Yen Symbol (JPY)
₹ - Rupee Symbol (INR)`;
console.log(msg, symbols);
// Current time zone
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
console.log("Current Time Zone:", timeZone);
const app_1 = require("./app");
const database_1 = require("./config/db/database");
const port = process.env.PORT || 8080;
const database = new database_1.Database();
// Connect to the database with retry mechanism
database
    .connectWithRetry()
    .then(() => {
    app_1.app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
})
    .catch((error) => {
    console.error("Error on Server", error);
});
